import Image from "next/image";
import spaceship from "@/public/map.svg";
import superhack from "@/public/superhack.svg";
import ThemeButton from "@/components/Button";
import Link from "next/link";
import { CheckIcon, Github, Linkedin, Twitter } from "lucide-react";
import localFont from "next/font/local";

export const gtHead = localFont({
	src: [{ path: "public/fonts/Extended-Regular-Italic.otf"}],
});

export const gtSideHead = localFont({
	src: [{ path: "public/fonts/standard-Regular-Italic.otf" }],
});

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center">
			<div className="flex items-center justify-between">
				<div className="py-40 flex flex-col gap-y-10">
					<div
						className={`${gtHead.className} text-5xl font-bold space-y-4 `}
					>
						<h1>SeedSphere: Transforming </h1>
						<h1>Open World Fundraising</h1>
					</div>
					<p className={`text-2xl max-w-screen-sm`}>
						Streamline your fundraising journey across multiple
						chains with SeedSphere. Support public projects and
						showcase your contributions.
					</p>
					<Link href="/dashboard">
						<ThemeButton className="px-10 py-6">
							Add Your Project
						</ThemeButton>
					</Link>
				</div>
				<Image
					src={spaceship}
					alt="Spaceship"
					className="brightness-0 w-[40%]"
				/>
			</div>
			<div>
				<h2
					className={`${gtSideHead.className} text-6xl font-bold border-b-8 border-[#fffb2a]  w-fit`}
				>
					How it works
				</h2>
				<section className="w-full py-8 md:py-10 lg:py-16">
					<div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-20">
						<div className="space-y-4 max-w-2xl">
							<div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
								Submit Your Proposal
							</div>
							<h2 className="text-3xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
								Create Proposals Across Blockchains
							</h2>
							<p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Submit proposals on Celo, Optimism, Base, and
								Mode blockchains. Manage your funds and
								contributions across multiple networks.
							</p>
							<div className="grid gap-2">
								<div className="flex items-center gap-2">
									<CheckIcon className="h-5 w-5 text-green-500" />
									<p className="text-sm text-muted-foreground">
										Create a single proposal
									</p>
								</div>
								<div className="flex items-center gap-2">
									<CheckIcon className="h-5 w-5 text-green-500" />
									<p className="text-sm text-muted-foreground">
										Manage funds across blockchains
									</p>
								</div>
							</div>
						</div>
						<div className="space-y-4 max-w-2xl">
							<div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
								Fund Projects as a Sower
							</div>
							<h2 className="text-3xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
								Provide Essential Funding
							</h2>
							<p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Contribute funds that act like essential
								elements helping projects grow. Your
								contributions are securely deposited in the
								project vault.
							</p>
							<div className="grid gap-2">
								<div className="flex items-center gap-2">
									<CheckIcon className="h-5 w-5 text-green-500" />
									<p className="text-sm text-muted-foreground">
										Provide essential funding
									</p>
								</div>
								<div className="flex items-center gap-2">
									<CheckIcon className="h-5 w-5 text-green-500" />
									<p className="text-sm text-muted-foreground">
										Secure deposits in project vault
									</p>
								</div>
							</div>
						</div>
						<div className="space-y-4 max-w-2xl">
							<div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
								Earn Root Tokens
							</div>
							<h2 className="text-3xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
								Earn Rewards for Your Support
							</h2>
							<p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Have your contributions securely deposited in
								the project vault and earn Root Tokens as a
								reward.
							</p>
							<div className="grid gap-2">
								<div className="flex items-center gap-2">
									<CheckIcon className="h-5 w-5 text-green-500" />
									<p className="text-sm text-muted-foreground">
										Secure deposits in project vault
									</p>
								</div>
								<div className="flex items-center gap-2">
									<CheckIcon className="h-5 w-5 text-green-500" />
									<p className="text-sm text-muted-foreground">
										Earn Root Tokens as a reward
									</p>
								</div>
							</div>
						</div>
						<div className="space-y-4 max-w-2xl">
							<div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
								Mint a Bloom NFT
							</div>
							<h2 className="text-3xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
								Publicly Recognize Your Support
							</h2>
							<p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Mint a Bloom NFT to publicly showcase your
								support for the projects you contribute to.
							</p>
							<div className="grid gap-2">
								<div className="flex items-center gap-2">
									<CheckIcon className="h-5 w-5 text-green-500" />
									<p className="text-sm text-muted-foreground">
										Mint a Bloom NFT
									</p>
								</div>
								<div className="flex items-center gap-2">
									<CheckIcon className="h-5 w-5 text-green-500" />
									<p className="text-sm text-muted-foreground">
										Publicly showcase your support
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
			<div className="flex items-center justify-between border-t w-full pt-4">
				<div className="flex items-center gap-2">
					<Image
						src={superhack}
						alt="alt"
						className="size-6 rounded-full"
					/>
					<p className="text-lg font-bold pt-1">
						Built at SuperHacks24
					</p>
				</div>
				<div className="flex items-center gap-4">
					<Twitter fill="black" />
					<Github fill="black" />
					<Linkedin fill="black" />
				</div>
			</div>
		</main>
	);
}
