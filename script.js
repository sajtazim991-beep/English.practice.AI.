const chat = document.getElementById("chat");
const input = document.getElementById("message");

async function sendMessage() {
    const text = input.value.trim();

    if (!text) return;


    // сообщение пользователя
    chat.innerHTML += `
        <div class="message user">
            ${text}
        </div>
    `;


    input.value = "";


    // прокрутка вниз
    chat.scrollTop = chat.scrollHeight;


    // ответ про создателя
    if (
        text.toLowerCase().includes("кто твой создатель") ||
        text.toLowerCase().includes("кто тебя создал")
    ) {

        chat.innerHTML += `
            <div class="message ai">
                Мой создатель — Сайдазим.
            </div>
        `;

        chat.scrollTop = chat.scrollHeight;
        return;
    }


    // индикатор печати
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


        document.getElementById("typing")?.remove();


        chat.innerHTML += `
            <div class="message ai">
                ${data.message || data.response || JSON.stringify(data)}
            </div>
        `;


    } catch(error) {

        document.getElementById("typing")?.remove();


        chat.innerHTML += `
            <div class="message ai">
                Ошибка: ${error.message}
            </div>
        `;
    }


    chat.scrollTop = chat.scrollHeight;
}



// кнопка Новый чат
function newChat() {
    chat.innerHTML = `
        <div class="message ai">
            Hello! I am your AI teacher. Let's practice English!
        </div>
    `;
}


// когда открывается клавиатура
input.addEventListener("focus", () => {

    setTimeout(() => {
        input.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, 300);

});
function openChallenges() {
    const box = document.getElementById("challenge-box");

    if (box.style.display === "block") {
        box.style.display = "none";
    } else {
        box.style.display = "block";
    }
}
let xp = 0;
let xp = localStorage.getItem("xp") || 0;

document.getElementById("xp-count").innerText = xp;
function checkChallenge() {

    const answer = document
        .getElementById("challenge-answer")
        .value
        .toLowerCase()
        .trim();

    const result = document.getElementById("challenge-result");


    if (answer === "яблоко" || answer === "apple") {

        xp = Number(xp) + 10;

localStorage.setItem("xp", xp);
document.getElementById("xp-count").innerText = xp;
        result.innerHTML = "✅ Правильно! +10 XP";

    } else {

        result.innerHTML = "❌ Попробуй ещё раз";

    }

}
