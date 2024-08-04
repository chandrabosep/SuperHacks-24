import { gtHead } from "@/components/Fonts";
import React from "react";

export default function page() {
	return (
		<div className="flex flex-col gap-y-4 py-5">
			<h2 className={`${gtHead.className} text-3xl font-semibold`}>
				Create Project
			</h2>
			<p className="w-2/3">
				Please fill in the details of your project. After submission,
				the project will be reviewed by our admin team to ensure its
				authenticity and prevent fraudulent activity. Thank you for your
				patience during this review process.
			</p>
		</div>
	);
}
