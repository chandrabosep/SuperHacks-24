"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ThemeButton from "./Button";
import { client } from "@/lib/sanity";

const formSchema = z.object({
	name: z.string().min(1, {
		message: "Project name is required.",
	}),
	projectLink: z.string().url({
		message: "Please enter a valid URL.",
	}),
	projectDescription: z.string().min(1, {
		message: "Project description is required.",
	}),
	teamInformation: z.string().min(1, {
		message: "Team information is required.",
	}),
	projectDetails: z.string().min(1, {
		message: "Project details are required.",
	}),
	walletAddress: z.string().min(1, {
		message: "Wallet address is required.",
	}),
	twitterProfileLink: z.string().url({
		message: "Please enter a valid Twitter URL.",
	}),
	previousAchievements: z.string().min(1, {
		message: "Previous achievements are required.",
	}),
	otherRelevantLinks: z.string().min(1, {
		message: "Other relevant links are required.",
	}),
});

export default function ProjectForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			// username: "",
			name: "",
			projectLink: "",
			projectDescription: "",
			teamInformation: "",
			projectDetails: "",
			walletAddress: "",
			twitterProfileLink: "",
			previousAchievements: "",
			otherRelevantLinks: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const response = await client.create(
				{
					_type: "project",
					...values,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer skiomHVuc1NS6Jhn8Bw9Kv4QACP3Fn3reqix5a1Yecc9FjUQAes2LIRlWBdc6A6cljaqCJV3qiXnPf6yTl00vYupvWCXOabKQpRNbuGUAh7qgtxAMai3EsAYXZBIb6nTkxIzBVbnRPgBxJ96UYN4OjwcooL2zO5neCm8XO7KpvCcMr0YoqeY`,
					},
				}
			);
			console.log("Project created:", response);
		} catch (error) {
			console.error("Error creating project:", error);
		}
	};

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-6">
							{/* <FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="username">
											Username
										</FormLabel>
										<FormControl>
											<Input
												id="username"
												placeholder="Enter your username"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/> */}
							<FormField
								control={form.control}
								name="name"
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
								name="teamInformation"
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
											<Input
												id="wallet-address"
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
								name="twitterProfileLink"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="twitter">
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
								name="otherRelevantLinks"
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
