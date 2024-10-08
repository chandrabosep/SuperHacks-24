import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import localFont from "next/font/local";
import { config } from "@/config";
import Web3ModalProvider from "@/context";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
	title: "SeedSphere",
	description:
		"Streamline your fundraising journey across multiple chains with SeedSphere. Support public projects and showcase your contributions.",
};

const gtText = localFont({
	src: "../public/fonts/Regular.ttf",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const initialState = cookieToInitialState(config, headers().get("cookie"));
	return (
		<html lang="en">
			<body className={gtText.className}>
				<Web3ModalProvider initialState={initialState}>
					<Navbar />
					<div className="py-6">{children}</div>
					<Toaster />
				</Web3ModalProvider>
			</body>
		</html>
	);
}
