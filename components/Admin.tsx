"use client";
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
import Link from "next/link";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity";

export default function Admin() {
	const [projects, setProjects] = useState([]);

	// Function to update the allow status of the project
	const onSubmit = async (projectId: any) => {
		try {
			const response = await client
				.patch(projectId)
				.set({ allow: true })
				.commit({
					headers: {
						Authorization: `Bearer skiomHVuc1NS6Jhn8Bw9Kv4QACP3Fn3reqix5a1Yecc9FjUQAes2LIRlWBdc6A6cljaqCJV3qiXnPf6yTl00vYupvWCXOabKQpRNbuGUAh7qgtxAMai3EsAYXZBIb6nTkxIzBVbnRPgBxJ96UYN4OjwcooL2zO5neCm8XO7KpvCcMr0YoqeY`,
					},
				});
			console.log("Project updated:", response);
		} catch (error) {
			console.error("Error updating project:", error);
		}
	};

	useEffect(() => {
		async function getProjects() {
			const query = `*[_type == "project"]`; // Fetch projects with allow == false
			const data = await client.fetch(query);
			setProjects(data);
		}
		getProjects();
	}, []);

	return (
		<div className="w-full">
			<Card className="w-full">
				<CardContent className="p-4 space-y-2 w-full">
					<Table className="w-full">
						<TableHeader className="w-full">
							<TableRow>
								<TableHead>Project</TableHead>
								<TableHead>Description</TableHead>
								<TableHead>More Details</TableHead>
								<TableHead className="text-right">
									Action
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className="w-full">
							{projects.map((project: any) => (
								<TableRow key={project._id}>
									<TableCell className="font-medium">
										{project.name}
									</TableCell>
									<TableCell>
										{project.projectDescription}
									</TableCell>
									<TableCell className="mx-auto">
										<Link
											href={`/explore/${project._id}`}
											className="mx-auto w-fit"
										>
											<Info />
										</Link>
									</TableCell>
									<TableCell className="text-right">
										<Button
											onClick={() =>
												onSubmit(project._id)
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
	);
}
