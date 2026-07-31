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
              role: "system",
              content:
                "You are a friendly English tutor. Answer simply and clearly."
            },
            {
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
