"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import CryptoJS from "crypto-js";
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
import { ethers } from "ethers";
export default function Admin() {
	const [projects, setProjects] = useState([]);

	const { writeContract } = useWriteContract();

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

	useEffect(() => {
		const getProjects = async () => {
			const query = `*[_type == "project"]`;
			const data = await client.fetch(query);
			setProjects(data);
		};

		getProjects();
	}, []);

	return (
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
										<Link href={`/explore/${project._id}`}>
											<Info />
										</Link>
									</TableCell>
									<TableCell className="text-right">
										<Button
											onClick={() => onSubmit(project)}
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
	);
}
