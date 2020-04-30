// MODEL //
/*----- constants -----*/
const values = [
    7, 8, 9, '/',
    4, 5, 6, '*',
    1, 2, 3, '-',
    0, '.', '+', '='
];

/*----- app's state (variables) -----*/
let calcDisplay = 0;
let storedValues = [];
let num1 = '';
let num2;
let operator;

// CONTROLLER //
init();

/*----- cached element references -----*/
const calcEl = document.getElementById('keypad');
const clearButton = document.querySelector('.logo');


/*----- event listeners -----*/
calcEl.addEventListener('click', handleClick);

/*----- functions -----*/
function handleClick(e) {
    const selectedIdx = e.target.dataset.index;
    const selectedValue = values[selectedIdx];
    if (!isNaN(selectedValue)) {
        numberLog(selectedValue);
    } else if (e.target === clearButton) {
        clears();
    } else {
        if (selectedValue === "=") {
            calcDisplay = equals(operator);
            render();
        }
        operator = selectedValue;
    }
}

function equals(operator) {
    switch (operator) {
        case '+':
            total = num1 + num2;
            break;
        case '-':
            total = num1 - num2;
            break;
        case '/':
            total = num1 / num2;
            break;
        case '*':
            total = num1 * num2;
            break;
    }
    return total;
}

function numberLog(number) {
    if (num1 === '') {
        num1 = number;
    } else {
        num2 = number;
    }
    calcDisplay = number;
    render();
}

function clears() {
    num1 = '';
    num2 = '';
    calcDisplay = 0;
    total = 0;
    render();
}

function decimal() {
    return;
}

function render() {
    $('.display').text(calcDisplay);
}

function init() {
    render();
}