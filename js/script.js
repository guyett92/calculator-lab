// MODEL //
/*----- constants -----*/
// Store the values of the calculator buttons
const values = [
    7, 8, 9, '/',
    4, 5, 6, '*',
    1, 2, 3, '-',
    0, '.', '+', '='
];

/*----- app's state (variables) -----*/
let calcDisplay = 0; // Current display to be rendered
let storedValues1 = []; // Storage space for the first number
let storedValues2 = []; // Storage space for the second number
let num1 = ''; // Number used to calculate totals
let num2; // Number used to calculate totals
let operator = ''; // Variable to hold the current operator
let oneCount = 0; // FIXME: logs the current length of the localStorage object
let storageId = 0; // Key for the localStorage properties

// CONTROLLER //
init();

/*----- cached element references -----*/
const calcEl = document.getElementById('keypad');
const clearButton = document.querySelector('#logo');
const resultsButton = document.querySelector('.view');
const clearLocal = document.querySelector('.clear');


/*----- event listeners -----*/
calcEl.addEventListener('click', handleClick);
resultsButton.addEventListener('click', viewResults);
clearLocal.addEventListener('click', clearResults);

/*----- functions -----*/
// Showcases the results to console and alerts the user if there are no results to show
// FIXME: Use getters and setters
function viewResults(e) {
    if (Object.keys(localStorage).length === 0) {
        alert('No results!');
    } else {
        for (const property in localStorage) {
            const currentVal = parseFloat(localStorage[property]);
            if (!isNaN(currentVal)) {
                if (currentVal === 1) {
                    if (oneCount > 0) {
                        console.log(`${localStorage[property]}`);
                    } else {
                        oneCount += 1;
                    }
                } else {
                    console.log(`${localStorage[property]}`);
            }
        }
    }
}
}

// Clear localStorage
function clearResults(e) {
    localStorage.clear();
}

// Handles the current click using dataset indexes for each div element
function handleClick(e) {
    const selectedIdx = e.target.dataset.index;
    const selectedValue = values[selectedIdx];
    if (!isNaN(selectedValue) || selectedValue === '.') { // If number or decimal
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

// Does the appropriate calculation after converting the joined numbers to floats
function equals(operator) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
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
    localStorage.setItem(storageId, total); // Saves results to local storage at a given ID
    storageId += 1;
    return total;
}

// Handles the numbers added by adding them to an array
// If the operator variable contains an value, adds the numbers to a second array
function numberLog(number) {
    if (operator === '') {
        storedValues1.push(number);
        num1 = storedValues1.join('');
        calcDisplay = num1;
        render();
    } else {
        storedValues2.push(number);
        num2 = storedValues2.join('');
        calcDisplay = num2;
        render();
    }
}

// Clears all the used variables and resets the display
function clears() {
    storedValues1 = [];
    storedValues2 = [];
    num1 = '';
    num2 = '';
    calcDisplay = 0;
    total = 0;
    operator = '';
    oneCount = 0;
    render();
}

//Renders the current value to the display
function render() {
    $('.display').text(calcDisplay);
}

//FIXME: remove
function init() {
    render();
}