import Header from "@/components/ui/header";
import Link from "next/link";
import { DiRedis } from "react-icons/di";

interface NotesPageProps {
	//children: React.ReactNode;
}

export default function NotesPage() {
	return (
		<>
			<div className="lg:columns-2 [&>*]:break-inside-avoid-column [&>*]:mb-4 p-4 ">
				<Note title="Assistants">
					Look into assistants{" "}
					<Link
						href={
							"https://platform.openai.com/docs/assistants/overview"
						}
						target="_blank"
						className="text-blue-700 font-medium underline"
					>
						here
					</Link>
					. Assistants appear more specialized for a chatbot with a
					single purpose, rather than a general assistant. They can be
					provided direct instructions and leverage other tools such
					as{" "}
					<strong>
						Code Interpreter, Retrieval, and Function calling
					</strong>
				</Note>
				<Note title="System Messages">
					Read more into System messages, the first message from the
					API Playground{" "}
					<Link
						href={
							"https://platform.openai.com/playground?lang=curl&mode=chat&model=gpt-4-1106-preview"
						}
						target="_blank"
						className="text-blue-700 font-medium underline"
					>
						here
					</Link>
					. The playground modifies the first message whenever it is
					change instead of adding a new one to messages array. This
					seems to confuse the model: For example, telling it to act
					like a cat, then like a dog 10 messages later, it will
					analyze and apologize for the confusion (acting like a cat)
					since that system message is modified to the dog version.
					<pre className=" text-xs whitespace-wrap m-0">{`
{
    role: "system",
    content: "Follow some instructions"
}
                    `}</pre>
				</Note>
				<Note title="Stream Response">
					Streaming a the response from the model could lead to
					increase attention from users being able to read
					line-by-line. <br />I have a simple loading message
					animation to indicate a message is being generated. I
					actually prefer this since you recieve the entirety of the
					message at once, <strong>much faster</strong> - and can read
					it at your own pace.{" "}
				</Note>
				<Note title="Scroll to Bottom">
					Staying at the bottom of a chat in a scrollable container is
					important. Solutions fpund have not been working.
				</Note>
				<Note title="Rate Limiting">
					I should rate limit the number of messages per user.
					Reliable option for local storage is{" "}
					<span className="bg-red-100 text-red-600 rounded px-1 font-medium">
						<DiRedis className="inline text-xl mr-1" />
						Redis
					</span>
					.
				</Note>
			</div>
		</>
	);
}

function Note({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="bg-slate-50 border rounded p-6 group">
			<h3 className="font-mono text-slate-500 mb-2 text-sm group-hover:underline underline-offset-2">
				{title}
			</h3>
			<div className="text-slate-700 [&>*]:whitespace-pre-wrap">
				{children}
			</div>
		</div>
	);
}
