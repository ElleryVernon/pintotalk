import Post from "./Post";

type Props = {
	subpin?: string;
	setPosts: Dispatch<SetStateAction<PostType[]>>;
	posts: PostType[];
};

import { Jelly } from "@uiball/loaders";
import { Dispatch, SetStateAction, useEffect } from "react";
import axios from "axios";
import { PostType } from "../typings";

const Feed = ({ subpin, setPosts, posts }: Props) => {
	useEffect(() => {
		async function fetchPosts() {
			if (subpin) {
				const { data } = await axios.get(`/api/post/topic/${subpin}`);
				setPosts(data.posts);
			} else {
				const { data } = await axios.get("/api/post");
				setPosts(data.posts);
			}
		}
		fetchPosts();
	}, []);

	if (!posts?.length) {
		return (
			<div className="flex w-full items-center justify-center p-10 text-xl">
				<Jelly size={50} color="#FB923C" />
			</div>
		);
	}
	return (
		<div className="mt-5 w-full">
			{posts?.map((post) => (
				<Post key={post.id} post={post}/>
			))}
		</div>
	);
};

export default Feed;
