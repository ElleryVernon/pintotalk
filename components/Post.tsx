import { ChatBubbleLeftIcon, ShareIcon } from "@heroicons/react/24/outline";
import Avatar from "./Avatar";
import TimeAgo from "react-timeago";
import Link from "next/link";
import { Jelly } from "@uiball/loaders";
import { PostType } from "../typings";

type Props = {
	post: PostType;
	isIn?: boolean;
};

const Post = ({ post, isIn }: Props) => {
	if (!post.title) {
		return (
			<div className="flex w-full items-center justify-center p-10 text-xl">
				<Jelly size={50} color="#FB923C" />
			</div>
		);
	}
	const date = post.created_at.slice(0, post.created_at.length - 1) + "+09:00";
	{
		return !isIn ? (
			<Link href={`/post/${post.id}`}>
				<article
					className={`flex rounded-md justify-between bg-white  shodow-sm transition mb-5  ${
						!isIn && "hover:shadow-orange-200 hover:shadow-md cursor-pointer hover:bg-gray-50"
					}`}
				>
					<div className="p-4 pb-1 pl-6 flex flex-col justify-between">
						<div>
							<div className="flex items-center space-x-2 w-full">
								<Link href={`/subpin/${post.subpin.topic}`}>
									<Avatar seed={post.subpin.topic} />
								</Link>
								<p className="text-xs text-gray-400">
									<Link href={`/subpin/${post.subpin?.topic}`}>
										<span className="font-bold text-black hover:text-orange-400 hover:underline">
											r/{post.subpin?.topic}
										</span>
										{"   "}
									</Link>
									• Posted By {post.wallet_address?.slice(0, 4)}...
									{post.wallet_address?.slice(post.wallet_address?.length - 4)} •
									<TimeAgo date={date} local="kr" />
								</p>
							</div>
							<div className="flex justify-between">
								<div className="py-4">
									<h2 className="text-md sm:text-xl font-semibold text-gray-900">{post.title}</h2>
									<p className="mt-2 text-sm text-gray-500 font-light">{post.body}</p>
								</div>
								{/* {post.thumbnail ? <img src={post.thumbnail} alt={post.title} className="rounded-lg" /> : null} */}
							</div>
						</div>
						<div className="flex space-x-4 text-gray-400 my-1">
							<div className="postButton">
								<ChatBubbleLeftIcon className="h-6 w-6" />
								<p>{post.comments.length} 댓글</p>
							</div>

							<div className="postButton">
								<ShareIcon className="h-6 w-6" />
								<p className="hidden sm:inline">공유</p>
							</div>
						</div>
					</div>
					<a target="_blank">
						<div className="pr-8 flex flex-col items-center justify-center rounded-md shadow-sm active:shadow-none mt-8 pb-6 ml-auto">
							<div>
								<img
									src={post.crawl.thumbnail}
									alt="썸네일"
									className="h-[168px] w-[168px] sm:h-[256px] sm:w-[256px] object-contain rounded-md border border-gray-300"
								/>
							</div>
							<div className="space-y-1 flex flex-col items-center justify-centers w-[168px] sm:w-[256px] border p-3">
								<h2 className="font-bold text-[12px] text-gray-900 text-start break-all flex">
									{post.crawl.title.length > 25 ? post.crawl.title.slice(0, 25) + "..." : post.crawl.title}
								</h2>
								<p className="text-gray-500 text-[8px] break-all pt-1">{post.crawl.description}</p>
							</div>
						</div>
					</a>
				</article>
			</Link>
		) : (
			<article className="flex rounded-md justify-between bg-white  shodow-sm transition mb-5 ">
				<div className="p-4 pb-1 pl-6 flex flex-col justify-between">
					<div>
						<div className="flex items-center space-x-2 w-full">
							<Link href={`/subpin/${post.subpin.topic}`}>
								<Avatar seed={post.subpin.topic} />
							</Link>
							<p className="text-xs text-gray-400">
								<Link href={`/subpin/${post.subpin?.topic}`}>
									<span className="font-bold text-black hover:text-orange-400 hover:underline">
										{post.subpin?.topic}
									</span>
									{"   "}
								</Link>
								• Posted By w/{post.wallet_address?.slice(0, 4)}...
								{post.wallet_address?.slice(post.wallet_address?.length - 4)} •
								<TimeAgo date={date} local="kr" />
							</p>
						</div>
						<div className="flex justify-between">
							<div className="py-4">
								<h2 className="text-md sm:text-xl font-semibold text-gray-900">{post.title}</h2>
								<p className="mt-2 text-sm text-gray-500 font-light">{post.body}</p>
							</div>
							{/* {post.thumbnail ? <img src={post.thumbnail} alt={post.title} className="rounded-lg" /> : null} */}
						</div>
					</div>
					<div className="flex space-x-4 text-gray-400 my-1">
						<div className="postButton">
							<ChatBubbleLeftIcon className="h-6 w-6" />
							<p>{post.comments.length} 댓글</p>
						</div>

						<div className="postButton">
							<ShareIcon className="h-6 w-6" />
							<p className="hidden sm:inline">공유</p>
						</div>
					</div>
				</div>
				<Link href={post.crawl.url} passHref legacyBehavior>
					<a target="_blank">
						<div className="pr-8 flex flex-col items-center justify-center rounded-md shadow-sm active:shadow-none mt-14 ml-auto">
							<div>
								<img
									src={post.crawl.thumbnail}
									alt="썸네일"
									className="h-[168px] w-[168px] sm:h-[256px] sm:w-[256px] object-contain rounded-md border border-gray-300"
								/>
							</div>
							<div className="space-y-1 flex flex-col items-center justify-centers w-[168px] sm:w-[256px] border p-3">
								<h2 className="font-bold text-[12px] text-gray-900 text-start break-all flex">
									{post.crawl.title.length > 25 ? post.crawl.title.slice(0, 25) + "..." : post.crawl.title}
								</h2>
								<p className="text-gray-500 text-[8px] break-all pt-1">{post.crawl.description}</p>
							</div>
						</div>
					</a>
				</Link>
			</article>
		);
	}
};

export default Post;
