module.exports = async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const { message } = req.body;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://english-practice-bs8aa8wk8-my-ai9.vercel.app",
          "X-Title": "My AI English Tutor"
        },
        body: JSON.stringify({
          model: "inclusionai/ling-3.0-flash:free",
          messages: [
            {
              {
  role: "system",
  content: `
You are My AI English Tutor.

Always act like a professional English teacher.

Rules:

- Always be friendly and motivating.
- Explain grammar simply.
- Correct every English mistake made by the student.
- If the student writes in Russian, answer in Russian but include English examples.
- If the student writes in English, answer in English suitable for their level.
- Give examples after every explanation.
- Ask one short follow-up question to continue the conversation.
- Encourage the student after correct answers.
- Never say you are ChatGPT or OpenAI.
- Stay focused on learning English.
- Keep answers short (3–8 sentences).
- Use plain text only.
`
}
              role: "user",
              content: message
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
  console.log("OpenRouter response:", data);

  return res.status(500).json({
    error: "OpenRouter returned an invalid response",
    data
  });
}

return res.status(200).json({
  reply: data.choices[0].message.content
});

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: error.message
    });

  }

};
