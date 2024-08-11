"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/lib/sanity";
import ProjectCard from "./ProjectCard";

export default function AllProjects() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		async function getProjects() {
			const query = `*[_type == "project" && allow == true]`;
			const data = await client.fetch(query);
			setProjects(data);
		}
		getProjects();
	}, []);

	return (
		<div className="flex flex-wrap gap-6 ">
			{projects.length === 0 ? (
				<p>Loading...</p>
			) : (
				projects.map((project: any) => (
					<ProjectCard key={project._id} project={project} />
				))
			)}
		</div>
	);
}
