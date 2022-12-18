import PostBox from "../components/PostBox";
import { useAddress } from "@thirdweb-dev/react";
import Feed from "../components/Feed";
import Subpin from "../components/Subpin";
import { useEffect, useState } from "react";
import { PostType, SubpinType } from "../typings";
import axios from "axios";

export default function Home() {
	const address = useAddress();
	const [posts, setPosts] = useState<PostType[]>([]);
	const [categorys, setCategorys] = useState<SubpinType[]>([]);
	const [popularPosts, setPopularPosts] = useState<PostType[]>([]);
	useEffect(() => {
		async function fetchCategorys() {
			const { data } = await axios.get("/api/subpin/limit");
			setCategorys(data.subpins);
			const { data: res } = await axios.get("/api/post/comment");
			setPopularPosts(res.posts);
		}
		fetchCategorys();
	}, []);
	return (
		<>
			{address ? (
				<div className="sticky top-[104px] z-50 max-w-5xl mx-auto mt-6">
					<PostBox setPosts={setPosts} setCategorys={setCategorys} />
				</div>
			) : (
				<div className="sticky top-[82px] bg-orange-500 py-2 px-6 text-gray-50 font-semibold text-sm mb-5 z-50">
					안녕하세요! 유저님 👋, 지갑을 연결하고 핀을 꽂아보세요!
				</div>
			)}
			<div className="max-w-5xl mx-auto">
				<div className="flex">
					<Feed posts={posts} setPosts={setPosts} />
					<div className="flex flex-col">
						{popularPosts.length ? (
							<div
								className={`${
									address ? "sticky top-[218px]" : "sticky top-[156px]"
								} ml-5 mt-5 hidden h-fit min-w-[256px] rounded-md border border-gray-300 bg-white lg:inline`}
							>
								<p className="text-md mb-1 p-4 pb-3 font-bold">인기 게시물</p>
								<div>
									{popularPosts?.map((post, idx) => (
										<Subpin
											key={post.id}
											idx={idx}
											topic={post.title}
											thumbnail={post.crawl.thumbnail}
											isPost
											postId={post.id}
										/>
									))}
								</div>
							</div>
						) : null}
						{categorys.length ? (
							<div
								className={`${
									address ? "sticky top-[580px]" : "sticky top-[522px]"
								} ml-5 mt-5 hidden h-fit lg:min-w-[256px] rounded-md border border-gray-300 bg-white lg:inline`}
							>
								<p className="text-md mb-1 p-4 pb-3 font-bold">인기 카테고리</p>
								<div>
									{categorys?.map((category, idx) => (
										<Subpin key={category.id} idx={idx} topic={category.topic} />
									))}
								</div>
							</div>
						) : null}
					</div>
				</div>
			</div>
		</>
	);
}
