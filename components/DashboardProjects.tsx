"use client";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { client } from "@/lib/sanity";
import DashboardCard from "./DashboardCard";
import nft from "@/public/nft.svg";
import Image from "next/image";
import ShareButtons from "./Sharebtns";

export default function DashboardProjects() {
	const { address } = useAccount();
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		async function getProjects() {
			if (address) {
				const query = `*[_type == "project" && walletAddress == "${address}"]`;
				const data = await client.fetch(query);
				setProjects(data);
			}
		}
		getProjects();
	}, [address]);

	return (
		<div className="flex justify-between">
			<div className="w-3/4 flex flex-wrap">
				<div className="flex gap-6 min-h-[400px]">
					{projects.length === 0 ? (
						<p>Please create a project</p>
					) : (
						projects.map((project: any) => (
							<DashboardCard
								key={project._id}
								project={project}
							/>
						))
					)}
				</div>
			</div>
			<div className="w-1/4 Pl-10">
				<div className="flex flex-col gap-y-4 items-center justify-center w-full h-fit">
					<p>Fund projects and get this awesome NFT</p>
					<Image
						src={nft}
						alt="alt"
						className="w-5/6 rounded-xl h-fit"
					/>
					<ShareButtons />
				</div>
			</div>
		</div>
	);
}
