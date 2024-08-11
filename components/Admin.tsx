//@ts-nocheck
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { client } from "@/lib/sanity";
import { ContractAbi } from "@/contract/seedsphere";
import { useWriteContract } from "wagmi";
import localFont from "next/font/local";

import { ethers } from "ethers";
const gtHead = localFont({
	src: [{ path: "../public/fonts/RegularItalic.ttf" }],
});
export default function Admin() {
	const [projects, setProjects] = useState([]);
	const [selectedProjects, setSelectedProjects] = useState([]);
	const [isPoolEnded, setIsPoolEnded] = useState(false);

	const { writeContract, error } = useWriteContract();
	console.log(error);

	console.log(selectedProjects);
	const onSubmit = async (project: any) => {
		try {
			await client
				.patch(project._id)
				.set({ allow: true })
				.commit({
					headers: {
						Authorization: `Bearer skiomHVuc1NS6Jhn8Bw9Kv4QACP3Fn3reqix5a1Yecc9FjUQAes2LIRlWBdc6A6cljaqCJV3qiXnPf6yTl00vYupvWCXOabKQpRNbuGUAh7qgtxAMai3EsAYXZBIb6nTkxIzBVbnRPgBxJ96UYN4OjwcooL2zO5neCm8XO7KpvCcMr0YoqeY`,
					},
				});

			writeContract({
				abi: ContractAbi.abi,
				address: ContractAbi.address as `0x${string}`,
				functionName: "addOrUpdateProject",
				args: [
					project.walletAddress,
					ethers.utils.formatBytes32String(project.name),
				],
			});
		} catch (error) {
			console.error("Error updating project:", error);
		}
	};

	const handleSelectProject = (projectId) => {
		setSelectedProjects((prevSelected) => {
			if (prevSelected.includes(projectId)) {
				return prevSelected.filter((id) => id !== projectId);
			} else {
				return [...prevSelected, projectId];
			}
		});
	};

	const handleEndPool = () => {
		setIsPoolEnded(true);

		writeContract({
			abi: ContractAbi.abi,
			address: ContractAbi.address as `0x${string}`,
			functionName: "endPool",
			args: [selectedProjects],
		});
	};

	useEffect(() => {
		const getProjects = async () => {
			const query = `*[_type == "project"]`;
			const data = await client.fetch(query);
			setProjects(data);
		};

		getProjects();
	}, []);

	return (
		<div className="flex flex-col gap-y-6 justify-between">
			<h2 className={`${gtHead.className} text-3xl font-semibold`}>
				Admin
			</h2>
			<div className="w-full">
				<Card className="w-full">
					<CardContent className="p-4 space-y-2 w-full">
						<Table className="w-full">
							<TableHeader>
								<TableRow>
									<TableHead>Project</TableHead>
									<TableHead>Description</TableHead>
									<TableHead>More Details</TableHead>
									<TableHead className="text-right">
										Action
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{projects.map((project: any) => (
									<TableRow key={project._id}>
										<TableCell className="font-medium">
											{project.name}
										</TableCell>
										<TableCell>
											{project.projectDescription}
										</TableCell>
										<TableCell>
											<Link
												href={`/explore/${project._id}`}
											>
												<Info />
											</Link>
										</TableCell>
										<TableCell className="text-right">
											<Button
												onClick={() =>
													onSubmit(project)
												}
												disabled={project.allow}
											>
												Accept
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
			<div className="flex flex-col gap-y-4 pt-6">
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-y-2">
						<h2
							className={`${gtHead.className} text-3xl font-semibold`}
						>
							Activate Pool
						</h2>
						<p>Select the projects for pool as per governance</p>
					</div>
					<div className="flex gap-x-4">
						<button
							onClick={() =>
								writeContract({
									abi: ContractAbi.abi,
									address:
										ContractAbi.address as `0x${string}`,
									functionName: "activatePool",
								})
							}
							className="w-fit h-10 px-8 rounded-md border-none bg-[#FFEF61] hover:bg-[#FFEF61]/90 text-theme-foreground/70 mt-auto"
						>
							Activate
						</button>
						<button
							onClick={handleEndPool}
							className="w-fit h-10 px-8 rounded-md border-none bg-[#ff6060] hover:bg-[#ff6060]/90 text-theme-foreground/70 mt-auto"
						>
							End
						</button>
					</div>
				</div>

				<Card className="w-full">
					<CardContent className="p-4 space-y-2 w-full">
						<Table className="w-full">
							<TableHeader>
								<TableRow>
									<TableHead>Select</TableHead>
									<TableHead className="w-1/4">
										Project
									</TableHead>
									<TableHead>Description</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{!isPoolEnded &&
									projects.map((project: any) => (
										<TableRow key={project._id}>
											<TableCell>
												<input
													type="checkbox"
													checked={selectedProjects.includes(
														project.walletAddress
													)}
													onChange={() =>
														handleSelectProject(
															project.walletAddress
														)
													}
												/>
											</TableCell>
											<TableCell className="font-medium">
												{project.name}
											</TableCell>
											<TableCell>
												{project.projectDescription}
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
