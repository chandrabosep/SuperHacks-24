import ProjectForm from "@/components/ProjectForm";
import React from "react";
import localFont from "next/font/local";

export const gtHead = localFont({
	src: "../../../../public/fonts/Extended-Regular-Italic.otf",
});

export default function page() {
	return (
		<div className="flex flex-col gap-y-4 py-5">
			<h2 className={`${gtHead.className} text-3xl font-semibold`}>
				Create Proposal
			</h2>
			<p className="w-2/3">
				Please fill in the details of your project. After submission,
				the project will be reviewed by our admin team to ensure its
				authenticity and prevent fraudulent activity. Thank you for your
				patience during this review process.
			</p>
			<div className="py-6">
				<ProjectForm />
			</div>
		</div>
	);
}
