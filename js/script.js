let hamburger = document.querySelector('.hamburger');
let menu = document.querySelector('.menu');
let gears = document.querySelector('.fa-gears');
let sun = document.querySelector('.fa-sun');
let moon = document.querySelector('.fa-moon');
let symbole = null;
let allButton = document.querySelectorAll('.box__buttons button');
let firstNumber = null;
let operationsButtonActive = false;
let secondNumber = null;
let body = document.querySelector('body');
//let themeColor = body.style.getComputedStyle('--orange');
//console.log(themeColor);
const inputTable = document.querySelector('input');
for (let i = 0; i < allButton.length; i++) {// c'est un cycle qui se répète autant de fois que nous avons de boutons
    allButton[i].onclick = function () {//quand on appuie sur n'importe quel bouton, une fonction démarre
        if (allButton[i].classList.contains('grey')) {
            greyButtonClick(allButton[i]);
        } else if (allButton[i].classList.contains('orange')) {
            orangeButtonClick(allButton[i]);
        } else {
            darkNumberButtonClick(allButton[i]);
        }
    }
}

sun.onclick = function () {
    sun.classList.remove('icon_off');
    moon.classList.add('icon_off');
    gears.classList.add('icon_off');
    body.style.setProperty('--orange', 'orange');
    body.style.setProperty('--white', '#ffffff');
    body.style.setProperty('--grey', '#4d4d4d');
}

moon.onclick = function () {
    sun.classList.add('icon_off');
    moon.classList.remove('icon_off');
    gears.classList.add('icon_off');
    body.style.setProperty('--orange', '#c78100');
    body.style.setProperty('--white', '#565656');
    body.style.setProperty('--grey', '#000000');
}

gears.onclick = function () {
    sun.classList.add('icon_off');
    moon.classList.add('icon_off');
    gears.classList.remove('icon_off');
}

hamburger.onclick = function () {
    hamburger.classList.toggle('hamburger_active');
    menu.classList.toggle('menu__active');
}

function greyButtonClick(button) {//⚪️
    if (button.innerText == 'AC') {
        inputTable.value = '0';
        inputFontSizeChange()
        symbole = null;
        firstNumber = null;
        secondNumber = null;
        operationsButtonActive = false;
        orangeButtonActiveRemove();
    }
    if (button.innerText == '+/-') {
        if (operationsButtonActive == true) {
            inputTable.value = '-0';
            operationsButtonActive = false;
            orangeButtonActiveRemove();
        } else {
            if (inputTable.value[0] == '-') {//Si le 1er symbole est égal au moins
                inputTable.value = inputTable.value.slice(1);//alors on supprime le 1er symbole
            } else {//sinon, si le 1er symbole, ce n'est pas un moins
                inputTable.value = '-' + inputTable.value;//on ajoute le moins tout au début
            }
        }
        inputFontSizeChange()
    }
    if (button.innerText == '%') {
        inputTable.value = parseFloat(inputTable.value) / 100;
        inputFontSizeChange()
    }
}

function orangeButtonClick(button) {//🟠
    orangeButtonActiveRemove();
    if (button.innerText == '=') {//si on a appyé sur le bouton avec le signe '='
        if (firstNumber != null) {
            secondNumber = parseFloat(inputTable.value);
            count(button);
        }
    } else {//sinon, si on a appyé sur les autres boutons : - + * /
        if (symbole != null && firstNumber != null) {
            secondNumber = parseFloat(inputTable.value);
            count(button);

        }
        button.classList.add('button_active');//on rend le bouton actif
        operationsButtonActive = true;
        firstNumber = parseFloat(inputTable.value);//on mémorise le 1er nombre
        symbole = button.innerText;//on mémorise le symbole
    }
}

function orangeButtonActiveRemove() {//fonction qui supprime class active chez les boutons oranges 
    let allOrangeButton = document.querySelectorAll('.button_active');//faire une variable qui contient tous les boutons oranges
    for (let i = 0; i < allOrangeButton.length; i++) {
        allOrangeButton[i].classList.remove('button_active');//
    }//faire un cycle qui supprimera 'button_active' à tous les boutons
    operationsButtonActive = false;
}

function darkNumberButtonClick(button) { //⚫️
    let numberButton = button.innerText;
    console.log(numberButton);
    if (numberButton == '.') {//si on appuie sur le bouton avec le point
        if (inputTable.value.indexOf('.') == -1) {
            if (firstNumber != null) {
                if (inputTable.value != '') {
                    inputTable.value = inputTable.value + '.';
                }
                orangeButtonActiveRemove();
            } else {
                // if (inputTable.onkeydown != ) {
                    
                // }
                inputTable.value = inputTable.value + '.';//alors on ajoute le point a la fin du input
            }
        }

    } else {//sinon, si on a appuye sur un bouton avec le chiffre
        if (operationsButtonActive == true) {
            inputTable.value = numberButton;
            orangeButtonActiveRemove();
        } else {
            if (inputTable.value == '0') {//si le contenu du input est egal a 0
                inputTable.value = numberButton;//on ajoute a input le chiffre du bouton qu'on a appuye
            } else if (inputTable.value == '-0') {
                inputTable.value = '-' + numberButton;
            } else {//sinon, si ce qu'il y a dans le input n'est pas egal a 0
                inputTable.value = inputTable.value + numberButton;//on ajoute le chiffre avec le contenu de input
            }
        }
    }
    inputFontSizeChange();
}

function inputFontSizeChange() {//on change la taille du texte dans input
    if (inputTable.value.length < 2) {
        inputTable.style.fontSize = 88 + 'px';
    }
    if (inputTable.value.length > 5) {
        inputTable.style.fontSize = 56 + 'px';
    }
    if (inputTable.value.length > 8) {
        inputTable.style.fontSize = 40 + 'px';
    }
}

function count(button) {
    if (symbole == '+') {
        let maxLength = decimal();
        let result = (firstNumber + secondNumber).toFixed(maxLength);
        let decimalNumber = parseInt(result.toString().split('.')[1]);
        if (decimalNumber == 0) {
            inputTable.value = Math.floor(result);
        } else {
            inputTable.value = result
        }
    } else if (symbole == '-') {
        inputTable.value = firstNumber - secondNumber;
    } else if (symbole == '×') {
        inputTable.value = firstNumber * secondNumber;
    } else if (symbole == '÷') {
        inputTable.value = firstNumber / secondNumber;
    }
    if (button.innerText == '=') {
        symbole = null;
        firstNumber = null;
    } else {
        symbole = button.innerText;
        firstNumber = inputTable.value;
    }
    secondNumber = null;
    inputFontSizeChange()
}

function decimal() {
    let firstNumberString = firstNumber.toString();
    let secondNumberString = secondNumber.toString();
    let firstNumberStringLength;
    let secondNumberStringLength;
    if (firstNumberString.split('.')[1]) {// si le nombre est décimal
        firstNumberStringLength = firstNumberString.split('.')[1].length;//on enregistre la longueur de la partie décimale
    } else {// sinon si le nombre est entier
        firstNumberStringLength = 0;
    }
    if (secondNumberString.split('.')[1]) {// si le nombre est décimal
        secondNumberStringLength = secondNumberString.split('.')[1].length;//on enregistre la longueur de la partie décimale
    } else {// sinon si le nombre est entier
        secondNumberStringLength = 0;
    }
    let maxLength = Math.max(firstNumberStringLength, secondNumberStringLength);
    return maxLength

}


function noSpace () {
    let target = e.target;
    if (e.target != "space") {
        
    }
}