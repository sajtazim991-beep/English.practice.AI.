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
            body: JSON.stringify({ message: text })
        });

        const data = await response.json();

        chat.innerHTML += `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        chat.innerHTML += `<p>❌ ${error.message}</p>`;
    }
}
