'use strict';

const display = document.querySelector('.display');
const clearBtn = document.querySelector('.clear');
const percentBtn = document.getElementById('percent');
const signBtn = document.querySelector('.sign');
const numbersBtn = document.querySelectorAll('.number');
const decimalBtn = document.querySelector('.decimal');
const operatorsBtn = document.querySelectorAll('.math');
const equalBtn = document.querySelector('.equal');
const audio = document.querySelector('.audio');

// Math function for computing
const add = function (a = 0, b) {
  return a + b;
};

const subtract = function (a = 0, b) {
  return a - b;
};

const multiply = function (a = 1, b) {
  return a * b;
};

const divide = function (a, b) {
  if (b === 0) return 'Not a number';
  else if (a === undefined) return b;
  return a / b;
};

const percent = function (a) {
  return a / 100;
};

const noOperator = function (a) {
  return a;
};

// Default Value (fibonacci)
let storeNumA;
let storeNumB = String(0); // display
let operator;
let secondOperator;

// Compute function
const compute = function (e) {
  e.preventDefault();
  console.log(operator);

  if (storeNumB === 'Not a number') {
    display.textContent = 'Not a number';
    audio.currentTime = 0;
    audio.volume = 0.2;
    audio.play(); // Invalid sound
  } else if (operator === undefined || operator === 'none') {
    // no change
    display.textContent = storeNumB.split('').includes('.')
      ? String(0)
      : display.textContent;
    storeNumB = String(0);
  } else {
    let result;
    if (operator === 'add') {
      result = add(+storeNumA || undefined, +storeNumB);
    } else if (operator === 'subtract') {
      result = subtract(+storeNumA || undefined, +storeNumB);
    } else if (operator === 'multiply') {
      result = multiply(+storeNumA || undefined, +storeNumB);
    } else if (operator === 'divide') {
      result = divide(+storeNumA || undefined, +storeNumB);
    }

    storeNumB = String(result);
    display.textContent = `${+storeNumB}`; // num for e+... ?
  }
};

// Check display length
const checkLength = function (display) {
  const length = display.split('').length;
  return length >= 20 ? 'overflow' : 'continue';
};

// Display function
const displayCalc = function (e) {
  e.preventDefault();
  clearBtn.textContent = 'C';
  if (checkLength(display.textContent) === 'overflow') {
    display.textContent = storeNumB; // str
    audio.currentTime = 0;
    audio.volume = 0.2;
    audio.play(); // Invalid sound
  } else {
    const num = e.target.textContent;
    if (storeNumB === String(0)) {
      storeNumB = num;
    } else if (storeNumB === 'Not a number') {
      storeNumB = num;
    } else {
      const newNum = storeNumB + num;
      storeNumB = newNum;
    }
    display.textContent = storeNumB; // str
  }
};

// Decimal rule function
const displayDecimal = function (e) {
  e.preventDefault();
  clearBtn.textContent = 'C';
  const hasDecimal = storeNumB.split('').includes('.');

  if (storeNumB === 'Not a number') {
    storeNumB = 0 + '.';
  } else if (!hasDecimal) {
    const tempt = storeNumB;
    storeNumB = `${tempt}.`;
    display.textContent = storeNumB; // str
  } else {
    display.textContent = storeNumB; // str
    audio.currentTime = 0;
    audio.volume = 0.2;
    audio.play(); // Invalid sound
  }
};

// Sign +/- function
const changeSignNum = function (e) {
  e.preventDefault();
  const tempt = storeNumB;
  if (storeNumB[0] !== '-') {
    storeNumB = `-${tempt}`;
  } else {
    storeNumB = tempt.replace('-', '');
  }
  display.textContent = storeNumB; // str
};

// Convert percentage function
const convertPerToNum = function (e) {
  e.preventDefault();
  const newNum = percent(+storeNumB);
  storeNumB = String(newNum); // num
  display.textContent = storeNumB; // str
};

// Operator function
const assignOperator = function (e) {
  e.preventDefault();
  // if (storeNumA === undefined) {
  // For string several operations
  // Need to compute every time when the operator is clicked.
  operator = e.target.id;
  compute(e); // Nan when click clear (operator = e.target.id => 'none')
  operator;
  // Switch numB to numA
  storeNumA = storeNumB;
  // Reset numB
  storeNumB = String(0);
  // display.textContent = storeNumA;
  // }
};

// Clear function
const clearValue = function (e) {
  e.preventDefault();
  clearBtn.textContent = 'AC';
  storeNumA;
  storeNumB = String(0);
  operator;
  assignOperator(e); // Nan
  display.textContent = String(0); // str
};

// Assign number as string on display
numbersBtn.forEach(el => el.addEventListener('click', displayCalc));
// Can assign decimal only 1 time
decimalBtn.addEventListener('click', displayDecimal);
// Switch + and - as string on display
signBtn.addEventListener('click', changeSignNum);
// Convert % to real number
percentBtn.addEventListener('click', convertPerToNum);
// Assign + - x ÷
operatorsBtn.forEach(el => el.addEventListener('click', assignOperator));
// Clear value
clearBtn.addEventListener('click', clearValue);
// = button (compute expression)
equalBtn.addEventListener('click', compute);

console.log(null == 'null');
