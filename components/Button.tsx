import React from "react";
import { Button } from "./ui/button";

export default function ThemeButton({
	children,
	className,
	type,
}: {
	children: React.ReactNode;
	className?: string;
	type?: "button" | "submit" | "reset" | undefined;
}) {
	return (
		<Button
			type={type}
			className={`bg-theme-accent border border-theme-secondary/20 rounded-full text-theme-foreground px-5 hover:bg-theme-accent/70 ${className}  `}
		>
			{children}
		</Button>
	);
}
