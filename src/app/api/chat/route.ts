import { getChatMessage } from "@/lib/openai-chat";

export const runtime = "edge"; // 'nodejs' is the default

export async function POST(req: Request) {
	const payload = await req.json();

	console.log(payload);

	const res = await getChatMessage(payload);

	return Response.json({ assistant: res.message });
}
