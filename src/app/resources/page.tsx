import Header from "@/components/ui/header";
import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";

interface ResourcesPageProps {
	//children: React.ReactNode;
}

export default function ResourcesPage() {
	return (
		<>
			<div className="text-emerald-600 p-4 flex flex-col gap-8">
				{resources.map((resource) => (
					<div
						className="flex flex-col gap-2 ml-4"
						key={resource.link}
					>
						<Link
							href={resource.link}
							target="_blank"
							className="flex items-center gap-2"
						>
							{resource.title} <HiOutlineExternalLink />
						</Link>
						{resource.subresources && (
							<div className="ml-6">
								{resource.subresources.map((subresource) => (
									<Link
										href={subresource.link}
										target="_blank"
										className="flex items-center gap-2 text-emerald-600/70"
										key={subresource.link}
									>
										{subresource.title}{" "}
										<HiOutlineExternalLink />
									</Link>
								))}
							</div>
						)}
					</div>
				))}
			</div>
		</>
	);
}

const resources = [
	{
		title: "Documentation",
		link: "https://platform.openai.com/docs/overview",
		subresources: [
			{
				title: "Assistants",
				link: "https://platform.openai.com/docs/assistants/overview",
			},
			{
				title: "Prompt Engineering",
				link: "https://platform.openai.com/docs/guides/prompt-engineering",
			},
		],
	},
	{
		title: "API Reference",
		link: "https://beta.openai.com/docs/api-reference",
		subresources: [
			{
				title: "Chat",
				link: "https://platform.openai.com/docs/api-reference/chat",
			},
			{
				title: "Assistants",
				link: "https://platform.openai.com/docs/api-reference/assistants",
			},
		],
	},
	{
		title: "API Playground",
		link: "https://beta.openai.com/playground",
	},
	{
		title: "OpenAI Blog",
		link: "https://openai.com/blog/",
	},
];
