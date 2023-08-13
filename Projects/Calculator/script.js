let operationPerformed = false;
      
function appendChar(char) {
  const display = document.forms[0].display;
  const currentValue = display.value;

  // Check if an operation has been performed
  if (operationPerformed) {
    display.value = char;
    operationPerformed = false;
  } else {
    display.value += char;
  }
}

function clearDisplay() {
  document.forms[0].display.value = '';
}

function deleteLastCharacter() {
  const display = document.forms[0].display;
  display.value = display.value.slice(0, -1);
}

function evaluateExpression() {
  const display = document.forms[0].display;
  try {
    display.value = eval(display.value).toFixed(1);
    display.value;
    operationPerformed = true;
  } catch (error) {
    display.value = 'Error';
    // Automatically clear the "Error" after 2 seconds (2000 milliseconds)
    setTimeout(() => {
      display.value = '';
    }, 1000);
  }
}