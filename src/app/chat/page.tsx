"use client";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { ScrollArea } from "@/components/shadcn/ui/scroll-area";
import { Textarea } from "@/components/shadcn/ui/textarea";
import Header from "@/components/ui/header";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { initialPrompt } from "../../lib/data";
import MarkdownLite from "@/components/MarkdownLite";
import { CgSpinner } from "react-icons/cg";
import BasicModal from "@/components/system-modal";
import SystemModal from "@/components/system-modal";

export default function ChatPage() {
	//  State
	const [systemMessage, setSystemMessage] = useState("");
	const [messages, setMessages] = useState<any>([
		{
			role: "system",
			content: initialPrompt,
		},
		{
			role: "assistant",
			content:
				"🪴 Hi! I am your plant shop assistant. How can I help you today?",
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

	// useEffect(() => {
	// 	console.log(messages);
	// }, [messages]);

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
				}),
			});

			const data = await response.json();

			// Add assistant message to messages array
			setMessages((msg: any) => [...msg, data.assistant]);

			console.log("RESPONSE: ", data);
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
		<div className="h-screen">
			<Header>Chat</Header>

			<div className="p-4  grid grid-cols-1 md:grid-cols-[1fr,3fr,250px] gap-8 h-[calc(100%-3.5rem)]">
				{/* SYSTEM FORM */}

				<form className="relative   md:h-full" onSubmit={systemSubmit}>
					<p className=" top-2 left-3 absolute font-medium">System</p>
					<Textarea
						className="py-10 resize-none w-full h-full"
						placeholder="Enter role of the chabot here...&#10;⌘+C -> ⌘+V some data and tell system to be an assistant, tell assistant to pretend to be a cat, etc."
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

				<div className="relative  ">
					<ScrollArea
						className="md:h-[calc(100vh-8rem)] px-4  py-12"
						id="chatContainer"
					>
						<div className=" flex flex-col gap-4 pt-4">
							{/* CHAT MESSAGES */}
							{/* System messages hidden for now */}

							<div className="-translate-y-4">
								<SystemModal message={messages[0]} />
							</div>
							{messages.map((msg: any, index: number) => (
								<div
									key={index}
									className="flex flex-col text-white"
								>
									<div
										className={cn(
											"rounded-lg px-2 py-1 max-w-[500px]",
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
										<MarkdownLite text={msg.content} />
									</div>
								</div>
							))}

							{/* LOADING STATE MESSAGE */}
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
						</div>
					</ScrollArea>

					{/* USER MESSAGE FORM */}
					<form
						className="bottom-0 absolute flex gap-4 left-0 right-0"
						onSubmit={messageSubmit}
					>
						<Input
							className="w-full"
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

				<div className="font-mono text-slate-500 text-sm border-l px-4 hidden md:block">
					coming soon...
				</div>
			</div>
		</div>
	);
}

// create array from 1-100 with {user:'user', content: 'content'} and then map it -> testing
const Xmessages = Array.from({ length: 100 }, (_, i) => ({
	role: "user",
	content: `content ${i}`,
}));
