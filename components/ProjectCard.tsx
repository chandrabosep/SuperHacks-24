import Image from "next/image";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { ArrowDownIcon, ArrowUpIcon, Triangle } from "lucide-react";

export default function ProjectCard() {
	return (
		<Card className="w-full max-w-md">
			<Image
				src="/placeholder.jpg"
				alt="Card Image"
				width="400"
				height="200"
				className="object-cover w-full rounded-t-lg"
				style={{ aspectRatio: "400/200", objectFit: "cover" }}
			/>
			<CardContent className="p-4 space-y-2 border-t">
				<h3 className="text-xl font-bold">Beautiful Landscape</h3>
				<p className="text-muted-foreground line-clamp-3 min-h-20">
					A stunning landscape with rolling hills, a serene lake, and
					a breathtaking sunset.
				</p>
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<Triangle className="w-4 h-4 fill-primary" />
					<span>1.2K</span>
					<Triangle className="w-4 h-4 fill-muted rotate-180" />
					<span>200</span>
				</div>
			</CardContent>
		</Card>
	);
}
