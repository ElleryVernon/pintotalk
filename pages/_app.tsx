// @ts-nocheck
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "regenerator-runtime/runtime";
import Header from "../components/Header";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

const activeChainId = ChainId.BinanceSmartChainTestnet;

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThirdwebProvider desiredChainId={activeChainId}>
			<Head>
				<title>핀투톡 | Pin to Talk</title>
				<meta
					name="description"
					content="세계의 모든 URL이 여러분을 기다리고 있어요! 아직 열리지 않은 URL 핀을 박고 NFT를 선점해 보세요!"
				/>
				<meta property="og:title" content="핀투톡 | Pin to Talk" />
				<meta
					property="og:description"
					conetent="세계의 모든 URL이 여러분을 기다리고 있어요! 아직 열리지 않은 URL 핀을 박고 NFT를 선점해 보세요!"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Toaster />
			<div className="h-screen overflow-y-scroll bg-slate-200">
				<Header />
				<Component {...pageProps} />
			</div>
		</ThirdwebProvider>
	);
}
