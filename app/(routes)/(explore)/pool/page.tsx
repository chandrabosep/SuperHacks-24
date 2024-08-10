import React from "react";
import cloud from "@/public/cloud.svg";
import Image from "next/image";
import localFont from "next/font/local";
import PoolProject from "@/components/PoolProject";
import ThemeButton from "@/components/Button";

const gtHead = localFont({
	src: "../../../../public/fonts/RegularItalic.ttf",
});
export default function page() {
	return (
		<div className="w-full min-h-[calc(100vh-20rem)] border border-black rounded-3xl relative mt-16 flex flex-col items-center gap-y-10 p-6">
			<Image
				src={cloud}
				alt="alt"
				className="w-fit absolute left-6 -top-16"
			/>
			<h4
				className={`${gtHead.className} text-3xl font-medium text-theme-secondary border-b-8 border-theme-accent`}
			>
				Empower Ideas: Fund the Pool, Fuel Every Project
			</h4>
			<div className="w-full flex justify-evenly flex-wrap gap-6">
				<PoolProject name="Cosy Cradle" />
				<PoolProject name="Kapak" />
			</div>
			<ThemeButton className="w-1/2 rounded-md border-none bg-[#FFEF61] hover:bg-[#FFEF61]/90 text-theme-foreground/70 mt-auto">
				Fund the Pool
			</ThemeButton>
		</div>
	);
}
