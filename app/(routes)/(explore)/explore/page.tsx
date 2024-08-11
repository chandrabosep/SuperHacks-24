import AllProjects from "@/components/AllProjects";
import React from "react";
import localFont from "next/font/local";

const gtHead = localFont({
	src: [{ path: "../../../../public/fonts/RegularItalic.ttf" }],
});

export default function Page() {
	return (
		<div className="flex flex-col py-4 gap-y-10 w-full max-w-screen-2xl">
			<div className="flex items-center justify-between">
				<h2 className={`${gtHead.className} text-3xl font-semibold`}>
					Projects
				</h2>
			</div>
			<div className="flex flex-wrap items-center w-full gap-6">
				<AllProjects />
			</div>
		</div>
	);
}
