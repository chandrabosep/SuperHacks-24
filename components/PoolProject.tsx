"use client";
import Image from "next/image";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { SquareArrowOutUpRight, Triangle } from "lucide-react";
import Link from "next/link";

export default function PoolProject({ name }: { name: string }) {
	return (
		<Card className="w-full max-w-md h-fit min-h-[420px] min-w-[30rem]">
			<>
				<Image
					src={"/placeholder.jpg"}
					alt={"Project Image"}
					width="400"
					height="200"
					className="object-cover w-full rounded-t-lg"
					style={{
						aspectRatio: "400/200",
						objectFit: "cover",
					}}
				/>

				<CardContent className="p-4 space-y-2 border-t h-full">
					<div className="flex items-center justify-between">
						<h3 className="text-xl font-bold">{name}</h3>
						<Link href={`/explore/`}>
							<SquareArrowOutUpRight className="w-4 h-4 text-theme-secondary" />
						</Link>
					</div>

					<>
						<p className="text-muted-foreground line-clamp-3 min-h-20">
							Lorem ipsum dolor sit amet consectetur, adipisicing
							elit. Aliquam nihil excepturi itaque eaque qui
							suscipit laudantium rem placeat sunt tempora
							expedita repellat similique, animi magnam. Autem
							eaque modi architecto consequatur!
						</p>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Triangle className="w-4 h-4 fill-primary" />
							<span>1.2K</span>
							<Triangle className="w-4 h-4 fill-muted rotate-180" />
							<span>200</span>
						</div>
					</>
				</CardContent>
			</>
		</Card>
	);
}
