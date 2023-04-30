'use strict';

const display = document.querySelector('.display');
const clearBtn = document.querySelector('.clear');
const percentBtn = document.getElementById('percent');
const signBtn = document.querySelector('.sign');
const numbersBtn = document.querySelectorAll('.number');
const decimalBtn = document.querySelector('.decimal');
const operatorsBtn = document.querySelectorAll('.math');
const equalBtn = document.querySelector('.equal');
const deleteBtn = document.querySelector('.delete');
const audio = document.querySelector('.audio');
const modeDayNight = document.getElementById('mode');
const keyPress = document.querySelectorAll('button');

const add = function (a = 0, b) {
  return a + b;
};

const subtract = function (a = 0, b) {
  return a - b;
};

const multiply = function (a, b) {
  if (a === undefined) {
    a = 0;
  }
  return a * b;
};

const divide = function (a, b) {
  console.log(a);
  console.log(b);
  if (a === undefined) {
    a = 0;
  } else if (b === 0) {
    return 'Not a number';
  } else {
    return a / b;
  }
};

const percent = function (a) {
  return a / 100;
};

const noOperator = function (a) {
  return a;
};

// fibonacci technique!
// const tempt = b;
// a = b;
// b = a + tempt;

// Default Value
let storeNumA;
let storeNumB = String(0); // first value

const roundNumber = function (numB) {
  console.log(numB);
  if (numB.length > 10) {
    // e = 10
    const pow = 15;
    // parse string and return first number
    const round = parseFloat(Math.round(+numB + 'e' + pow) + 'e-' + pow); // num
    return round.toString().substring(0, 10);
  } else {
    return numB;
  }
};

// Compute by calling math function at the above
const compute = function (e) {
  e.preventDefault();

  if (storeNumB === 'Not a number') {
    display.textContent = 'Not a number';
    audio.currentTime = 0;
    audio.volume = 0.2;
    audio.play(); // Invalid sound
  } else if (operator === undefined || operator === 'none') {
    // no operator - no compute - no change - 0. value
    display.textContent = storeNumB === '0.' ? String(0) : display.textContent;
    storeNumA = display.textContent;
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
      console.log(result);
    }

    // Check if it is a 'Not a number' string
    storeNumB = typeof result === 'string' ? result : String(result);

    // When user click operator button or repeatedly click equal button without define second operands, we need to store first computed number in storeNumA first before .
    // 1 Store value
    storeNumA = storeNumB;
    // 2 Round number
    display.textContent = roundNumber(storeNumA); // str
    // 3 Reset value
    storeNumB = String(0);
  }
};

const checkStrLength = function (numOnDisplay) {
  const length = numOnDisplay.split('').length;
  return length >= 10 ? 'overflow' : 'continue';
};

const updateDisplay = function (e) {
  e.preventDefault();
  clearBtn.textContent = 'C';
  if (checkStrLength(storeNumB) === 'overflow') {
    display.textContent = storeNumB; // str
    audio.currentTime = 0;
    audio.volume = 0.2;
    audio.play(); // Invalid sound
  } else {
    const num = e.target.textContent;
    if (storeNumB === String(0) || storeNumB === 'Not a number') {
      storeNumB = num;
    } else {
      const newNum = storeNumB + num;
      storeNumB = newNum;
    }
    display.textContent = storeNumB; // str
  }
};

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

const changeSignNum = function (e) {
  e.preventDefault();
  const tempt = display.textContent;
  if (tempt === String(0)) {
    storeNumB = tempt;
  } else if (tempt[0] !== '-') {
    storeNumB = `-${tempt}`;
  } else {
    storeNumB = tempt.replace('-', '');
  }
  display.textContent = storeNumB; // str
};

const convertPerToNum = function (e) {
  e.preventDefault();
  const newNum = percent(+storeNumB);
  storeNumB = String(newNum);
  display.textContent = storeNumB; // str
};

// Need to store first operator before press numB
let operator;
let storeOperator;

// Store firstOperand and secondOperand
let operands = [0, 0]; // for click equal many time

const assignOperator = function (e) {
  e.preventDefault();
  if (storeOperator === 'none' && e.target.id === 'none') {
    if (display.textContent === 'Not a number') {
      storeNumB = 'Not a number';
    } else {
      // Use the same operator if user doesn't click new operator and repeatedly click equal button.
      const tempt = operator;
      operator = tempt;
      storeOperator = e.target.id;
      storeNumB = operands[1];
    }
    compute(e);
  } else {
    operator = storeOperator; // Use previous operator
    storeOperator = e.target.id; // Store new one
    operands[0] = storeNumA;
    operands[1] = storeNumB;
    compute(e);
  }
};

const undoNum = function (e) {
  e.preventDefault();
  if (
    storeNumB.length === 1 ||
    (storeNumB.length === 2 && storeNumB[0] === '-')
  ) {
    storeNumB = String(0);
    display.textContent = storeNumB;
  } else {
    const newStrNum = storeNumB
      .split('')
      .slice(0, storeNumB.length - 1)
      .join('');
    if (newStrNum === 0) {
      storeNumB = String(0);
      display.textContent = storeNumB;
    } else {
      storeNumB = newStrNum;
      display.textContent = storeNumB;
    }
  }
};

const clearValue = function (e) {
  e.preventDefault();
  clearBtn.textContent = 'AC';
  storeNumA = undefined;
  storeNumB = String(0);
  operator;
  storeOperator;
  operands = [0, 0];
  display.textContent = String(0);
};

numbersBtn.forEach(el => el.addEventListener('click', updateDisplay)); // Assign number as string on display
decimalBtn.addEventListener('click', displayDecimal); // Can assign decimal only 1 time
signBtn.addEventListener('click', changeSignNum); // Switch + and - as string on display
percentBtn.addEventListener('click', convertPerToNum);
operatorsBtn.forEach(el => el.addEventListener('click', assignOperator)); // Assign + - x ÷
clearBtn.addEventListener('click', clearValue);
deleteBtn.addEventListener('click', undoNum); // Undo number on display
equalBtn.addEventListener('click', assignOperator); // compute expression

// Background mode
modeDayNight.addEventListener('mousedown', () => {
  document.body.classList.toggle('night');
  modeDayNight.classList.toggle('white-moon');
});

// Add key press
window.addEventListener('keydown', e => {
  const key = e.key;

  numbersBtn.forEach(el => {
    if (el.textContent === key) {
      el.click();
      el.classList.add('key-press-1');
    }
  });

  operatorsBtn.forEach(el => {
    if (key === '/' && el.textContent === '÷') {
      el.click();
      el.classList.add('key-press-2');
    } else if (key === '*' && el.textContent === 'x') {
      el.click();
      el.classList.add('key-press-2');
    } else if (el.textContent === key) {
      el.click();
      el.classList.add('key-press-2');
    }
  });

  if (key === '.') {
    decimalBtn.click();
    decimalBtn.classList.add('key-press-1');
  } else if (key === 'n' || key === 'p') {
    signBtn.click();
    signBtn.classList.add('key-press-3');
  } else if (key === '%') {
    percentBtn.click();
    percentBtn.classList.add('key-press-3');
  } else if (key === 'c') {
    clearBtn.click();
    clearBtn.classList.add('key-press-3');
  } else if (key === 'Enter') {
    equalBtn.click();
    equalBtn.classList.add('key-press-2');
  } else if (key === 'Backspace') {
    deleteBtn.click();
    deleteBtn.classList.add('key-press-3');
  }
});

const removeTransition = function (e) {
  if (e.propertyName !== 'transform') return;
  for (let i = 1; i <= 3; i++) {
    this.classList.remove(`key-press-${i}`);
  }
};

keyPress.forEach(key =>
  key.addEventListener('transitionend', removeTransition)
);
