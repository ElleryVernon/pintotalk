import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Post from "../../components/Post";
import { useAddress } from "@thirdweb-dev/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Comment from "../../components/Comment";
import { Jelly } from "@uiball/loaders";
import { CommentType } from "../../typings";
import axios from "axios";

type FormData = {
	comment: string;
};

const PostPage = () => {
	const router = useRouter();
	const address = useAddress();
	const [comment, setComment] = useState<string>("");
	const [post, setPost] = useState<any>({});

	useEffect(() => {
		async function fetchPostByID() {
			if (!router.isReady) return;
			const { data } = await axios.get(`/api/post/${router.query.postId}`);
			setPost(data.post);
		}
		fetchPostByID();
	}, [router.isReady]);

	const { register, handleSubmit, watch, setValue } = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		const notification = toast.loading("의견을 등록 중이에요...");
		const {
			data: { comment },
		} = await axios.post("/api/comment", {
			post_id: router.query.postId,
			wallet_address: address || "",
			text: data.comment,
		});

		const {
			data: { post: updatePost },
		} = await axios.get(`/api/post/${router.query.postId}`);
		setPost(updatePost);
		setValue("comment", "");

		toast.success("등록을 성공적으로 완료했어요!", {
			id: notification,
		});
	};

	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setComment(e.target.value);
	};
	if (!post) {
		return (
			<div className="flex w-full items-center justify-center p-10 text-xl">
				<Jelly size={50} color="#FB923C" />
			</div>
		);
	}
	return (
		<div className="mx-auto my-7 max-w-5xl">
			<Post post={post} isIn />
			{post.title ? (
				<>
					<div className="-mt-6 rounded-b-md  bg-white p-5">
						<p className="text-sm mb-1 ml-1">
							Comment as{" "}
							<span className="text-sm text-orange-400">
								{address ? `${address.slice(0, 4)}...${address?.slice(address.length - 4)}` : "익명(Anonymous)"}
							</span>
						</p>

						<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2">
							<textarea
								{...register("comment")}
								className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-100 "
								placeholder={"어떤 생각을 가지고 있나요?"}
								onChange={(e) => onChange(e)}
							/>
							<button
								disabled={!comment.length}
								type="submit"
								className="rounded-lg bg-orange-500 p-2 font-semibold text-gray-50 "
							>
								{!comment.length ? "의견을 적어주세요" : "의견 달기"}
							</button>
						</form>
					</div>
					<div className="-my-5 rouneded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10">
						<hr className="py-2 -mx-4" />
						<div className="space-y-2">
							{post?.comments?.map((comment: CommentType) => (
								<Comment comment={comment} key={comment?.id} />
							))}
						</div>
					</div>
				</>
			) : null}
		</div>
	);
};

export default PostPage;
