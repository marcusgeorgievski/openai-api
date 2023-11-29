import openai from "./openai";

async function createAssistant() {
	const myAssistant = await openai.beta.assistants.create({
		instructions:
			"You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
		name: "Math Tutor",
		tools: [{ type: "code_interpreter" }],
		model: "gpt-4",
	});

	console.log(myAssistant);
}

async function retrieveAssistant() {
	const myAssistant = await openai.beta.assistants.retrieve("asst_abc123");

	console.log(myAssistant);
}

async function updateAssistant() {
	const myUpdatedAssistant = await openai.beta.assistants.update(
		"asst_abc123",
		{
			instructions:
				"You are an HR bot, and you have access to files to answer employee questions about company policies. Always response with info from either of the files.",
			name: "HR Helper",
			tools: [{ type: "retrieval" }],
			model: "gpt-4",
			file_ids: ["file-abc123", "file-abc456"],
		}
	);

	console.log(myUpdatedAssistant);
}

async function listAssistants() {
	const myAssistants = await openai.beta.assistants.list({
		order: "desc",
		limit: 20,
	});

	console.log(myAssistants.data);
}
