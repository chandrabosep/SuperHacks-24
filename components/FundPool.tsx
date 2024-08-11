"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { EvmPriceServiceConnection } from "@pythnetwork/pyth-evm-js";
import { Button } from "./ui/button";
import { ContractAbi } from "@/contract/seedsphere";
import { useWriteContract } from "wagmi";
import { parseEther } from "viem";

export default function FundPool() {
	const [amount, setAmount] = useState<string>("");
	const { writeContract, error } = useWriteContract();
	console.log(error);
	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAmount(e.target.value);
	};

	const handleFundClick = async (e: React.MouseEvent) => {
		try {
			const connection = new EvmPriceServiceConnection(
				"https://hermes.pyth.network"
			);
			const priceIds = [
				"0x7d669ddcdd23d9ef1fa9a9cc022ba055ec900e91c4cb960f3c20429d4447a411" as string,
			];
			const priceFeedUpdateData =
				await connection.getPriceFeedsUpdateData(priceIds);

			writeContract({
				abi: ContractAbi.abi,
				address: ContractAbi.address as `0x${string}`,
				functionName: "poolFunds",
				args: [priceFeedUpdateData],
				value: parseEther(amount),
			});
		} catch (error) {
			console.error("Error funding the pool:", error);
		}
	};

	return (
		<div className="flex flex-col gap-y-2 w-1/2 mx-auto">
			<Input
				placeholder="Enter amount"
				className="w-full"
				value={amount}
				onChange={handleAmountChange}
			/>
			<Button
				onClick={handleFundClick}
				className="w-full rounded-md border-none bg-[#FFEF61] hover:bg-[#FFEF61]/90 text-theme-foreground/70 mt-auto"
			>
				Fund the Pool
			</Button>
		</div>
	);
}
