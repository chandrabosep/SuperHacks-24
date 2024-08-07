"use client";
import { client } from "@/lib/sanity";
import { useParams } from "next/navigation";
import {
	FileIcon,
	GithubIcon,
	GitlabIcon,
	LinkedinIcon,
	LinkIcon,
	Triangle,
	TwitterIcon,
	User,
} from "lucide-react";
import Link from "next/link";
import ThemeButton from "./Button";
import { useState, useEffect } from "react";

export default function ProjectData() {
	const { id } = useParams();
	console.log(id);
	const [data, setData] = useState<any>();

	useEffect(() => {
		async function getProjectData() {
			const query = `*[_type == "project" && _id == "${id}"]`;
			const data = await client.fetch(query);
			setData(data[0]);
		}

		getProjectData();
	}, [id]);

	return (
		<div className="flex flex-col items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
			<div className="container mx-auto max-w-5xl">
				<div className="flex items-center justify-between">
					<h1 className="mb-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                        {data?.name}
                    </h1>
					<div className="flex items-center gap-2 text-xl text-muted-foreground">
						<Triangle className="w-4 h-4 fill-primary" />
						<span>1.2K</span>
						<Triangle className="w-4 h-4 fill-muted rotate-180" />
						<span>200</span>
					</div>
				</div>
				<div className="mb-8 flex gap-x-10">
					<Link
						href={`${data?.projectLink}`}
						className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
						prefetch={false}
					>
						Visit Live Project
					</Link>
					<div className="flex items-center space-x-6">
						<Link
							href="#"
							className="text-muted-foreground hover:text-foreground"
							prefetch={false}
						>
							<TwitterIcon className="h-6 w-6" />
						</Link>
						<Link
							href="#"
							className="text-muted-foreground hover:text-foreground"
							prefetch={false}
						>
							<LinkedinIcon className="h-6 w-6" />
						</Link>
						<Link
							href="#"
							className="text-muted-foreground hover:text-foreground"
							prefetch={false}
						>
							<GitlabIcon className="h-6 w-6" />
						</Link>
					</div>
				</div>
				<div className="">
					<p className="text-muted-foreground">
						{data?.projectDescription}
					</p>
				</div>
				<div className="flex flex-col gap-y-14 pt-8">
					<div className="">
						<h2
							className={` mb-5 text-2xl font-bold tracking-tight text-foreground`}
						>
							Project Resources
						</h2>
						<div className="space-y-2 space-x-4">
							<Link
								href="#"
								className="inline-flex items-center rounded-md bg-muted px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-muted focus:ring-offset-2"
								prefetch={false}
							>
								<FileIcon className="mr-2 h-4 w-4" />
								Project Documentation
							</Link>
							<Link
								href="#"
								className="inline-flex items-center rounded-md bg-muted px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-muted focus:ring-offset-2"
								prefetch={false}
							>
								<LinkIcon className="mr-2 h-4 w-4" />
								Related Blog Posts
							</Link>
							<Link
								href="#"
								className="inline-flex items-center rounded-md bg-muted px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-muted focus:ring-offset-2"
								prefetch={false}
							>
								<GithubIcon className="mr-2 h-4 w-4" />
								GitHub Repository
							</Link>
						</div>
					</div>

					{/* <div className="">
						<h2 className="mb-5 text-2xl font-bold tracking-tight text-foreground">
							Project Details
						</h2>
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
							<div>
								<h3 className="mb-2 text-lg font-medium text-foreground">
									Technology Stack
								</h3>
								<ul className="list-disc space-y-2 pl-4 text-muted-foreground">
									<li>React.js</li>
									<li>Node.js</li>
									<li>MongoDB</li>
									<li>AWS (EC2, S3, Lambda)</li>
								</ul>
							</div>
							<div>
								<h3 className="mb-2 text-lg font-medium text-foreground">
									Key Features
								</h3>
								<ul className="list-disc space-y-2 pl-4 text-muted-foreground">
									<li>Intuitive task management</li>
									<li>Real-time collaboration</li>
									<li>
										Comprehensive reporting and analytics
									</li>
									<li>
										Seamless integration with third-party
										tools
									</li>
								</ul>
							</div>
						</div>
					</div> */}

					<div className="">
						<h2
							className={` mb-5 text-2xl font-bold tracking-tight text-foreground`}
						>
							Previous Achievements
						</h2>
						<div className="space-y-4">
							<div>
								<h3 className="mb-2 text-lg font-medium text-foreground">
									Best Web Application Award
								</h3>
								<p className="text-muted-foreground">
									Recognized as the Best Web Application at
									the 2023 Industry Awards.
								</p>
							</div>
							<div>
								<h3 className="mb-2 text-lg font-medium text-foreground">
									Featured in Tech Magazine
								</h3>
								<p className="text-muted-foreground">
									Acme Web Application was featured in the
									June 2022 issue of Tech Magazine.
								</p>
							</div>
						</div>
					</div>
					<div className="">
						<h2
							className={` mb-5 text-2xl font-bold tracking-tight text-foreground`}
						>
							Meet the Team
						</h2>
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
							<div className="flex flex-col items-center">
								<User />

								<div className="mt-2 text-center">
									<p className="text-lg font-medium text-foreground">
										John Doe
									</p>
									<p className="text-muted-foreground">
										Project Manager
									</p>
								</div>
							</div>
							<div className="flex flex-col items-center">
								<User />

								<div className="mt-2 text-center">
									<p className="text-lg font-medium text-foreground">
										Jane Smith
									</p>
									<p className="text-muted-foreground">
										Lead Developer
									</p>
								</div>
							</div>
							<div className="flex flex-col items-center">
								<User />
								<div className="mt-2 text-center">
									<p className="text-lg font-medium text-foreground">
										Michael Johnson
									</p>
									<p className="text-muted-foreground">
										UI/UX Designer
									</p>
								</div>
							</div>
						</div>
					</div>
					<ThemeButton className="w-full">Fund Project</ThemeButton>
				</div>
			</div>
		</div>
	);
}
