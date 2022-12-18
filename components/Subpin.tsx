import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Avatar from "./Avatar";

type Props = {
	idx: number;
	topic: string;
	thumbnail?: string;
	isPost?: boolean;
	postId?: string;
};

const Subpin = ({ idx, topic, thumbnail, isPost, postId }: Props) => {
	return (
		<Link href={isPost ? `/post/${postId}` : `/subpin/${topic}`}>
			<div className="flex items-center space-x-2 border-t bg-white px-4 last:rounded-b hover:bg-gray-50 py-3">
				<p>{idx + 1}</p>
				<ChevronUpDownIcon className="h-4 w-4 flex-shrink-0 text-green-400" />
				<Avatar seed={topic} isPost={isPost} thumbnail={thumbnail} />
				<p className="flex-1 truncate">r/{topic}</p>
			</div>
		</Link>
	);
};

export default Subpin;
