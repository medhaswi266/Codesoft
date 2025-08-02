const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let lastInput = '';
let resultDisplayed = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.getAttribute('data-action');

    if (action === 'clear') {
      currentInput = '';
      display.value = '';
    } else if (action === 'delete') {
      currentInput = currentInput.slice(0, -1);
      display.value = currentInput;
    } else if (action === '=') {
      try {
        // Replace multiplication and division symbols with JS operators
        let expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
        // Evaluate expression safely
        let evalResult = eval(expression);
        display.value = evalResult;
        currentInput = evalResult.toString();
        resultDisplayed = true;
      } catch {
        display.value = 'Error';
        currentInput = '';
      }
    } else {
      if (resultDisplayed && !isOperator(action)) {
        currentInput = '';  // start fresh if user presses number after result
        resultDisplayed = false;
      }
      // Prevent two operators in a row
      if (isOperator(action)) {
        if (currentInput === '' || isOperator(currentInput.slice(-1))) {
          return; // ignore invalid input
        }
      }
      currentInput += action;
      display.value = currentInput;
    }
  });
});

function isOperator(char) {
  return ['+', '-', '*', '/', '×', '÷'].includes(char);
}
