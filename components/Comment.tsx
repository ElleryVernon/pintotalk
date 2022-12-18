import Avatar from "./Avatar";
import Timeage from "react-timeago";
import { CommentType } from "../typings";

type Props = {
	comment: CommentType;
};

const Comment = ({ comment }: Props) => {
	const date = comment.created_at.slice(0, comment.created_at.length - 1) + "+09:00";
	const nickname = comment.wallet_address
		? `${comment.wallet_address.slice(0, 4)}...
${comment.wallet_address.slice(comment.wallet_address.length - 4)}`
		: "익명(Anonymous)";
	return (
		<div
			className="relative flex items-center space-x-2 space-y-5 bg-gray-50 pb-4 pl-2 -mx-4 rounded-lg"
			key={comment.id}
		>
			<hr className="absolute top-10 left-9 z-0 h-10 border" />
			<div className="z-50">
				<Avatar wallet={comment.wallet_address || "Anonymous3"} comment />
			</div>

			<div className="flex flex-col">
				<p className="text-xs text-gray-400">
					<span className="font-semibold text-gray-600">{nickname}</span> • <Timeage date={date} />
				</p>
				<p className="text-gray-900">{comment.text}</p>
			</div>
		</div>
	);
};

export default Comment;
