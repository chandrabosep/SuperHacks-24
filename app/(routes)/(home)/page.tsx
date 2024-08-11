import Image from "next/image";
import spaceship from "@/public/map.svg";
import superhack from "@/public/superhack.svg";
import ThemeButton from "@/components/Button";
import Link from "next/link";
import {
	BoltIcon,
	CheckIcon,
	Component,
	Gem,
	Github,
	Linkedin,
	PartyPopper,
	ScrollText,
	Twitter,
	Users,
	Vault,
} from "lucide-react";
import localFont from "next/font/local";
import x from "@/public/x.svg";

const gtHead = localFont({
	src: "../../../public/fonts/RegularItalic.ttf",
});

const gtSideHead = localFont({
	src: "../../../public/fonts/Regular-Italic.ttf",
});

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center">
			<div className="flex flex-row items-center justify-between">
				<div className="py-10 md:py-40 flex flex-col gap-y-10">
					<div
						className={`${gtHead.className} text-4xl md:text-5xl font-bold space-y-4 `}
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
							Add Project Proposal
						</ThemeButton>
					</Link>
				</div>
				<Image
					src={spaceship}
					alt="Spaceship"
					className="brightness-0 w-[40%] hidden md:block"
				/>
			</div>
			<div>
				<h2
					className={`${gtHead.className} text-6xl font-bold border-b-8 border-[#fffb2a]  w-fit`}
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
			<div className="w-full flex flex-col gap-y-14 pb-16 pt-6	">
				<h2
					className={`${gtHead.className} text-6xl font-bold border-b-8 border-[#fffb2a]  w-fit`}
				>
					Features
				</h2>
				<div className="grid gap-16 lg:grid-cols-2 xl:grid-cols-3">
					{[
						{
							title: "Project Proposal Funding",
							description:
								"Secure funding for your project with a streamlined, on-chain proposal process that connects you directly with potential funders.",
							icon: <Gem />,
						},
						{
							title: "Interoperable On-Chain Funding",
							description:
								"Leverage the power of CELO and OP stack chains (OP, BASE, MODE) to access multi-chain funding opportunities seamlessly.",
							icon: <ScrollText />,
						},
						{
							title: "Community Pool Funding",
							description:
								"Support underfunded or emerging projects through pooled funding, enabling collective growth and community-backed initiatives.",
							icon: <Users />,
						},
						{
							title: "ERC4626A Vault Standard",
							description:
								"Experience secure on-chain funding with SeedSphere's ERC4626A Vault, inspired by industry-leading standards for optimal efficiency and security.",
							icon: <Vault />,
						},
						{
							title: "Community-Driven Project Popularity",
							description:
								"Boost your project’s visibility and chances of success through community voting, driving engagement and support.",
							icon: <PartyPopper />,
						},
						{
							title: "Unique NFT Rewards for Funders",
							description:
								"Showcase your contributions with unique NFTs received for your total funding, easily shareable on platforms like X and Farcaster.",
							icon: <Component />,
						},
					].map((feature) => (
						<div key={feature.title} className="grid gap-4">
							<div className="flex items-start gap-4">
								<div className="bg-muted rounded-md p-2 text-primary">
									{feature.icon}
								</div>
								<div className="space-y-1">
									<h3 className="text-2xl font-bold">
										{feature.title}
									</h3>
									<p className="text-muted-foreground text-lg">
										{feature.description}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
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
				<div className="flex items-center gap-4 text-lg font-medium">
					Built by{" "}
					<Link href={"https://chandrabose.xyz"} className="border-b border-theme-secondary leading-5">
						Chandra Bose
					</Link>
					&
					<Link href={"https://x.com/muja002"} className="border-b border-theme-secondary leading-5">
						Mujahid
					</Link>
				</div>
			</div>
		</main>
	);
}
