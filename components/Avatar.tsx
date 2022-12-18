import Image from "next/image";
import { useAddress } from "@thirdweb-dev/react";

type Pros = {
	seed?: string;
	large?: boolean;
	comment?: boolean;
	postBox?: boolean;
	wallet?: string;
	postbox?: boolean;
	isPost?: boolean;
	thumbnail?: string;
};

const Avatar = ({ seed, large, wallet, comment, postBox, isPost, thumbnail }: Pros) => {
	const address = useAddress();

	return (
		<div
			className={`overflow-hidden relative h-8 w-8 ${postBox && "h-14 w-14"}  bg-ornage-500  ${
				postBox ? "bg-[#FF7D34] rounded-md" : "border-gray-300"
			}
			${large && "h-20 w-20 bg-white"} ${comment && "h-11 w-11"} ${seed && "border rounded-full border-gray-300"}`}
		>
			{isPost ? (
				<img src={thumbnail} alt="avatar" className="object-contain h-8 w-8" />
			) : (
				<Image
					src={
						postBox
							? "/white_pin.svg"
							: seed
							? `https://avatars.dicebear.com/api/identicon/${seed}.svg`
							: `https://avatars.dicebear.com/api/adventurer-neutral/${wallet || address}.svg`
					}
					fill
					alt="user avatar"
					className={`rounded-md ${postBox && "p-2"}`}
				/>
			)}
		</div>
	);
};

export default Avatar;
