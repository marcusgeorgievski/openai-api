"use client";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { ScrollArea } from "@/components/shadcn/ui/scroll-area";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { initialPrompt, initialMessage } from "../../lib/data";
import MarkdownLite from "@/components/MarkdownLite";
import { CgSpinner } from "react-icons/cg";
import SystemModal from "@/components/system-modal";

import Slidy from "@/components/slidy";
import { PiSlidersHorizontalDuotone } from "react-icons/pi";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";

export default function ChatPage() {
	// Payload
	const [max_tokens, setMaxTokens] = useState(256);
	const [temperature, setTemperature] = useState(0.8);
	const [top_p, setTopP] = useState(1);
	const [frequency_penalty, setFrequencyPenalty] = useState(0);

	//  State
	const [systemMessage, setSystemMessage] = useState("");
	const [messages, setMessages] = useState<any>([
		{
			role: "system",
			content: initialPrompt,
		},
		{
			role: "assistant",
			content: initialMessage,
		},
	]);
	const [userMessage, setUserMessage] = useState("");
	const [loading, setLoading] = useState(false);

	// Update system instructions
	async function systemSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);

		// Replace the first system message with the new system message
		const newMessage = createMessage("system", systemMessage);
		setMessages([newMessage, ...messages.slice(1)]);

		setSystemMessage(""); // reset input

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				body: JSON.stringify({
					messages: [newMessage, ...messages.slice(1)],
				}),
			});

			const data = await response.json();

			// Add assistant message to messages array
			setMessages((msg: any) => [...msg, data.assistant]);
		} catch (error) {
			console.error("FAILURE");
		}

		setLoading(false);
	}

	// Scroll to bottom of chat container when message is added
	useEffect(() => {
		scrollToBottom();
		// console.log(messages);
	}, [messages]);

	// Add class to chat container's inner element to enable smooth scrolling
	useEffect(() => {
		const scrollContainer = document
			.getElementById("chatContainer")
			?.querySelector("div");
		scrollContainer?.classList.add("overflow-y-scroll");
	}, []);

	// Scroll to bottom of chat container
	function scrollToBottom() {
		setTimeout(() => {
			// get inner element of chat container
			const scrollContainer = document
				.getElementById("chatContainer")
				?.querySelector("div");

			if (scrollContainer) {
				// smooth scroll
				scrollContainer.scrollTo({
					top: scrollContainer.scrollHeight,
					behavior: "smooth",
				});
			}
		}, 100);
	}

	// Add new user message to messages array
	async function messageSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);

		// Append new user message to messages array
		const newMessage = createMessage("user", userMessage);
		setMessages([...messages, newMessage]);

		setUserMessage(""); // reset input

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				body: JSON.stringify({
					messages: [...messages, newMessage],
					temperature,
					max_tokens,
					top_p,
					frequency_penalty,
				}),
			});

			const data = await response.json();

			// Add assistant message to messages array
			setMessages((msg: any) => [...msg, data.assistant]);

			// console.log("RESPONSE: ", data);
		} catch (error) {
			console.error("FAILURE");
		}

		setLoading(false);
	}

	// Create message object
	function createMessage(role: string, content: string) {
		return {
			role,
			content,
		};
	}

	return (
		<div className="">
			<div className="px-4 relative flex flex-col lg:grid lg:grid-cols-[1fr,3fr,250px] gap-4 lg:gap-8 overflow-hidden p-y h-[calc(100vh-90px)] ">
				{/* SYSTEM FORM */}

				<form
					className="relative h-[150px] flex-shrink-0 lg:h-full"
					onSubmit={systemSubmit}
				>
					<div className=" top-2 left-3 absolute font-medium flex gap-4">
						System
						<DropdownMenu>
							<DropdownMenuTrigger className="border p-1 rounded hover:bg-foreground/10">
								<PiSlidersHorizontalDuotone />
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start" asChild>
								<div>
									<DropdownMenuLabel>
										Configure Model
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<div className=" text-xs p-4  flex-col gap-4 flex">
										<Slidy
											name="Max Tokens"
											fnChange={setMaxTokens}
											def={max_tokens}
											description="Word limit for responses"
										/>
										<Slidy
											name="Temperature"
											fnChange={setTemperature}
											def={temperature}
											description="Creativity of responses"
										/>
										<Slidy
											name="Top P"
											fnChange={setTopP}
											def={top_p}
											description="Creativity of responses"
										/>
										<Slidy
											name="Frequency Penalty"
											fnChange={setFrequencyPenalty}
											def={frequency_penalty}
											description="Discouragement of repetition"
										/>
									</div>
								</div>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<Textarea
						className="py-10 resize-none w-full h-full"
						placeholder="Enter role of the chabot here..."
						value={systemMessage}
						onChange={(e) => setSystemMessage(e.target.value)}
					/>
					<Button
						className="absolute bottom-4 right-4 bg-blue-700"
						disabled={systemMessage === "" || loading}
					>
						Submit
					</Button>
				</form>

				{/* CHAT CONTAINER */}

				{/* CHAT CONTAINER HERE */}
				<div className=" flex flex-col gap-1.5  h-[calc(100%-178px)] lg:h-full overflow-hidden relative py-12">
					<SystemModal
						message={messages[0] || { content: "" }}
						className="border px-4 py-1 h-8 overflow-hidden rounded absolute top-0 left-0 right-0 backdrop-blur-lg"
					/>

					<ScrollArea
						className="flex-1 px-3 scroll-smooth"
						id="chatContainer"
					>
						{messages.map((msg: any, index: number) => (
							<div
								key={index}
								className="flex flex-col text-white mb-1.5"
							>
								<div
									className={cn(
										"rounded-lg px-2 py-1 max-w-[90%]",
										{
											"bg-blue-500 self-end":
												msg.role === "user",
											" hidden text-slate-700 border self-center line-clamp-1 truncate absolute top-0":
												msg.role === "system",
											"bg-slate-200 text-black self-start":
												msg.role === "assistant",
										}
									)}
								>
									{msg.role === "system" && (
										<span className="text-sm text-slate-500 mr-3">
											System instructions:
										</span>
									)}
									<p className="whitespace-pre-wrap">
										<MarkdownLite text={msg.content} />
									</p>
								</div>
							</div>
						))}
						{loading && (
							<div className="flex flex-col text-white">
								<div
									className={cn(
										"rounded-lg px-2 py-1 w-fit bg-slate-200 text-black self-start"
									)}
								>
									<div className="flex text-slate-600 text-xs items-center">
										<CgSpinner className="animate-spin mr-1" />{" "}
										Thinking...
									</div>
								</div>
							</div>
						)}
					</ScrollArea>
					{/* USER MESSAGE FORM */}
					<form
						className="flex items-center bottom-0 absolute left-0 right-0 gap-2"
						onSubmit={messageSubmit}
					>
						<Input
							className="w-full "
							placeholder="Enter your message here..."
							value={userMessage}
							onChange={(e) => setUserMessage(e.target.value)}
						/>
						<Button
							className=""
							disabled={userMessage === "" || loading}
						>
							Send
						</Button>
					</form>
				</div>

				{/* PAYLOAD CONTROL */}

				<div className="border-l text-xs p-4  flex-col gap-4 lg:flex hidden">
					<h3 className="font-bold border-b pb-1">Configure Model</h3>
					<Slidy
						name="Max Tokens"
						fnChange={setMaxTokens}
						def={max_tokens}
						description="Word limit for responses"
						min={1}
						max={500}
					/>
					<Slidy
						name="Temperature"
						fnChange={setTemperature}
						def={temperature}
						description="Creativity of responses"
						min={0}
						max={2}
						step="0.1"
					/>
					<Slidy
						name="Top P"
						fnChange={setTopP}
						def={top_p}
						description="tbd"
						min={0}
						max={1}
						step="0.1"
					/>
					<Slidy
						name="Frequency Penalty"
						fnChange={setFrequencyPenalty}
						def={frequency_penalty}
						description="tbd"
						min={0}
						max={2}
						step="0.1"
					/>
				</div>
			</div>
		</div>
	);
}

// create array from 1-100 with {user:'user', content: 'content'} and then map it -> for testing
const Xmessages = Array.from({ length: 100 }, (_, i) => ({
	role: "user",
	content: `content ${i}`,
}));
