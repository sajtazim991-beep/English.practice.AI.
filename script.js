const chat = document.getElementById("chat");
const input = document.getElementById("message");

async function sendMessage() {
    const text = input.value.trim();

    if (!text) return;

    // Сообщение пользователя
    chat.innerHTML += `
        <div class="message user">
            ${text}
        </div>
    `;

    input.value = "";

    // Ответ про создателя
    if (
        text.toLowerCase().includes("кто твой создатель") ||
        text.toLowerCase().includes("кто тебя создал") ||
        text.toLowerCase().includes("твой создатель")
    ) {
        chat.innerHTML += `
            <div class="message ai">
                Мой создатель — Сайдазим.
            </div>
        `;
        return;
    }

    // Показ "печатает"
    chat.innerHTML += `
        <div class="message ai" id="typing">
            Печатает...
        </div>
    `;

    chat.scrollTop = chat.scrollHeight;

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

        // Убираем "Печатает..."
        document.getElementById("typing").remove();

        // Ответ ИИ
        chat.innerHTML += `
            <div class="message ai">
                ${data.message || data.response || JSON.stringify(data)}
            </div>
        `;

    } catch (error) {

        document.getElementById("typing")?.remove();

        chat.innerHTML += `
            <div class="message ai">
                Ошибка: ${error.message}
            </div>
        `;
    }

    chat.scrollTop = chat.scrollHeight;
}
function newChat() {
    chat.innerHTML = "";
}
