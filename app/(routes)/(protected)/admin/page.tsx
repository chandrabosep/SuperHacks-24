import React from "react";
import localFont from "next/font/local";
import Admin from "@/components/Admin";
const gtHead = localFont({
	src: [{ path: "../../../../public/fonts/RegularItalic.ttf" }],
});

export default function page() {
	return (
		<div className="flex flex-col py-4 gap-y-10">
			<div className="flex flex-col py-4 gap-y-10">
				<div className="flex flex-col gap-y-6 justify-between">
					<h2
						className={`${gtHead.className} text-3xl font-semibold`}
					>
						Admin
					</h2>
					<Admin />
				</div>
			</div>
		</div>
	);
}
