"use client";
import { verify } from "@/actions/verify";
import {
	IDKitWidget,
	ISuccessResult,
	useIDKit,
	VerificationLevel,
} from "@worldcoin/idkit";

export default function IDKit() {
	const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`;
	const action = process.env.NEXT_PUBLIC_WLD_ACTION;

	if (!app_id) {
		throw new Error("app_id is not set in environment variables!");
	}
	if (!action) {
		throw new Error("action is not set in environment variables!");
	}

	const { setOpen } = useIDKit();

	const onSuccess = (result: ISuccessResult) => {
		// This is where you should perform frontend actions once a user has been verified, such as redirecting to a new page
		window.alert(
			"Successfully verified with World ID! Your nullifier hash is: " +
				result.nullifier_hash
		);
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
			); // Log the response from our backend for visibility
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
				verification_level={VerificationLevel.Orb}
			/>
			<button
				className="border border-black rounded-md"
				onClick={() => setOpen(true)}
			>
				<div className="mx-3 my-1">Verify with World ID</div>
			</button>
		</>
	);
}
