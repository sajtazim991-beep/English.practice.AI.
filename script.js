const chat = document.getElementById("chat");
const input = document.getElementById("message");



// XP система

let xp = Number(localStorage.getItem("xp")) || 0;


const xpCount = document.getElementById("xp-count");

if (xpCount) {
    xpCount.innerText = xp;
}





// Отправка сообщения

async function sendMessage() {

    const text = input.value.trim();


    if (!text) return;



    chat.innerHTML += `

        <div class="message user">
            👤 You: ${text}
        </div>

    `;


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



        chat.innerHTML += `

            <div class="message ai">

                🤖 AI: ${data.message || JSON.stringify(data)}

            </div>

        `;



    } catch(error) {


        chat.innerHTML += `

            <div class="message ai">

                ❌ Ошибка: ${error.message}

            </div>

        `;


    }



    chat.scrollTop = chat.scrollHeight;

}







// Enter отправляет сообщение

input.addEventListener("keydown", function(event) {


    if (event.key === "Enter") {


        sendMessage();


    }


});









// Открыть испытания

function openChallenges() {


    const box = document.getElementById("challenge-box");



    if (box.style.display === "block") {


        box.style.display = "none";


    } else {


        box.style.display = "block";


    }


}








// Проверка испытания


function checkChallenge() {


    const answer = document
        .getElementById("challenge-answer")
        .value
        .toLowerCase()
        .trim();



    const result = document.getElementById("challenge-result");



    if (answer === "apple" || answer === "яблоко") {



        xp = xp + 10;



        localStorage.setItem("xp", xp);



        document.getElementById("xp-count").innerText = xp;



        result.innerHTML = "✅ Правильно! +10 XP";



    } else {



        result.innerHTML = "❌ Неправильно. Попробуй ещё раз";



    }



}









// Новый чат


function newChat() {


    chat.innerHTML = `

        <div class="message ai">

            Hello! I am your AI teacher. Let's practice English!

        </div>

    `;


}
