"use client";

import { verify } from "@/actions/verify";
import { VerificationLevel, IDKitWidget, useIDKit } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"] });

export default function WORLDid() {
	const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`;
	const action = process.env.NEXT_PUBLIC_WLD_ACTION;

	const router = useRouter();

	if (!app_id) {
		throw new Error("app_id is not set in environment variables!");
	}
	if (!action) {
		throw new Error("action is not set in environment variables!");
	}

	const { setOpen } = useIDKit();

	const onSuccess = (result: ISuccessResult) => {
		router.push("/create-project");
	};

	const handleProof = async (result: ISuccessResult) => {
		console.log(
			"Proof received from IDKit, sending to backend:\n",
			JSON.stringify(result)
		); // Log the proof from IDKit to the console for visibility
		const data = await verify(result);
		if (data.success) {
			console.log(
				"Successful response from backend:\n",
				JSON.stringify(data)
			);
		} else {
			throw new Error(`Verification failed: ${data.detail}`);
		}
	};

	return (
		<>
			<IDKitWidget
				action={action}
				app_id={app_id}
				onSuccess={onSuccess}
				handleVerify={handleProof}
				verification_level={VerificationLevel.Device}
			/>
			<button
				className=" bg-black text-white rounded w-fit"
				onClick={() => setOpen(true)}
			>
				<div
					className={`${dmSans.className} flex items-center px-6 p-3 gap-x-6 text-lg font-medium`}
				>
					<Image
						src="/worldcoin.svg"
						alt="alt"
						width={500}
						height={500}
						className="size-6"
					/>
					Verify with World ID
				</div>
			</button>
		</>
	);
}
