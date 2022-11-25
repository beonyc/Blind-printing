document.querySelector('#send').onclick = send;
document.querySelector("#start").onclick = start;
const newDiv = document.createElement("div");
const AnswerLineFocus = document.getElementById('answer');
let anwersCss = document.querySelector(".anwers");


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
let tryAnwersCount = 1;
let sendCount = 0;

 function start() {
    AnswerLineFocus.focus();
    let FirstRandText = randomList[getRandomFunction()];
    document.querySelector("#RandomText").innerHTML = FirstRandText;
     startTimer();

    // document.querySelector("#count").innerHTML = "";
    // document.querySelector("#fullanswerList").innerHTML = "";
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

    let secondlimit = 2;//время таймера
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
        document.querySelector("#RandomText").innerHTML = "";

        document.querySelector('#send').disabled = true;


        if (sendCount == 0) //если таймер прошёл, но ничегоне ввели
        {
            tryAnwersCount--;
            alert("Попробуйте еще раз");
        }
        else {
            if (tryAnwersCount > 1) {

                createNewElement();
                anwersCss.style.padding="15px";

            } else {

                document.getElementById("tryCount").innerHTML = `Попытка #${tryAnwersCount}`;
                let countView = CountCorrect + "/" + countAll;
                document.querySelector("#count").innerHTML = countView;
                document.querySelector("#fullanswerList").innerHTML = fullanswerList.join("");
                 anwersCss.style.padding="15px";

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
        document.getElementById("tryCount").innerHTML = `Попытка #${tryAnwersCount}`;
        divToCopy.after(newAnswer);
    }
    return;
}



function getRandomFunction() {
    let rand = Math.floor(Math.random() * randomList.length);
    return rand;
}


function send() {
    if (pressStartCount == 0) {
        return alert('Please, press "start" button');;
    }
    sendCount++;
    AnswerLineFocus.focus();

    let RandText = document.querySelector("#RandomText").innerHTML.replace(/^ /, "");
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








