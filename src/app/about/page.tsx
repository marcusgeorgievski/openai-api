"use client";
import { cn } from "@/lib/utils";
import { Terminal } from "lucide-react";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";

interface AboutPageProps {
	//children: React.ReactNode;
}

export default function AboutPage() {
	return (
		<>
			<div className="px-4 pb-8 max-w-2xl mx-auto flex flex-col gap-8">
				<Topic title="Me">
					<p>
						<span className="text-blue-700 font-semibold">
							Marcus Georgievski
						</span>
						, Computer Science Student
					</p>
					<p>
						{"-> "}Full-Stack Development, Next.js, React,
						TypeScript, Python
					</p>
					<div className="flex gap-2">
						<LinkPopover
							icon={<AiFillGithub />}
							popoverStyle="w-[60px] -left-3 right-0 font-medium"
						>
							GitHub
						</LinkPopover>
						<LinkPopover
							icon={<CgWebsite />}
							popoverStyle="w-[60px] -left-3 right-0 font-medium"
						>
							Website
						</LinkPopover>
					</div>
				</Topic>
				<Topic title="What is this?">
					<p>
						This is a project to explore the capabilities of the
						OpenAI API. The goal is to create a chatbot that can be
						customized by the user. The user can provide
						instructions to the chatbot, and the chatbot will
						attempt to follow them.
					</p>
					<p>
						You may ask the chatbot to act like a cat, a dog, or an
						octopus, and it will attempt to.{" "}
					</p>

					<div className="p-4 rounded bg-emerald-100 text-emerald-600 ">
						<p className="font-medium mb-1 flex items-center gap-2">
							<Terminal className="w-5" /> Tip: Wording matters.
						</p>
						Entering{" "}
						<span className="font-mono text-sm border rounded border-emerald-500 px-1 bg-emerald-200">
							&apos;
							<strong>Act</strong> like a dog&apos;
						</span>{" "}
						to the system may cause it to act like a dog for 1
						message, then resume back to a default chatbot. Instead,
						try something like{" "}
						<span className="font-mono text-sm border rounded border-emerald-500 px-1 bg-emerald-200">
							&apos;
							<strong>Pretend</strong> to be a dog&apos;
						</span>{" "}
						. This clarify you want it to act like a dog
						indefinitely.
					</div>
				</Topic>

				<Topic title="What does the code look like?">
					<p>
						The code is actually quite simple. OpenAI has provided
						an easy to use API with a plethora of documentation.
					</p>

					<p className="text-sm">
						1. Instantiate the API object with our API key:
					</p>

					<pre className="text-xs bg-slate-100 rounded-lg p-2 whitespace-pre-wrap">
						{`import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});
`}
					</pre>

					<p className="text-sm">
						2. Create a function to call the API and get the message
					</p>
					<pre className="text-xs bg-slate-100 rounded-lg p-2 whitespace-pre-wrap">
						{`export async function getMessage(payload: any) {
	const response = await openai.chat.completions.create({
		model: "gpt-4-1106-preview",
		messages: payload.messages,
		temperature: 0.8,
		max_tokens: 256,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
	});

	return response.choices[0];
}
`}
					</pre>
					<p className="text-sm">
						3. Create the API route to call the function
					</p>
					<pre className="text-xs bg-slate-100 rounded-lg p-2 whitespace-pre-wrap">
						{`import { getMessage } from "@/lib/openai";

export async function POST(req: Request) {
	const { messages, system } = await req.json();

	const payload = { messages };

	const res = await getMessage(payload);

	return Response.json({ assistant: res.message });
}`}
					</pre>

					<p>
						Finally, call the API route how you wish. The{" "}
						<strong>payload</strong> can be customized to allow the
						user to specify the paramaters of the request in
						getMessage(). I plan to expand on it soon
					</p>
				</Topic>
			</div>
		</>
	);
}

function Topic({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="border-b-2 border-slate-400 pb-8 ">
			<h3 className="text-slate-800 font-semibold mb-4 text-xl ">
				{title}
			</h3>

			<div className="flex flex-col gap-3">{children}</div>
		</div>
	);
}

function LinkPopover({ icon, children, popoverStyle }: any) {
	return (
		<Link
			href={"https://github.com/marcusgeorgievski"}
			target="_blank"
			className="p-2 transition-all bg-blue-100 hover:bg-blue-200 flex rounded-lg text-blue-700 text-xl relative group"
		>
			{icon}
			<div
				className={cn(
					"absolute -bottom-4 text-xs mx-auto text-center opacity-0 group-hover:opacity-100 group-hover:-bottom-6 group-hover:text-sm transition-all",
					`${popoverStyle}`
				)}
			>
				<p className=" bg-blue-100 w-full text-blue-700 rounded">
					{children}
				</p>
			</div>
		</Link>
	);
}
