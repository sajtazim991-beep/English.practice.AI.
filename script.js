const chat = document.getElementById("chat");
const input = document.getElementById("message");

function sendMessage() {

    let text = input.value;

    if (text === "") return;

    chat.innerHTML += `
    <p>👤 You: ${text}</p>
    `;

    input.value = "";

    // Временный ответ AI
    setTimeout(() => {

        chat.innerHTML += `
        <p>🤖 AI: Good job! Let's practice more English.</p>
        `;

        chat.scrollTop = chat.scrollHeight;

    }, 1000);
}
