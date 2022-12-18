import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import Avatar from "./Avatar";
import Link from "next/link";

const Header = () => {
	const connectWithMetamask = useMetamask();
	const disconnect = useDisconnect();
	const address = useAddress();

	return (
		<header className="sticky top-0 z-50 flex bg-white py-2 shadow-sm justify-between px-4 lg:px-12">
			<Link href="/">
				<div className="flex flex-shrink-1 cursor-pointer items-start justify-start my-3">
					<img src="/logo_orange.svg" alt="Logo" />
				</div>
			</Link>
			<div className="flex space-x-2 items-center">
				<Link href="https://landing.pintotalk.io/" legacyBehavior passHref>
					<a target="_blank">
						<button className="px-2 h-12 w-16 bg-orange-400 hover:bg-orange-300 font-semibold text-white rounded-xl text-xs">
							About
						</button>
					</a>
				</Link>
				{address ? (
					<button
						className="items-center border border-gray-200 text-gray-800 px-4 flex text-sm rounded-lg font-semibold space-x-4 transition h-full hover:bg-gray-200 active:bg-white"
						onClick={disconnect}
					>
						<Avatar />
						<div className="text-xs flex-1">
							<p className="truncate">
								{address.slice(0, 4)}...{address.slice(address.length - 4)}
							</p>
							<p className="text-gray-400 font-normal">로그아웃</p>
						</div>
					</button>
				) : (
					<button
						className="items-center flex space-x-2 border border-gray-300 my-1 cursor-pointer rounded-xl hover:bg-gray-200 px-4 transition bg-white text-orange-400 h-12 font-semibold active:bg-white text-xs"
						onClick={connectWithMetamask}
					>
						지갑 연결하기
					</button>
				)}
			</div>
		</header>
	);
};

export default Header;
