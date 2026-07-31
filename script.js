const chat = document.getElementById("chat");
const input = document.getElementById("message");


// XP

let xp = Number(localStorage.getItem("xp")) || 0;



function updateXP() {

    document.getElementById("xp-count").innerText = xp;

    document.getElementById("your-xp").innerText = xp;

    updateLevel();

}



function updateLevel() {


    let level = "Beginner";


    if (xp >= 100 && xp < 300) {

        level = "Elementary";

    }


    if (xp >= 300 && xp < 600) {

        level = "Intermediate";

    }


    if (xp >= 600) {

        level = "Advanced";

    }


    document.getElementById("level").innerText = level;


}





updateXP();








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


            method:"POST",


            headers:{

                "Content-Type":"application/json"

            },


            body:JSON.stringify({

                message:text

            })


        });



        const data = await response.json();

console.log(data);

        chat.innerHTML += `

        <div class="message ai">

🤖 AI: ${data.reply || JSON.stringify(data)}

        </div>

        `;


    }


    catch(error){

    console.error(error);

    chat.innerHTML += `
        <div class="message ai">
            ❌ Ошибка: ${error.message}
        </div>
    `;

}



    chat.scrollTop = chat.scrollHeight;


}









// Enter отправка


input.addEventListener("keydown", function(event){


    if(event.key === "Enter"){

        sendMessage();

    }


});









// Испытания


function openChallenges(){


    hideAll();


    document.getElementById("challenge-box").style.display="block";


}






function checkChallenge() {

    if (localStorage.getItem("challengeDone") === "true") {

        document.getElementById("challenge-result").innerHTML =
        "✅ Это испытание уже выполнено.";

        return;

    }

    const answer = document
        .getElementById("challenge-answer")
        .value
        .toLowerCase()
        .trim();

    const result = document.getElementById("challenge-result");

    if (answer === "apple" || answer === "яблоко") {

        xp += 10;

        localStorage.setItem("xp", xp);
        localStorage.setItem("challengeDone", "true");

        updateXP();

        result.innerHTML = "🎉 Правильно! +10 XP";

        document.getElementById("challenge-answer").disabled = true;

    } else {

        result.innerHTML = "❌ Попробуй ещё раз";

    }

}








// Уроки


function openLessons(){


    hideAll();


    document.getElementById("lesson-box").style.display="block";


}





function completeLesson(){


    xp += 5;


    localStorage.setItem("xp",xp);


    updateXP();


    document.getElementById("lesson-result").innerHTML=

    "✅ Урок выполнен! +5 XP";


}









// Рейтинг


function openRanking(){


    hideAll();


    document.getElementById("ranking-box").style.display="block";


}








function hideAll(){


    document.getElementById("lesson-box").style.display="none";


    document.getElementById("challenge-box").style.display="none";


    document.getElementById("ranking-box").style.display="none";


}









// Новый чат


function newChat(){


    chat.innerHTML=`

    <div class="message ai">

    Hello! I am your AI teacher. Let's practice English!

    </div>

    `;


}
