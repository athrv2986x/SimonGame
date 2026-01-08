let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector(".title");
let h3 = document.querySelector(".subtitle");

let startBtn = document.querySelector("#startBtn");

document.addEventListener("keypress", function() {
    if(started == false) {
        console.log("game is started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 200);
};

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 200);
};

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    h3.innerText = "Repeat the sequence";

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    gameFlash(randBtn);
};

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 500);
        }
    } else {
        h2.innerHTML = `Game over! Your score was <b>${level - 1}</b>`;
        h3.innerText = "Press any key to start.";

        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(resetGame, 300);
    }
}


function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

startBtn.addEventListener("click", function() {
    if (!started) {
        started = true;
        levelUp();
    }
});

function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    document.querySelector("body").style.backgroundColor = "#1E1E2F";
};