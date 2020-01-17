/* ------------------------------ DOM Elements ------------------------------ */
const resultEl = document.getElementById('result'),
      lengthEl = document.getElementById('length'),
      uppercaseEl = document.getElementById('uppercase'),
      lowercaseEl = document.getElementById('lowercase'),
      numbersEl = document.getElementById('numbers'),
      symbolsEl = document.getElementById('symbols'),
      generateEl = document.getElementById('generate'),
      clipboardEl = document.getElementById('clipboard');


const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

generateEl.addEventListener('click', () => {
  const length = +lengthEl.value,
        hasLower = lowercaseEl.checked,
        hasUpper = uppercaseEl.checked,
        hasNumber = numbersEl.checked,
        hasSymbol = symbolsEl.checked;
  resultEl.innerText = generatePassword(hasLower, hasNumber, hasUpper, hasSymbol, length);
});

/* --------------------------- generator functions -------------------------- */

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = '!@#$%&*^(){}=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword(lower, number, upper, symbol, length) {
  let generatedPassword = '';

  const typesCount = lower + upper + number + symbol;

/* ------ filter method lets you to filter false items out of the array ----- */

  const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(
    item => Object.values(item)[0]
  );

  if (typesCount == 0) {
    return '';
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];

      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

/* ----------------------- copy password to clipboard ----------------------- */

clipboardEl.addEventListener('click', () => {
  const textArea = document.createElement('textarea'),
        password = resultEl.innerText;
  if (!password) {
    return;
  }
  textArea.value = password;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  textArea.remove();
  alert('Password copied to clipboard!');
});