document.querySelector('#send').onclick = send;
document.querySelector("#start").onclick = start;
const newDiv = document.createElement("div");
const currentDiv = document.getElementsByClassName("anwers");
const AnswerLineFocus = document.getElementById('answer');

// new edit
// new editss

const randomList = [
    'const array_name = [item1, item2];',
    'const array_name = ["item1", "item2"];',
    'const person = {firstName:"Iurii", lastName:"Surobov", age:22};',
    ]



const fullanswerList = [];
let answList = "";
let CountCorrect = 0;
let countAll = 0;
let pressStartCount = 0;


function start() {
    AnswerLineFocus.focus();
    let FirstRandText = randomList[getRandomFunction()];
    document.querySelector("#RandomText").innerHTML = FirstRandText;
    startTimer();

    document.querySelector("#count").innerHTML = "";
    document.querySelector("#fullanswerList").innerHTML = "";
    document.querySelector('#send').disabled = false; //при повтороном нажатии "start", разблокировать "send"



    pressStartCount++;
}

document.addEventListener('keyup', function (event) {
    if (event.keyCode == 13)// код клавиши enter=13
    {
        send();
    }

});


function startTimer() {

    let secondlimit = 10;//время таймера
    let time = setInterval(function () { myTimer() }, 1000);
    function myTimer() {

        if (secondlimit == 0) {
            myStopFunction();
        }
        document.getElementById("Timer").innerHTML = '00:' + zeroInfront(secondlimit);
        secondlimit -= 1;
    }
    function zeroInfront(num) {

        if (num < 10) { return "0" + num; }
        return num;
    }
    function myStopFunction() {
        clearInterval(time);

        //вывод ответов, счётчик правильных ответов
        let countView = CountCorrect + "/" + countAll;
        document.querySelector("#count").innerHTML = countView;
        document.querySelector("#fullanswerList").innerHTML = fullanswerList.join("");
        changeColor();
        document.querySelector("#RandomText").innerHTML = "time is up"
        document.querySelector('#send').disabled = true;


    }
}



function getRandomFunction() {
    let rand = Math.floor(Math.random() * randomList.length);
    return rand;
}


function send() {
    if (pressStartCount == 0) {
        return alert('Please, press "start" button');;
    }
    AnswerLineFocus.focus();

    let RandText = document.querySelector("#RandomText").innerHTML.replace(/^ /,"");
    let answer = document.querySelector('#answer').value.replace(/^ /,"") ;


    if (RandText.split(' ').join('')== answer.split(' ').join('')) {
        answList = RandText + "-----" + answer;
        CountCorrect++;
        fullanswerList[countAll] = "<p class='correct' >" + answList + "</p>";
    }
    else {
        answList = RandText + "-----" + answer;
        fullanswerList[countAll] = "<p class='wrong'>" + answList + "</p>";
    }

    RandText = randomList[getRandomFunction()];
    document.querySelector("#RandomText").innerHTML = RandText;
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







// function changestyle(resultDiv, CountCorrect) {

//     if (resultDiv == 1) {
//         return document.querySelector("#count").style.background = 'rgba(0,255,0,0.3)';

//     } else {
//         if (1 < resultDiv && resultDiv <= 1.3) {
//             return document.querySelector("#count").style.background = 'rgba(255,255,0,0.3)';
//         }
//         else {
//             if (1.3 < resultDiv && resultDiv <= 1.7) {
//                 return document.querySelector("#count").style.background = 'rgba(255,165,0,0.3)';
//             } else {
//                 if (resultDiv > 1.7 || CountCorrect == 0)
//                     return document.querySelector("#count").style.background = 'rgba(255,0,0,0.3)';
//             }
//         }
//     }

// }



