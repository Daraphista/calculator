const screen = document.querySelector(".screen");
const buttons = Array.from(document.querySelectorAll("button"));
const number = document.querySelector(".number");
const equals = document.querySelector("#equals");

buttons.forEach(button => button.addEventListener("click", () => {
  screen.textContent += button.textContent;
  screen.textContent = format(screen.textContent);
  equals.addEventListener("click", () => {
    screen.textContent = calculate(screen.textContent);
    console.log(screen.textContent);
  });
}))

function format(str) {
  str = str.replace(/\++/g, "+").replace(/−+/g, "−").replace(/÷+/g, "÷").replace(/×+/g, "×")
  return (str.match(/[0-9]/)) ? str : str.replace(/\+|−|÷|×|=/g, "");
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