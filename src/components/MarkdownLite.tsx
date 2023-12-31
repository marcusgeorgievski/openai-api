import React from "react";
import Link from "next/link";

const MarkdownLite = ({ text }: { text: string }) => {
	const linkRegex = /\[(.+?)\]\((.+?)\)/g;
	const boldRegex = /\*\*(.*?)\*\*/g;

	const parseBoldText = (text: string) => {
		const parts = [];
		let lastIndex = 0;
		let match;

		while ((match = boldRegex.exec(text)) !== null) {
			const [fullMatch, boldText] = match;
			const matchStart = match.index;
			const matchEnd = matchStart + fullMatch.length;

			if (lastIndex < matchStart) {
				parts.push(text.slice(lastIndex, matchStart));
			}

			parts.push(<strong key={matchStart}>{boldText}</strong>);

			lastIndex = matchEnd;
		}

		if (lastIndex < text.length) {
			parts.push(text.slice(lastIndex));
		}

		return parts;
	};

	const parts = [];
	let lastIndex = 0;
	let match;

	while ((match = linkRegex.exec(text)) !== null) {
		const [fullMatch, linkText, linkUrl] = match;
		const matchStart = match.index;
		const matchEnd = matchStart + fullMatch.length;

		if (lastIndex < matchStart) {
			parts.push(parseBoldText(text.slice(lastIndex, matchStart)));
		}

		parts.push(
			<Link
				className="text-blue-600 underline break-words underline-offset-2"
				key={linkUrl}
				href={linkUrl}
			>
				{parseBoldText(linkText)}
			</Link>
		);

		lastIndex = matchEnd;
	}

	if (lastIndex < text.length) {
		parts.push(parseBoldText(text.slice(lastIndex)));
	}

	return (
		<>
			{parts.map((part, i) => (
				<React.Fragment key={i}>
					{Array.isArray(part) ? part : [part]}
				</React.Fragment>
			))}
		</>
	);
};

export default MarkdownLite;
