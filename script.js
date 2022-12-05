document.querySelector('#send').onclick = send;
document.querySelector("#start").onclick = start;
// document.getElementById("stopTimer").onclick = ()=>startTimer(false);
const AnswerLineFocus = document.getElementById('answer');
let anwersCss = document.querySelector(".anwers");

const listPython = [
    'def myfucnc(): x=100',
    'import json',
   " mydoc = mycol.find().sort('name', -1)"
   
]


const listJS = [
    "const array_name = [item1, item2];",
    "const array_name = ['item1', 'item2'];",
    "const person = {firstName:'Iurii', lastName:'Surobov', age:22};",
    "var square = function(number) { return number * number; }",
    "for (i = 0; i != a.length; i++){}",
    "var numbers = [0, 1, 2, 5, 10];",
    "function square(n) { return n * n; }",
    "while(x<10){x++}",
    "try {} catch (err){}",
    "use strict",
    "alert('some code')",
    "let user = 'John'",
    "let str = 'Привет'",
    "alert(typeof value);",
    " let result = 5 > 4;",
    "if (hour < 10 || hour > 18)",
    "alert( true && false );",
    "let area = (height ?? 100) * (width ?? 50);",
    "for (let i = 0; i < 3; i++) {}",
    "break label;",
    "function showMessage() {}",
    "export function sayHi(user) {}",
    "import {sayHi, sayBye} from './say.js';",
    "import * as say from './say.js';",
    "export default class User {}",
    "let elem = document.getElementById('elem');",
    "let divs = document.getElementsByTagName('div');",
    "var item = JSON.stringify(someObject);",
    "var expire = new Date();",
    "document.cookie = 'login=tom32;';",
    "setTimeout(() => alert('Привет'), 1000);",
    "let rand = Math.floor(Math.random() * randomList.length);",
    "document.addEventListener('keyup', function(){});",
    "let time = setInterval( ()=>{ myTimer() }, 1000);",
    " if (array.length == 0){}",
    "justify-content: space-between;"


]
// const randomList = ["document.cookie = 'login=tom32;';"]

const fullanswerList = [];
let answList = "";
let CountCorrect = 0;
let countAll = 0;
let pressStartCount = 0;
let tryAnwersCount = 1;
let sendCount = 0;
var selectedLanguage = [];
var currentlanguage = '';


function start() {
    var language = document.querySelector(`#language`).value;


    if (language == 'JS') { selectedLanguage = listJS; currentlanguage = 'JS' }
    else { selectedLanguage = listPython; currentlanguage = 'Python'; }

    document.getElementById('Timer').classList.remove('fotka');
    AnswerLineFocus.focus();
    let FirstRandText = selectedLanguage[getRandomFunction()];
    document.querySelector("#RandomText").textContent = FirstRandText;
    startTimer();
    document.querySelector('#send').disabled = false; //при повтороном нажатии "start", разблокировать "send"
    pressStartCount++;
}

document.addEventListener('keyup', function (event) {
    if (event.keyCode == 13)// код клавиши enter=13
    {
        send();
    }
});


let newSeconds = 0;
let minutes = 0;
function timeRefresh(secondlimit) {
    minutes = Math.floor(secondlimit / 60);
    newSeconds = secondlimit % 60;

    if (minutes < 10) {

        if (newSeconds >= 10)
            return `0${minutes}:${newSeconds}`;
        return `0${minutes}:0${newSeconds}`;

    }
    else {
        if (newSeconds >= 10)
            return `${minutes}:${newSeconds}`;
        return `${minutes}:0${newSeconds}`;
    }

}



function startTimer() {

    let secondlimit = document.getElementById('changeTime').value;
    document.getElementById("stopTimer").onclick = myStopFunction;
    let time = setInterval(() => { myTimer() }, 1000);
    function myTimer() {

        if (secondlimit == 0) {
            myStopFunction();
        }
        document.getElementById("Timer").innerHTML = timeRefresh(secondlimit);
        secondlimit -= 1;
    }

    function myStopFunction() {
        console.log(tryAnwersCount);
        clearInterval(time);
        document.querySelector("#RandomText").textContent = "";


        document.getElementById('Timer').classList.add('fotka');//
        document.querySelector('#send').disabled = true;


        if (sendCount == 0) //если таймер прошёл, но ничегоне ввели
        {
            tryAnwersCount--;
            alert("Попробуйте еще раз");
        }
        else {
            if (tryAnwersCount > 1) {

                createNewElement();
                anwersCss.style.padding = "15px";

            } else {

                document.getElementById("tryCount").textContent = `Попытка #${tryAnwersCount} `;
                document.getElementById("currentlanguage").innerHTML = ` ${currentlanguage} `;
                let countView = CountCorrect + "/" + countAll;
                document.querySelector("#count").innerHTML = countView;
                document.querySelector("#fullanswerList").innerHTML = fullanswerList.join("");
                anwersCss.style.padding = "15px";

            }
        }
        fullanswerList.length = 0;
        CountCorrect = 0;
        countAll = 0;
        tryAnwersCount++;
        //changeColor(); 



    }
}


function createNewElement() {

    if (fullanswerList.length == 0) //если это не первая попытка и закончился таймер
    {
        tryAnwersCount--;
        alert("Попробуйте еще раз");
    }
    else {
        let divToCopy = document.querySelector('.anwers');
        let newAnswer = divToCopy.cloneNode(true);
        let countView = CountCorrect + "/" + countAll;
        document.querySelector("#count").innerHTML = countView;
        document.querySelector("#fullanswerList").innerHTML = fullanswerList.join("");
        document.getElementById("tryCount").textContent = `Попытка #${tryAnwersCount} `;
        document.getElementById("currentlanguage").innerHTML = ` ${currentlanguage} `;
        divToCopy.after(newAnswer);
    }
    return;
}



function getRandomFunction() {
    let rand = Math.floor(Math.random() * selectedLanguage.length);
    return rand;
}


function send() {
    if (pressStartCount == 0) {
        return alert('Please, press "start" button');;
    }
    sendCount++;
    AnswerLineFocus.focus();

    let RandText = document.querySelector("#RandomText").textContent.replace(/^ /, "");
    let answer = document.querySelector('#answer').value.replace(/^ /, "");


    if (RandText.split(' ').join('') == answer.split(' ').join('')) {
        answList = RandText + "   |   " + answer;
        CountCorrect++;
        fullanswerList[countAll] = "<p class='correct'>" + answList + "</p>";
    }
    else {
        answList = RandText + "   |   " + answer;
        fullanswerList[countAll] = "<p class='wrong'>" + answList + "</p>";
    }

    RandText = selectedLanguage[getRandomFunction()];
    document.querySelector("#RandomText").textContent = RandText;
    document.querySelector('#answer').value = "";
    countAll++;
}




//получение цвета ответов
function changeColor() {
    let changeColorWrong = document.querySelectorAll('.wrong');
    let changeColorCorrect = document.querySelectorAll('.correct');

    for (let elem of changeColorWrong) {
        elem.style.backgroundColor = 'rgba(255,0,0,0.25)';
    }
    for (let elem of changeColorCorrect) {
        elem.style.backgroundColor = 'rgba(0,255,0,0.25)';
    }
}


// document.addEventListener('click',event=>{

//     let whatTarget= event.target;
//     console.log(whatTarget)
// })






