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

export default function ProjectCard({ project }: { project: any }) {
	const [flipped, setFlipped] = useState(false);

	return (
		<Card
			key={project._id}
			className="w-full max-w-md h-fit min-h-[420px] min-w-[30rem]"
			onClick={() => {
				setFlipped(!flipped);
			}}
		>
			<>
				{!flipped && (
					<Image
						src={project.image || "/placeholder.jpg"}
						alt={project.name || "Project Image"}
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