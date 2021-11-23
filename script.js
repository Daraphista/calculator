const screen = document.querySelector(".screen");
const buttons = Array.from(document.querySelectorAll("button"));
const number = document.querySelector(".numbers");

buttons.forEach(button => button.addEventListener('click', () => {
  if(screen.textContent.length < 11) {
    screen.textContent += button.textContent;
    if(screen.textContent.includes("=")) {
      screen.textContent = calculate(screen.textContent);
      console.log(screen.textContent);
    }
  }
}))

function calculate(str) {
  let result;

  str = str.replace(/=/g, "");
  const arr = str.split(/\+|−|=|÷|×/g);

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