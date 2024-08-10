"use client";
import React from "react";
import ThemeButton from "@/components/Button";
import Link from "next/link";
import localFont from "next/font/local";
import DashboardProjects from "@/components/DashboardProjects";


const gtHead = localFont({
	src: [{ path: "../../../../public/fonts/RegularItalic.ttf" }],
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
						<ThemeButton>Submit Proposal</ThemeButton>
					</Link>
				</div>
				<DashboardProjects />

				
			</div>
		</div>
	);
}
