"use client";
import React from "react";
import { Geo } from "next/font/google";
import Link from "next/link";
import { useAccount } from "wagmi";
import { gtSideHead } from "./Fonts";

const major = Geo({
	subsets: ["latin"],
	weight: ["400"],
});

const links = ["explore", "pool"];

export default function Navbar() {
	const { isConnected } = useAccount();
	return (
		<div className="flex items-center justify-between py-4 border-b border-theme-secondary/30">
			<Link href="/"
				className={`${major.className} text-3xl font-black bg-theme-accent p-2 px-4 border border-theme-secondary/20`}
			>
				BlockFund
			</Link>
			<div className={`${gtSideHead.className} flex gap-10 text-lg font-medium tracking-wide`}>
				{isConnected && (
					<Link href="/dashboard/1" className="">
						Dashboard
					</Link>
				)}
				{links.map((link) => (
					<Link key={link} href={`/${link}`} className="capitalize">
						{link}
					</Link>
				))}
			</div>
			<w3m-button balance="hide" />
		</div>
	);
}
