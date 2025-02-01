import { arr__easy, arr__medium, arr__hard } from "./bd.js";


const btnEasy = document.getElementById("easy");
const btnMedium = document.getElementById("medium");
const btnHard = document.getElementById("hard");
const progress = document.getElementById("prog"); // здесь отображается прогресс ошибок пользователя

btnEasy.addEventListener("click", () => {
    localStorage.setItem("levl", "easy");
    settingsMenu.classList.remove('--open-menu')
});

btnMedium.addEventListener("click", () => {
    localStorage.setItem("levl", "medium");
    settingsMenu.classList.remove('--open-menu')
});

btnHard.addEventListener("click", () => {
    localStorage.setItem("levl", "hard");
    settingsMenu.classList.remove('--open-menu')
});


function getLevl(key) {

    if (key === "") {
        return arr__easy;
    } else if (key === "easy") {
        return arr__easy
    } else if (key === "medium") {
        return arr__medium
    } else if (key === "hard") {
        return arr__hard
    }


}

let begin = document.querySelector(".begin");
let buttons = document.querySelector('.buttons');

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function drawBoard() {
    if (localStorage.getItem("levl") == undefined) {
        localStorage.setItem("levl", "");
    }

    let mainLvl = getLevl(localStorage.getItem("levl"));
    let res = mainLvl[getRandomInt(12)]
    res = res.split('');
    res = res.reverse();
    console.log(res)
    progress.setAttribute("max", res.length)

    for (const word of res) {

        buttons.insertAdjacentHTML("afterbegin",
            `<button class='game-buttons button is-large 
            ' id='${word}'>${word}			
            </button>`);

    }
}
document.addEventListener('keydown', StartGame, {
    once: true
});

const repeat = document.getElementById("btn-repeat");
const ariaBtns = document.querySelector(".buttons");

repeat.addEventListener("click", () => {
    ariaBtns.innerHTML = "";
    drawBoard();
    begin.style.display = "none";
    mainGame();
})

function StartGame(e) {
    if (e.key == "Enter") {
        drawBoard();
        begin.style.display = "none";
        mainGame();
    }
}

function mainGame() {
    document.addEventListener('keyup', press);
}

var count_right = 0;

var errors_count = 0;

function press(e) {
    let elements_arr = document.querySelectorAll(".game-buttons");

    if (elements_arr.length == 1) {
        location.reload()
    }

    if (e.key == elements_arr[0].id) {
        elements_arr[0].remove();
        count_right++;
        progress.value = count_right;

    } else {

        elements_arr[0].style.color = "red";
        errors_count++;
    }

}


const checkboxTheme = document.getElementById("theme");
const heroTheme = document.getElementById("columns");

function lightTheme() {
    document.body.classList.add("--dark-theme");
    heroTheme.classList.add("--dark-theme__hero");
}

function darkTheme() {
    document.body.classList.remove("--dark-theme");
    heroTheme.classList.remove("--dark-theme__hero");
}

function getTheme() {
    console.log("sfgfd")
    if (localStorage.getItem("data-theme") === "light") {
        checkboxTheme.checked = false;
        darkTheme()

    } else if (localStorage.getItem("data-theme") === "dark") {
        checkboxTheme.checked = true;
        lightTheme()
    }
};


checkboxTheme.addEventListener("change", () => {
    if (checkboxTheme.checked) {
        localStorage.setItem('data-theme', 'dark');
        lightTheme()

    } else {
        localStorage.setItem('data-theme', 'light');
        darkTheme()
    }
});

// focus

const checkboxFocus = document.getElementById("focus");
const keyboard = document.getElementById("keyboard");

function getFocus() {
    console.log("sfgfd")
    if (localStorage.getItem("focus") === "true") {
        checkboxFocus.checked = true;
        keyboard.classList.add("--keyboard-none");

    } else if (localStorage.getItem("focus") === "false") {
        checkboxFocus.checked = false;
keyboard.classList.remove("--keyboard-none"), localStorage.setItem("focus", "false")
    }
};

document.addEventListener('DOMContentLoaded', () => {
    getTheme();
    getFocus()
});

checkboxFocus.addEventListener("change", () => {
    if (checkboxFocus.checked == true) {
        keyboard.classList.add("--keyboard-none");
        localStorage.setItem("focus", true)
    } else { keyboard.classList.remove("--keyboard-none"), localStorage.setItem("focus", "false") }
})

// menu settings

const settingsMenu = document.getElementById("menu");
const settingsButton = document.getElementById("settings-btn");
const settingsExit = document.getElementById("exit-btn")

settingsButton.addEventListener("click", () => {
    settingsMenu.classList.toggle('--open-menu')
});

settingsExit.addEventListener("click", () => {
    settingsMenu.classList.remove('--open-menu')
})