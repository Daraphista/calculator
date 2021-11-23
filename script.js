const screen = document.querySelector(".screen");
const buttons = Array.from(document.querySelectorAll("button"));
const number = document.querySelector(".numbers");

buttons.forEach(button => button.addEventListener('click', () => {
    if(screen.textContent.length < 11) {
      screen.textContent += button.textContent;
      if(screen.textContent.includes("=")) {
        screen.textContent = convert(screen.textContent);
      }
    }
    console.log(screen.textContent);
}))

function convert(str) {
  str = str.replace(/=/g, " ");
  const arr = str.split("+");
  return add(arr[0], arr[1]).toString();
}

function add(a, b) {
  return +a + +b;
}