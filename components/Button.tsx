import React from "react";
import { Button } from "./ui/button";

export default function ThemeButton({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<Button
			className={`bg-theme-accent border border-theme-secondary/20 rounded-full text-theme-foreground px-5 hover:bg-theme-accent/70 ${className}  `}
		>
			{children}
		</Button>
	);
}
