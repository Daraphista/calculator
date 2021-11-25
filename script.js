const screen = document.querySelector(".screen");
const buttons = Array.from(document.querySelectorAll("button"));
const displayables = Array.from(document.querySelectorAll(".displayable"))
const number = document.querySelector(".number");
const equals = document.querySelector("#equals");
const backspace = document.querySelector("#backspace");
const clear = document.querySelector("#clear");
const negate = document.querySelector("#negate");


displayables.forEach(button => button.addEventListener("click", () => {
  if(screen.textContent === '0') {
    screen.textContent = screen.textContent.substring(1);
  }
  screen.textContent += button.textContent;
  screen.textContent = format(screen.textContent);
}))

equals.addEventListener("click", () => {
  screen.textContent = calculate(screen.textContent);
});

backspace.addEventListener("click", () => {
  screen.textContent = screen.textContent.slice(0, -1);
  if(screen.textContent === '') {
    screen.textContent = '0';
  }
})

clear.addEventListener("click", () => {
  screen.textContent = '0';
})

negate.addEventListener("click", () => {
  screen.textContent = screen.textContent.insert(screen.textContent.search(/\+|−|÷|×/)+1, '-')
})

String.prototype.insert = function(index, string) {
  if (index > 0) {
    return this.substring(0, index) + string + this.substr(index);
  }

  return string + this;
}

function format(str) {
  str = str.replace(/\++/g, "+").replace(/−+/g, "−").replace(/÷+/g, "÷").replace(/×+/g, "×")
  str = (str.match(/[0-9]/)) ? str : str.replace(/\+|−|÷|×/g, "");
  str = (str.match(/[0-9]\D\D/)) ? str.slice(0, -1) : str;
  str = str.replace(/\./g, (val, index, str) => index === str.indexOf('.') ? val : '');
  return str;
}

function calculate(str) {
  let result;

  str = str.replace(/=/g, ""); 
  const arr = str.split(/\+|−|÷|×/g);

  if(str.includes("+")) {
    result = add(arr[0], arr[1]);
    } else if(str.includes("−")) {
    result = subtract(arr[0], arr[1]);
  } else if(str.includes("×")) {
    result = multiply(arr[0], arr[1]);
  } else if(str.includes("÷")) {
    result = divide(arr[0], arr[1]);
  }

  return (Number.isInteger(result)) ? result : result.toFixed(2); 
}

function add(a, b) {
  return +a + +b;
}

function subtract(a, b) {
  return +a - +b;
}

function multiply(a, b) {
  return +a * +b;
}

function divide(a, b) {
  return +a / +b;
}