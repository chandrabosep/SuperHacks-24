"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ThemeButton from "./Button";

const formSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	projectName: z.string().min(1, {
		message: "Project name is required.",
	}),
	projectLink: z.string().url({
		message: "Please enter a valid URL.",
	}),
	projectDescription: z.string().min(1, {
		message: "Project description is required.",
	}),
	teamInfo: z.string().min(1, {
		message: "Team information is required.",
	}),
	projectDetails: z.string().min(1, {
		message: "Project details are required.",
	}),
	walletAddress: z.string().min(1, {
		message: "Wallet address is required.",
	}),

	// linkedin: z.string().url({
	// 	message: "Please enter a valid LinkedIn URL.",
	// }),
	twitter: z.string().url({
		message: "Please enter a valid Twitter URL.",
	}),
	previousAchievements: z.string().min(1, {
		message: "Previous achievements are required.",
	}),
	otherLinks: z.string().min(1, {
		message: "Other relevant links are required.",
	}),
});

export default function ProjectForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			projectName: "",
			projectLink: "",
			projectDescription: "",
			teamInfo: "",
			projectDetails: "",
			walletAddress: "",
			// linkedin: "",
			twitter: "",
			previousAchievements: "",
			otherLinks: "",
		},
	});
	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}
	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-6">
							<FormField
								control={form.control}
								name="projectName"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="project-name">
											Project Name
										</FormLabel>
										<FormControl>
											<Input
												id="project-name"
												placeholder="Enter project name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="projectLink"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="project-link">
											Project Link
										</FormLabel>
										<FormControl>
											<Input
												id="project-link"
												placeholder="Enter project link"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="projectDescription"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="project-description">
											Project Description
										</FormLabel>
										<FormControl>
											<Textarea
												id="project-description"
												rows={5}
												placeholder="Describe your project..."
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="teamInfo"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="team-info">
											Team Information
										</FormLabel>
										<FormControl>
											<Textarea
												id="team-info"
												rows={5}
												placeholder="Provide details about your team..."
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="projectDetails"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="project-details">
											Project Details
										</FormLabel>
										<FormControl>
											<Textarea
												id="project-details"
												rows={5}
												placeholder="Describe your project goals, timeline, milestones, and budget..."
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="space-y-6">
							<FormField
								control={form.control}
								name="walletAddress"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="wallet-address">
											Wallet Address
										</FormLabel>
										<FormControl>
											<Textarea
												id="wallet-address"
												rows={3}
												placeholder="Enter your wallet address..."
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="twitter"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="social-links">
											Twitter Profile Link
										</FormLabel>
										<FormControl>
											<Input
												id="twitter"
												placeholder="Twitter"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* <FormField
							control={form.control}
							name="linkedin"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="social-links">
										Linked Profile Link
									</FormLabel>
									<FormControl>
										<Input
											id="linkedin"
											placeholder="LinkedIn"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/> */}

							<FormField
								control={form.control}
								name="previousAchievements"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="previous-achievements">
											Previous Achievements
										</FormLabel>
										<FormControl>
											<Textarea
												id="previous-achievements"
												rows={5}
												placeholder="Describe your previous achievements, awards, or recognition..."
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="otherLinks"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="other-links">
											Other Relevant Links
										</FormLabel>
										<FormControl>
											<Textarea
												id="other-links"
												rows={5}
												placeholder="Provide links to your portfolio, demos, or press coverage..."
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<ThemeButton type="submit" className="w-full mt-4">
						Submit
					</ThemeButton>
				</form>
			</Form>
		</>
	);
}
