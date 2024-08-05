"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { SquareArrowOutUpRight, Triangle } from "lucide-react";
import Link from "next/link";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "./ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import ThemeButton from "./Button";

const chartData = [
	{ month: "January", funded: 3 },
	{ month: "February", funded: 6.5 },
	{ month: "March", funded: 5 },
	{ month: "April", funded: 4 },
	{ month: "May", funded: 2 },
	{ month: "June", funded: 4 },
];
const chartConfig = {
	funded: {
		label: "Funded",
		color: "#FFEF61",
	},
} satisfies ChartConfig;

export default function ProjectCard() {
	const [flipped, setFlipped] = useState(false);
	return (
		<Card
			className="w-full max-w-md  min-h-[410px]"
			onClick={() => {
				setFlipped(!flipped);
			}}
		>
			<>
				{!flipped && (
					<Image
						src="/placeholder.jpg"
						alt="Card Image"
						width="400"
						height="200"
						className="object-cover w-full rounded-t-lg"
						style={{
							aspectRatio: "400/200",
							objectFit: "cover",
						}}
					/>
				)}

				<CardContent className="p-4 space-y-2 border-t h-full">
					<div className="flex items-center justify-between">
						<h3 className="text-xl font-bold">
							Beautiful Landscape
						</h3>
						<Link href="/explore/1">
							<SquareArrowOutUpRight className="w-4 h-4 text-theme-secondary" />
						</Link>
					</div>
					{!flipped ? (
						<>
							<p className="text-muted-foreground line-clamp-3 min-h-20">
								A stunning landscape with rolling hills, a
								serene lake, and a breathtaking sunset.
							</p>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Triangle className="w-4 h-4 fill-primary" />
								<span>1.2K</span>
								<Triangle className="w-4 h-4 fill-muted rotate-180" />
								<span>200</span>
							</div>
						</>
					) : (
						<div className="h-full flex flex-col gap-y-10 mt-10">
							<ChartContainer config={chartConfig}>
								<BarChart
									accessibilityLayer
									data={chartData}
									className="h-full"
								>
									<CartesianGrid vertical={false} />
									<XAxis
										dataKey="month"
										tickLine={false}
										tickMargin={10}
										axisLine={false}
										tickFormatter={(value) =>
											value.slice(0, 3)
										}
									/>
									<ChartTooltip
										cursor={false}
										content={
											<ChartTooltipContent hideLabel />
										}
									/>
									<Bar
										dataKey="funded"
										fill="#FFEF61"
										radius={4}
									/>
								</BarChart>
							</ChartContainer>
							<ThemeButton className="w-full rounded-md border-none bg-[#FFEF61] hover:bg-[#FFEF61]/90 text-theme-foreground/70">
								Fund Project
							</ThemeButton>
						</div>
					)}
				</CardContent>
			</>
		</Card>
	);
}
