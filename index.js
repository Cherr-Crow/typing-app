import { arr__easy, arr__medium, arr__hard } from "./bd.js";


const btnEasy = document.getElementById("easy");
const btnMedium = document.getElementById("medium");
const btnHard = document.getElementById("hard");

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
        return arr__easy
    } else if(key === "easy") {
        return arr__easy
    } else if(key === "medium") {
        return arr__medium
    } else if(key === "hard") {
        return arr__hard
    }

    
}

let begin = document.querySelector(".begin"); // здесь у нас надпись, которая приглашает пользователя нажать Enter для начала игры.
let progress = document.getElementById("prog"); // здесь отображается прогресс ошибок пользователя
let buttons = document.querySelector('.buttons'); // элемент в который мы будем писать наши буковки

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function drawBoard() {
    let mainLvl = getLevl(localStorage.getItem("levl"));
    let res = mainLvl[getRandomInt(12)]
    res = res.split('');
    res = res.reverse();
    //for (let index = 0; index < 10; index++) { // в идеале показатель количества символов пользователь должен иметь возможность изменить
    for (const word of res) {
        // здесь у нас массив символов и цветов одинаковый по длине, поэтому неважно, откуда брать длину
        buttons.insertAdjacentHTML("afterbegin",
            `<button class='game-buttons button is-large 
            ' id='${word}'>${word}			
            </button>`);
        //  }

    }
}
document.addEventListener('keydown', StartGame, {
    once: true
    //благодаря once у нас отрисовка вызывается только один раз
});

const repeat = document.getElementById("btn-repeat");
const ariaBtns = document.querySelector(".buttons");

repeat.addEventListener("click", () => {
    ariaBtns.innerHTML = "";
    drawBoard();
    begin.style.display = "none"; // скрываем приглашающую кнопку
    mainGame(); // игра началась
})

function StartGame(e) {
    if (e.key == "Enter") {
        drawBoard();
        begin.style.display = "none"; // скрываем приглашающую кнопку
        mainGame(); // игра началась
    }
}

function mainGame() {
    document.addEventListener('keyup', press); //  я создал отдельную функцию, что бы была возможность ее удалять из прослушивателя
}

var count_right = 0;

var errors_count = 0;

function press(e) {
    let elements_arr = document.querySelectorAll(".game-buttons");  // выбираем все созданные кнопки

    if (elements_arr.length == 1) {
        location.reload()
    }

    if (e.key == elements_arr[0].id) { // здесь можно выбирать и по querySelector, но тогда код будет длиннее
        elements_arr[0].remove();
        count_right++; //  считаем правильные ответы

    } else {

        elements_arr[0].style.color = "red";
        errors_count++; // считаем ошибки
        progress.value = errors_count;

        if (errors_count > elements_arr.length) { // если пользователь допустит ошибок больше чем у нас букв, игра закончится
            let fail = confirm("Game over! Хотите еще раз поиграть?");
            if (fail) {
                document.location.reload(); // перезагрузка страницы если пользователь согласился еще раз играть
            } else {
                // здесь могла быть ваша реклама
                document.addEventListener('keyup', press);
            }
        }
    }
    /*  if (count_right == length) {
          alert("Вы выйграли!");
          let win = confirm("Хотите поиграть еще?");
          if(win){
              drawBoard();
              begin.style.display = "none"; // скрываем приглашающую кнопку
              mainGame(); // игра началась
          }
      } */


}


// change themes 

const checkboxTheme = document.getElementById("theme");
const heroTheme = document.getElementById("columns");


let theme = window.localStorage.getItem('theme');
if (theme == "dark") {
    darkTheme();
    checkboxTheme.checked = false
} else {
    lightTheme();
    checkboxTheme.checked = true
}
// theme == 'dark' ? darkTheme() : lightTheme();

function lightTheme() {
    document.body.classList.add("--dark-theme");
    heroTheme.classList.add("--dark-theme__hero");
}

function darkTheme() {
    document.body.classList.remove("--dark-theme");
    heroTheme.classList.remove("--dark-theme__hero")
};

checkboxTheme.addEventListener("change", () => {
    if (checkboxTheme.checked) {
        localStorage.setItem('data-theme', 'light');
        lightTheme()

    } else {
        localStorage.setItem('data-theme', 'dark');
        darkTheme()
    }
});

// focus

const checkboxFocus = document.getElementById("focus");
const keyboard = document.getElementById("keyboard");

checkboxFocus.addEventListener("change", () => {
    if (checkboxFocus.checked == true) {
        keyboard.classList.add("--keyboard-none")
    } else { keyboard.classList.remove("--keyboard-none") }
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