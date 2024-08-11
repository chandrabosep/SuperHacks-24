"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { SquareArrowOutUpRight, Triangle } from "lucide-react";
import Link from "next/link";
import { useAccount, useWriteContract } from "wagmi";
import { ethers } from "ethers";
import { Input } from "./ui/input";
import { ContractAbi } from "@/contract/seedsphere";
import { parseEther } from "viem";

export default function ProjectCard({ project }: { project: any }) {
	const [flipped, setFlipped] = useState(false);

	const [amount, setAmount] = useState<string>("");
	const { address } = useAccount();

	const { writeContract } = useWriteContract();

	const handleCardClick = () => {
		setFlipped(!flipped);
	};

	const handleInputClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAmount(e.target.value);
	};

	const handleFundClick = async (e: React.MouseEvent) => {
		e.stopPropagation();
		try {
			// const connection = new EvmPriceServiceConnection(
			// 	"https://hermes.pyth.network"
			// );
			// const priceIds = [
			// 	"0x7d669ddcdd23d9ef1fa9a9cc022ba055ec900e91c4cb960f3c20429d4447a411" as string,
			// ];
			// const priceFeedUpdateData =
			// 	await connection.getPriceFeedsUpdateData(priceIds);

			// const pythdata = writeContract({
			// 	abi: ContractAbi.abi,
			// 	address: ContractAbi.address as `0x${string}`,
			// 	functionName: "fund",
			// 	args: [[address], priceFeedUpdateData],
			// 	value: parseEther(amount).toBigInt(),
			// });

			writeContract({
				abi: ContractAbi.abi,
				address: ContractAbi.address as `0x${string}`,
				functionName: "_fund",
				args: [[address]],
				value: parseEther(amount),
			});
		} catch (error) {
			console.error("Error funding the pool:", error);
		}
	};

	return (
		<Card
			key={project._id}
			className="w-full max-w-md h-fit min-h-[410px] min-w-[28rem]"
			onClick={handleCardClick}
		>
			<>
				{!flipped && (
					<Image
						src={project.image || "/placeholder.jpg"}
						alt={project.name || "Project Image"}
						width="400"
						height="200"
						className="object-cover w-full rounded-t-lg"
						priority
						style={{
							aspectRatio: "400/200",
							objectFit: "cover",
						}}
					/>
				)}

				<CardContent className="p-4 space-y-2 border-t h-full">
					<div className="flex items-center justify-between">
						<h3 className="text-xl font-bold">{project.name}</h3>
						<Link href={`/explore/${project._id}`}>
							<SquareArrowOutUpRight className="w-4 h-4 text-theme-secondary" />
						</Link>
					</div>
					{!flipped ? (
						<>
							<p className="text-muted-foreground line-clamp-3 min-h-20">
								{project?.projectDescription}
							</p>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Triangle className="w-4 h-4 fill-primary" />
								<span>1.2K</span>
								<Triangle className="w-4 h-4 fill-muted rotate-180" />
								<span>200</span>
							</div>
						</>
					) : (
						<div className="h-full flex flex-col justify-between text-center w-full">
							<div className="h-full grid grid-cols-2 gap-y-5 mt-10 mx-auto w-full">
								{["celo", "optimism", "base", "mode"].map(
									(network) => {
										const totalFunded =
											project?.funders
												?.filter(
													(funder: any) =>
														funder.chain.toLowerCase() ===
														network
												)
												.reduce(
													(acc: any, funder: any) =>
														acc +
														funder.amountFunded,
													0
												) || 0;

										const displayAmount =
											(project?.[network] || 0) +
											totalFunded;

										return (
											<div
												key={network}
												className="w-fit mx-auto flex flex-col gap-y-4"
											>
												<h3 className="text-xl text-center font-bold uppercase">
													{network}
												</h3>
												<p
													className={`mb-6 text-lg font-bold text-center`}
												>
													{displayAmount}
												</p>
											</div>
										);
									}
								)}
							</div>
							<div className="flex flex-col gap-y-2 w-1/2 mx-auto">
								<Input
									placeholder="Enter amount"
									className="w-full"
									value={amount}
									onClick={handleInputClick}
									onChange={handleInputChange}
								/>
								<button
									className="w-full rounded-md border-none bg-[#FFEF61] h-8 hover:bg-[#FFEF61]/90 text-theme-foreground/70 mt-auto"
									onClick={handleFundClick}
								>
									Fund the Project
								</button>
							</div>
						</div>
					)}
				</CardContent>
			</>
		</Card>
	);
}
