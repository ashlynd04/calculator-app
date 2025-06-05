const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let current = "0";
let previous = null;
let operator = null;
let resetNext = false;

function updateDisplay() {
  display.textContent = current;
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    const value = button.dataset.value;

    switch (action) {
      case "input":
        if (current === "0" || resetNext) {
          current = value;
          resetNext = false;
        } else {
          if (!(value === "." && current.includes("."))) {
            current += value;
          }
        }
        break;

      case "operator":
        if (operator && !resetNext) {
          calculate();
        }
        previous = current;
        operator = value;
        resetNext = true;
        break;

      case "calculate":
        if (operator) {
          calculate();
          operator = null;
        }
        break;

      case "clear":
        current = "0";
        previous = null;
        operator = null;
        break;

      case "negate":
        current = (parseFloat(current) * -1).toString();
        break;

      case "percent":
        current = (parseFloat(current) / 100).toString();
        break;
    }

    updateDisplay();
  });
});

function calculate() {
  if (previous !== null && operator) {
    const a = parseFloat(previous);
    const b = parseFloat(current);
    let result = 0;

    switch (operator) {
      case "+": result = a + b; break;
      case "-": result = a - b; break;
      case "*": result = a * b; break;
      case "/": result = b !== 0 ? a / b : "Error"; break;
    }

    current = result.toString();
    previous = null;
    resetNext = true;
  }
}

updateDisplay();
