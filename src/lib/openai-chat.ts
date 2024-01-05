import openai from "./openai";

export async function getChatMessage(payload: any) {
	const response = await openai.chat.completions.create({
		model: "gpt-4-1106-preview",
		temperature: 0.8,
		max_tokens: 256,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
		...payload,
	});

	return response.choices[0];
}
