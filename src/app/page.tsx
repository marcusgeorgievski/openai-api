import { Separator } from "@/components/shadcn/ui/separator";
import Header from "@/components/ui/header";
import Link from "next/link";
import { RiOpenaiFill } from "react-icons/ri";
import { CiChat1 } from "react-icons/ci";

interface HomeProps {
	//children: React.ReactNode;
}

export default function Home() {
	return (
		<div className="w-fit px-6  mx-auto py-10 ">
			<h1 className="text-5xl font-bold text-emerald-500 gap-2 mb-12 flex leading-tight  justify-start ">
				<RiOpenaiFill className="translate-y-1.5  flex-shrink-0" />
				<div>
					<span>OpenAI</span>{" "}
					<span className="text-black ">API Playground</span>
				</div>
			</h1>

			<div className="mx-auto max-w-lg">
				<p className="text-accent-foreground max-w-lg">
					Inspired by the{" "}
					<span className="text-emerald-500 font-medium">
						Open API
					</span>{" "}
					API playground, dedicated to learning and developing in
					Next.js.
				</p>
				<div className="flex items-center max-w-lg justify-between mt-4 gap-4">
					<p>
						Explore the navigation side-menu, chat and customize
						with the latest models available and more coming{"->"}
					</p>
					<div className="  bg-slate-100 rounded inline-block aspect-square p-4 ">
						<p className="text-slate-600 font-mono text-xs mb-2">
							coming soon:
						</p>

						<ul className="list-disc list-inside text-sm pl-2 whitespace-nowrap">
							<li>Assistant</li>
							<li>Audio</li>
							<li>Image</li>
							<li>Files</li>
						</ul>
					</div>
				</div>

				<div>
					<p className="mb-2 text-xs mt-8">
						Start a chat with a sample plant shop assistant
					</p>
					<Link
						href={"/chat"}
						className="bg-emerald-100 p-2 rounded text-emerald-600 font-semibold  text-center  hover:bg-emerald-200/80 transition-all flex items-center justify-center gap-2"
					>
						<CiChat1 className="text-xl animate-pulse" />
						Chat Now
					</Link>
				</div>
			</div>
		</div>
	);
}
