"use client";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { ScrollArea } from "@/components/shadcn/ui/scroll-area";
import { Textarea } from "@/components/shadcn/ui/textarea";
import Header from "@/components/ui/header";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { data } from "../../lib/data";
import MarkdownLite from "@/components/MarkdownLite";

interface ChatPageProps {
	//children: React.ReactNode;
}

export default function ChatPage() {
	const [system, setSystem] = useState("");
	const [messages, setMessages] = useState<any>([
		{
			role: "system",
			content: "Plant shop assistant, use this JSON data :" + data,
		},
	]);
	const [newMessage, setNewMessage] = useState("");
	const [loading, setLoading] = useState(false);

	async function systemSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);

		const newMsg = createMessage("system", system);

		// make index 0 of messages newMsg, and then add the rest from index 1 to last
		setMessages([newMsg, ...messages.slice(1)]);

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				body: JSON.stringify({
					messages: [newMsg, ...messages.slice(1)],
				}),
			});

			const data = await response.json();
			setMessages((msg: any) => [...msg, data.assistant]);

			const chatContainer = document.getElementById("chatContainer"); // replace with your chat container's ID
			chatContainer!.scrollTop = chatContainer!.scrollHeight;

			console.log("RESPONSE: ", data);
		} catch (error) {
			console.error("FAILURE");
		}

		setSystem("");
		setLoading(false);
	}

	useEffect(() => {
		console.log(messages);
	}, [messages]);

	async function messageSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);

		const newMsg = createMessage("user", newMessage);
		setNewMessage("");
		setMessages([...messages, newMsg]);

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				body: JSON.stringify({
					messages: [...messages, newMsg],
				}),
			});

			const data = await response.json();
			setMessages((msg: any) => [...msg, data.assistant]);

			const chatContainer = document.getElementById("chatContainer"); // replace with your chat container's ID
			chatContainer!.scrollTop = chatContainer!.scrollHeight;

			console.log("RESPONSE: ", data);
		} catch (error) {
			console.error("FAILURE");
		}

		setLoading(false);
	}

	function createMessage(role: string, content: string) {
		return {
			role,
			content,
		};
	}

	return (
		<div className="h-screen">
			<Header>Chat</Header>

			<div className="p-4  grid grid-cols-1 lg:grid-cols-[1fr,3fr,250px] gap-8 h-[calc(100%-3.5rem)]">
				<form className="relative  h-full" onSubmit={systemSubmit}>
					<p className="z-50 top-2 left-3 absolute font-medium">
						System
					</p>
					<Textarea
						className="py-10 resize-none w-full h-full"
						placeholder="Enter role of the chabot here..."
						value={system}
						onChange={(e) => setSystem(e.target.value)}
					/>
					<Button
						className="absolute bottom-4 right-4 bg-blue-700"
						disabled={system === "" || loading}
					>
						Submit
					</Button>
				</form>

				{/* h-[calc(100%-3.5rem)] */}
				<div className="relative  ">
					<ScrollArea
						className="h-[calc(100vh-8rem)] px-4   pt-12"
						id="chatContainer"
					>
						<div className=" flex flex-col gap-4 ">
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
												"  text-slate-700 border self-center line-clamp-1 truncate absolute top-0":
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

							{loading && (
								<div className="flex flex-col text-white">
									<div
										className={cn(
											"rounded-lg px-2 py-1 w-fit bg-slate-200 text-black self-start"
										)}
									>
										...
									</div>
								</div>
							)}
						</div>
					</ScrollArea>
					<form
						className="bottom-0 absolute flex gap-4 left-0 right-0"
						onSubmit={messageSubmit}
					>
						<Input
							className="w-full"
							placeholder="Enter your message here..."
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
						/>
						<Button
							className=""
							disabled={newMessage === "" || loading}
						>
							Send
						</Button>
					</form>
				</div>

				<div className="font-mono text-slate-500 text-sm border-l px-4">
					coming soon...
				</div>
			</div>
		</div>
	);
}

// craete array from 1-100 with {user:'user', content: 'content'} and then map it
const Xmessages = Array.from({ length: 100 }, (_, i) => ({
	role: "user",
	content: `content ${i}`,
}));
