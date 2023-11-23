import { getMessage } from "@/lib/openai";

export async function POST(req: Request) {
	const { messages, system } = await req.json();

	const payload = { messages };

	const res = await getMessage(payload);

	return Response.json({ assistant: res.message });
}
