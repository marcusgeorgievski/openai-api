import { getChatMessage } from "@/lib/openai-chat";

export const runtime = "edge"; // 'nodejs' is the default

export async function POST(req: Request) {
	const { messages } = await req.json();

	const payload = { messages };

	const res = await getChatMessage(payload);

	return Response.json({ assistant: res.message });
}
