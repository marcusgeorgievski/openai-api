import Header from "@/components/ui/header";
import { Terminal } from "lucide-react";
import Link from "next/link";

interface AboutPageProps {
	//children: React.ReactNode;
}

export default function AboutPage() {
	return (
		<>
			<Header>About</Header>

			<div className="p-4 py-8 max-w-2xl mx-auto flex flex-col gap-8">
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
							<Terminal className="w-5" /> Tip
						</p>
						Wording matters. Entering &apos;<strong>Act</strong>{" "}
						like a dog&apos; to the system may cause it to act like
						a dog for 1 message, then resume back to a normal
						chatbot. Instead, try somehting like &apos;
						<strong>Pretend to be</strong> a dog&apos;. This will
						help clarify you would like it to act like a dog for a
						longer period of time.
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
		<div className="border-b-2 pb-8  pl-2">
			<h3 className="text-slate-700 font-semibold mb-4">{title}</h3>

			<div className="flex flex-col gap-3">{children}</div>
		</div>
	);
}
