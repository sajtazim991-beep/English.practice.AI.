const chat = document.getElementById("chat");
const input = document.getElementById("message");

async function sendMessage() {
    const text = input.value.trim();

    if (!text) return;

    chat.innerHTML += `<p><b>👤 You:</b> ${text}</p>`;
    input.value = "";

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text
            })
        });

        const data = await response.json();

        chat.innerHTML += `<p><b>🤖 AI:</b> ${data.reply}</p>`;
        chat.scrollTop = chat.scrollHeight;

    } catch (error) {
        chat.innerHTML += `<p><b>❌ Error:</b> Could not connect to AI.</p>`;
    }
}
