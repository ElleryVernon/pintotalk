import { useRouter } from "next/router";
import React, { useState } from "react";
import Avatar from "../../components/Avatar";
import Feed from "../../components/Feed";
import PostBox from "../../components/PostBox";
import { useAddress } from "@thirdweb-dev/react";
import { PostType } from "../../typings";

const Subreddit = () => {
	const address= useAddress();
	const [posts, setPosts] = useState<PostType[]>([]);
	const {
		query: { topic },
	} = useRouter();
	return (
		<div className={`h-24 bg-orange-400 p-8`}>
			<div className="-mx-8 mt-10 bg-white">
				<div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
					<div className="-mt-5">
						<Avatar seed={topic as string} large />
					</div>
					<div className="py-2">
						<h1 className="text-xl md:text-3xl font-semibold text-gray-900 flex space-x-2">
							안녕하세요. r/{topic} 카테고리입니다.
						</h1>
						<p className="text-sm text-gray-400">r/{topic}</p>
					</div>
				</div>
			</div>
			{!address ? (
				<div className="bg-orange-500 py-2 px-6 text-gray-50 font-semibold text-sm mb-5 -mx-8 z-50">
					<div className="max-w-5xl mx-auto">{`안녕하세요! 👋 지갑을 연결하고 r/${topic}에 핀을 꽂아보세요!`}</div>
				</div>
			) : (
				<div className="mx-auto mt-5 max-w-5xl">
					<div className="sticky top-[88px] z-50">
						<PostBox subpin={topic as string} setPosts={setPosts} />
					</div>
				</div>
			)}

			<div className="mx-auto mt-5 max-w-5xl pb-10">
				<Feed subpin={topic as string} posts={posts} setPosts={setPosts} />
			</div>
		</div>
	);
};

export default Subreddit;
