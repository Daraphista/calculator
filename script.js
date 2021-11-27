const body = document.querySelector("body");
const container = document.querySelector(".container");
const theme = document.querySelector("#theme");
const screen = document.querySelector(".screen");
const buttons = Array.from(document.querySelectorAll("button"));
const button = document.querySelector("button");
const displayables = Array.from(document.querySelectorAll(".displayable"));
const numbers = Array.from(document.querySelectorAll(".number"));
const arithmetics = Array.from(document.querySelectorAll(".arithmetic"));
const equals = document.querySelector("#equals");
const backspace = document.querySelector("#backspace");
const clear = document.querySelector("#clear");
const negate = document.querySelector("#negate");
const percent = document.querySelector("#percent");

arithmetics.forEach(button => button.addEventListener("click", () => {
  screen.textContent = calculate(screen.textContent);
}))

displayables.forEach(button => button.addEventListener("click", () => {
  
  if(screen.textContent === '0') {screen.textContent = screen.textContent.substring(1)}
  if(screen.textContent.length < 23) {screen.textContent += button.textContent}
  if(screen.textContent === '') {screen.textContent += '0'}
  
  screen.textContent = format(screen.textContent);
}))

window.addEventListener("keydown", function(e) {
  console.log(e.key);
  if(e.key == "Backspace") {removeChar()};
  const keycap = document.querySelector(`button[data-key="${e.key}"]`)
  screen.textContent += keycap.textContent;
});


buttons.forEach(button => button.addEventListener("click", () => {
  if(screen.textContent.length > 0 && screen.textContent.length <= 11) {screen.style.fontSize = "60px"} else
  if(screen.textContent.length >= 11 && screen.textContent.length <= 17) {screen.style.fontSize = "40px"} else
  if(screen.textContent.length > 16 && screen.textContent.length < 24) {screen.style.fontSize = "30px"}
}))

equals.addEventListener("click", () => {
  screen.textContent = calculate(screen.textContent);
});

backspace.addEventListener("click", () => {
  removeChar();
  if(screen.textContent === '') {
    screen.textContent = '0';
  }
})

clear.addEventListener("click", () => {
  screen.textContent = '0';
  screen.style.fontSize = "60px";
})


negate.addEventListener("click", function() {
  let num;
  //if there is an arithmetic operator, multiply number by -1 and return the array
  if(screen.textContent.match(/\+|−|÷|×/)) {
    num = screen.textContent.slice(screen.textContent.search(/\+|−|÷|×/)+1);
    screen.textContent = screen.textContent.slice(0, screen.textContent.search(/\+|−|÷|×/)+1)
    num = +num * -1;
    screen.textContent += num.toString();
  } else {
    //else multiply the first number by -1 and return the array
    num = screen.textContent
    num = +num * -1;
    screen.textContent = num.toString();
  }
  console.log(num);
})

percent.addEventListener("click", () => {
  let num;
  //if there is an arithmetic operator, divide number and return the array
  if(screen.textContent.match(/\+|−|÷|×/)) {
    num = screen.textContent.slice(screen.textContent.search(/\+|−|÷|×/)+1);
    screen.textContent = screen.textContent.slice(0, screen.textContent.search(/\+|−|÷|×/)+1)
    num = +num / 100;
    screen.textContent += num.toString();
  } else {
    //else divide the first number and return the array
    num = screen.textContent
    num = +num / 100;
    screen.textContent = num.toString();
  }
  console.log(num);
})

theme.addEventListener("change", () => {
  body.classList.toggle("dark-mode");
  container.classList.toggle("dark-mode");
  buttons.forEach(button => button.classList.toggle("dark-mode"));
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
  return (+a === 0 || +b === 0) ? alert("I see what you're trying to do ;)") : +a / +b ;
}

function removeChar() {screen.textContent = screen.textContent.slice(0, -1)};
