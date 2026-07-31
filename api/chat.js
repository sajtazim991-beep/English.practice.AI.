module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://english-practice-ai.vercel.app",
        "X-Title": "English AI Tutor"
      },
      body: JSON.stringify({
        model: "inclusionai/ling-3.0-flash:free",
        messages: [
          {
            role: "system",
content: "You are an English tutor. Answer in simple plain text. Do not use markdown formatting. Do not use symbols like #, *, |, or \\n. Do not use tables. Write naturally with clear paragraphs and examples. Explain lessons in a student-friendly way."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    cconst data = await response.json();

console.log(data);

if (!response.ok) {
  return res.status(response.status).json(data);
}

return res.status(200).json({
  reply: data.choices?.[0]?.message?.content || "Пустой ответ от OpenRouter"
});
