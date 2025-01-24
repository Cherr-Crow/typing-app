let colors = ['is-info', 'is-success', 'is-warning', 'is-danger', 'is-link'];
//классы фреймворка bulma, в которые мы будем красить наши кнопки
//при каждой генерации мы будем назначать каждому символу свой цвет, чтобы пользователь при печати не путался
let str_arr = ['т', 'а', 'р', 'л', "н"];

let begin = document.querySelector(".begin"); // здесь у нас надпись, которая приглашает пользователя нажать Enter для начала игры.
let progress = document.getElementById("prog"); // здесь отображается прогресс ошибок пользователя
let buttons = document.querySelector('.buttons'); // элемент в который мы будем писать наши буковки

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function drawBoard() {
    for (let index = 0; index < 20; index++) { // в идеале показатель количества символов пользователь должен иметь возможность изменить
    let rand = getRandomInt(colors.length); // здесь у нас массив символов и цветов одинаковый по длине, поэтому неважно, откуда брать длину
        buttons.insertAdjacentHTML("afterbegin",
        `<button class='game-buttons button is-large 
        ${colors[rand]}' id='${str_arr[rand]}'>${str_arr[rand]}			
        </button>`);
    }
}
document.addEventListener('keydown', StartGame, {
    once: true
    //благодаря once у нас отрисовка вызывается только один раз
});

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

    if (e.key == elements_arr[0].id) { // здесь можно выбирать и по querySelector, но тогда код будет длиннее
        elements_arr[0].remove();
        count_right++; //  считаем правильные ответы
    
    
    } else {
        elements_arr[0].style.color = "red";
        errors_count++; // считаем ошибки
        progress.value = errors_count;
        console.log(e.key)

        if (errors_count > 20) { // если пользователь допустит ошибок больше чем у нас букв, игра закончится
            let fail = confirm("Game over! Хотите еще раз поиграть?"); 
            if (fail) {
                document.location.reload(); // перезагрузка страницы если пользователь согласился еще раз играть
            } else {
                // здесь могла быть ваша реклама
                document.addEventListener('keyup', press);
            }
        }
    }
    if (count_right == 20) {
        alert("Вы выйграли!");
        let win = confirm("Хотите поиграть еще?");
        if(win){
            drawBoard();
            begin.style.display = "none"; // скрываем приглашающую кнопку
            mainGame(); // игра началась
        }
    }
}


// change themes 

const checkboxTheme = document.getElementById("theme");
const heroTheme = document.getElementById("columns")

checkboxTheme.addEventListener("change", () => {
    if (checkboxTheme.checked) {
        console.log("black")
        document.body.classList.add("--dark-theme");
        heroTheme.classList.add("--dark-theme__hero")
    } else {
        document.body.classList.remove("--dark-theme");
        heroTheme.classList.remove("--dark-theme__hero")
    }
});

