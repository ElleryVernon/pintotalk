import { useAddress, useContract, useMintNFT } from "@thirdweb-dev/react";
import Avatar from "./Avatar";
import { useForm } from "react-hook-form";
import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { validateUrl } from "../lib";
import { PostType, SubpinType } from "../typings";

type FormData = {
	postTitle: string;
	postBody: string;
	postImage: string;
	subreddit: string;
	postUrl: string;
};

type Props = {
	subpin?: string;
	setPosts: Dispatch<SetStateAction<PostType[]>>;
	setCategorys?: Dispatch<SetStateAction<SubpinType[]>>;
};

const PostBox = ({ subpin, setPosts, setCategorys }: Props) => {
	const address = useAddress();
	const [url, setUrl] = useState("");
	const [isUrl, setIsUrl] = useState(false);
	const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ID);
	const { mutate: mintNft, isLoading, error } = useMintNFT(contract);

	const refetch = async () => {
		const {
			data: { subpins },
		} = await axios.get("/api/subpin/limit");

		if (subpin) {
			const { data } = await axios.get(`/api/post/topic/${subpin}`);
			if (typeof setPosts !== "undefined") {
				setPosts(data.posts);
			} else if (typeof setCategorys !== "undefined") {
				setCategorys(subpins);
			}
		} else {
			const { data } = await axios.get("/api/post");
			if (typeof setPosts !== "undefined") {
				setPosts(data.posts);
			} else if (typeof setCategorys !== "undefined") {
				setCategorys(subpins);
			}
		}
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>, isTitle: boolean = false) => {
		setUrl(e.target.value);
		setIsUrl(validateUrl(e.target.value));
	};

	const {
		register,
		setValue,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormData>();
	const onSubmit = handleSubmit(async (formData) => {
		const notification = toast.loading("새로운 글을 작성 중이에요!");

		try {
			const topic = subpin || formData.subreddit;
			const {
				data: { subpin: category },
			} = await axios.get(`/api/subpin/${topic}`);
			console.log(category);
			const res = await axios.get(`https://serp-api.vercel.app/v1/crawl/metadata?url=${formData.postUrl}`).catch(() => {
				toast.error("핀을 꽂을 수 없는 링크에요!", { id: notification });
			});
			if (!res) return;
			const { metadata, jsonld } = res.data;
			const {
				data: { crawl },
			} = await axios.get(`/api/crawl/url`, { params: { url: metadata.url } });
			if (crawl) {
				return toast.error("이미 누가 핀을 선점한 링크에요!", { id: notification });
			}
			const {
				data: { crawl: newCrawl },
			} = await axios.post("/api/crawl", {
				crawl_url: metadata.url,
				crawl_title: metadata["og:title"]?.length ? metadata["og:title"] : metadata.title,
				crawl_description: metadata["og:description"]?.length ? metadata["og:description"] : metadata.description,
				crawl_thumbnail: metadata["og:image"]?.length
					? metadata["og:image"]
					: !metadata.image.startsWith("/") || metadata.image.length
					? metadata.image
					: undefined,
			});
			if (!category) {
				const {
					data: { subpin },
				} = await axios.post("/api/subpin", { topic: topic });
				const {
					data: { post },
				} = await axios.post("/api/post", {
					title: formData.postTitle,
					body: formData.postBody,
					subpin_id: subpin.id,
					crawl_id: newCrawl.id,
					wallet_address: address,
				});
				await mintNft({
					metadata: {
						name: "Pin NFT",
						description: "핀투톡 증명서를 위한 NFT에요!",
						properties: {
							post_id: post.id,
							image: newCrawl.thumbnail,
							web_title: newCrawl.title,
							web_description: newCrawl.description,
							web_url: newCrawl.url,
							post_title: formData.postTitle,
							post_body: formData.postBody,
						},
					},
					to: address as string,
				});
			} else {
				const {
					data: { post },
				} = await axios.post("/api/post", {
					title: formData.postTitle,
					body: formData.postBody,
					subpin_id: category.id,
					crawl_id: newCrawl.id,
					wallet_address: address,
				});
				await axios.patch(`/api/subpin/${category.id}`, { count: category.count + 1 });
				await mintNft({
					metadata: {
						name: "Pin NFT",
						description: "핀투톡 증명서를 위한 NFT에요!",
						properties: {
							post_id: post.id,
							image: newCrawl.thumbnail,
							web_title: newCrawl.title,
							web_description: newCrawl.description,
							web_url: newCrawl.url,
							post_title: formData.postTitle,
							post_body: formData.postBody,
						},
					},
					to: address as string,
				});
			}
			setValue("postUrl", "");
			setValue("postBody", "");
			setValue("postImage", "");
			setValue("postTitle", "");
			setValue("subreddit", "");
			setIsUrl(false);
			setUrl("");
			await refetch();
			toast.success("완료!", { id: notification });
		} catch (err) {
			console.log(err);
			toast.error("실패했어요!", { id: notification });
		}
	});
	return (
		<form className="rounded-md border border-gray-300 bg-white px-4 py-5 shadow" onSubmit={onSubmit}>
			<div className="flex items-center space-x-3">
				<Avatar postBox />
				<input
					{...register("postUrl", { required: true })}
					disabled={!address}
					onChange={(e) => onChange(e)}
					type="text"
					placeholder={
						subpin ? `r/${subpin} 카테고리에 대해 핀을 꽂아보세요!` : "링크(URL)를 입력하고 핀을 꽂아보세요!"
					}
					className={`flex-1 outline-none bg-gray-100 p-2 pl-5 rounded-md py-4 ${
						!isUrl && url.length ? "border border-red-500" : null
					}`}
				/>
			</div>
			{!isUrl && url.length ? (
				<div className="text-center mx-12 text-red-500 rounded-md mt-2 font-bold text-xs">
					링크(URL) 양식이 올바르지 않습니다
				</div>
			) : null}

			{!!isUrl && (
				<div className="flex flex-col py-2">
					<div className="flex items-center pr-2">
						<p className="min-w-[72px] p-2 rounded-md text-sm text-center bg-gray-100 font-semibold text-gray-700">
							제목
						</p>
						<input
							{...register("postTitle", { required: true })}
							type="text"
							placeholder={subpin ? `r/${subpin} 카테고리에 대해 핀을 꽂아보세요!` : "제목을 입력해주세요"}
							className="m-2 flex-1 bg-orange-50 p-2 px-4 outline-none text-sm"
						/>
					</div>
					<div className="flex items-center pr-2">
						<p className="min-w-[72px] p-2 rounded-md text-sm text-center bg-gray-100 font-semibold text-gray-700">
							본문
						</p>
						<input
							{...register("postBody")}
							type="text"
							placeholder="본문 (optional)"
							className="m-2 flex-1 bg-orange-50 p-2 px-4 outline-none text-sm"
						/>
					</div>
					{!subpin ? (
						<div className="flex items-center pr-2">
							<p className="min-w-[72px] p-2 rounded-md text-sm text-center bg-gray-100 font-semibold text-gray-700">
								카테고리
							</p>
							<input
								{...register("subreddit", { required: true })}
								type="text"
								placeholder="예: 블록체인"
								className="m-2 flex-1 bg-orange-50 p-2 px-4 outline-none text-sm"
							/>
						</div>
					) : null}

					{Object.keys(errors).length > 0 && (
						<div className="rounded m-3 bg-red-50 space-y-2 py-2 px-3 text-red-600 border-red-600 border text-sm">
							{errors.postTitle?.type === "required" && <p>제목은 필수적으로 필요합니다.</p>}
							{errors.subreddit?.type === "required" && <p>서브 핀은 필수적으로 필요합니다.</p>}
						</div>
					)}
					{!!watch("postTitle") && (
						<button type="submit" className="mt-2 bg-orange-400 p-2 font-semibold text-white rounded-xl">
							핀 꽂기
						</button>
					)}
				</div>
			)}
		</form>
	);
};

export default PostBox;
