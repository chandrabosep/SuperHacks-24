"use client";
import React from "react";
import ThemeButton from "@/components/Button";
import Link from "next/link";
import Projects from "@/components/Projects";
import localFont from "next/font/local";

export const gtHead = localFont({
	src: [{ path: "../../../../public/fonts/Extended-Regular-Italic.otf" }],
});

export default function page() {
	return (
		<div className="flex flex-col py-4 gap-y-10">
			<div className="flex flex-col py-4 gap-y-10">
				<div className="flex items-center justify-between">
					<h2
						className={`${gtHead.className} text-3xl font-semibold`}
					>
						Dashboard
					</h2>
					<Link href="/verify">
						<ThemeButton>Submit project</ThemeButton>
					</Link>
				</div>
				<div className="flex items-center">
					<Projects />
				</div>
			</div>
			<div className="flex flex-col py-4 gap-y-16">
				<h2 className={`${gtHead.className} text-3xl font-semibold`}>
					Earned Points
				</h2>
				<div className="grid grid-cols-3 divide-x">
					<div>
						<div className="w-fit mx-auto flex flex-col gap-y-8">
							<h3 className="text-xl text-center font-bold">
								OPTIMISM
							</h3>
							<p
								className={`${gtHead.className} mb-6 text-4xl font-bold text-center`}
							>
								{`0`} <span className="text-lg">PTS</span>
							</p>

							<ThemeButton className="w-80">Redeem</ThemeButton>
						</div>
					</div>
					<div>
						<div className="w-fit mx-auto flex flex-col gap-y-8">
							<h3 className="text-xl text-center font-bold">
								BASE
							</h3>
							<p
								className={`${gtHead.className} mb-6 text-4xl font-bold text-center`}
							>
								{`0`} <span className="text-lg">PTS</span>
							</p>

							<ThemeButton className="w-80">Redeem</ThemeButton>
						</div>
					</div>
					<div>
						<div className="w-fit mx-auto flex flex-col gap-y-8">
							<h3 className="text-xl text-center font-bold">
								CELO
							</h3>
							<p
								className={`${gtHead.className} mb-6 text-4xl font-bold text-center`}
							>
								{`0`} <span className="text-lg">PTS</span>
							</p>

							<ThemeButton className="w-80">Redeem</ThemeButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
