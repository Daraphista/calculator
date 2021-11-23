const screen = document.querySelector(".screen");
const buttons = Array.from(document.querySelectorAll("button"));
const number = document.querySelector(".numbers");

buttons.forEach(button => button.addEventListener('click', () => {
    if(screen.textContent.length < 11) {
      screen.textContent += button.textContent;
      if(screen.textContent.includes("=")) {
        screen.textContent = calculate(screen.textContent);
      }
    }
}))

function calculate(str) {
  str = str.replace(/=/g, "");
  const arr = str.split(/\D/g);
  console.log(arr);

  if(str.includes("+")) {
    return add(arr[0], arr[1]).toString();
  } else if(str.includes("−")) {
    return subtract(arr[0], arr[1].toString());
  } else if(str.includes("×")) {
    return multiply(arr[0], arr[1].toString());
  } else if(str.includes("÷")) {
    return divide(arr[0], arr[1].toString());
  }
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