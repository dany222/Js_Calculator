let outputArea = document.getElementById("output");

let equation = "";
let buttons = document.querySelectorAll("input[type=button]");

for (let i = 0; i < buttons.length; i++) {
  buttons.item(i).addEventListener("click", function () {
    equation += this.value;
    outputArea.innerHTML = equation;
  });
}

let submit = document.getElementById("submit");
let result = 0;
submit.addEventListener("click", function () {
  if (!newEquation()) {
    switch (equation.charAt(0)) {
      case "+":
        result += parseInt(equation.substr(1));
        break;
      case "-":
        result -= parseInt(equation.substr(1));
        break;
      case "*":
        result *= parseInt(equation.substr(1));
        break;
      case "/":
        result = result / parseInt(equation.substr(1));
        break;
    }
    equation = equation.substr(1);
    equation = equation.substr(parseInt(equation).toString().length);
    let numbersAndOperators = separateNumbersAndOperators();
    if (calculateResult(numbersAndOperators.numbers, numbersAndOperators.operators) !== undefined) {
      result += calculateResult(
        numbersAndOperators.numbers,
        numbersAndOperators.operators
      );
    }
  } else {
    result = 0;
    let numbersAndOperators = separateNumbersAndOperators();
    if (calculateResult(numbersAndOperators.numbers, numbersAndOperators.operators) !== undefined) {
      result += calculateResult(
        numbersAndOperators.numbers,
        numbersAndOperators.operators
      );
    }
  }
  outputArea.innerHTML += "=<br>" + result;
});

function separateNumbersAndOperators(startingPoint) {
  let numbersInEquation = [];
  let operatorsInEquation = [];
  equation = equation.substr(startingPoint);
  while (equation.length > 0) {
    numbersInEquation.push(parseInt(equation));
    let lengthOfLastNumber = numbersInEquation[
      numbersInEquation.length - 1
    ].toString().length;
    if (equation.charAt(lengthOfLastNumber) != "") {
      operatorsInEquation.push(equation.charAt(lengthOfLastNumber));
    }
    equation = equation.substr(
      lengthOfLastNumber + 1,
      equation.length - (lengthOfLastNumber + 1)
    );
  }

  return {
    numbers: numbersInEquation,
    operators: operatorsInEquation
  };
}

function calculateResult(numbers, operators) {
  let evaluateEquation = true;
  while (evaluateEquation) {
    let multiplyIndex = operators.indexOf("*");
    let divideIndex = operators.indexOf("/");
    //Operátor precedencia
    if (multiplyIndex !== -1) {
      numbers[multiplyIndex] =
        numbers[multiplyIndex] * numbers[multiplyIndex + 1];
      numbers.splice(multiplyIndex + 1, 1);
      operators.splice(multiplyIndex, 1);
    } else if (divideIndex !== -1) {
      numbers[divideIndex] = numbers[divideIndex] / numbers[divideIndex + 1];
      numbers.splice(divideIndex + 1, 1);
      operators.splice(divideIndex, 1);
    } else {
      evaluateEquation = false;
    }
  }

  while (numbers.length > 1) {
    switch (operators[0]) {
      case "+":
        numbers[0] = numbers[0] + numbers[1];
        break;
      case "-":
        numbers[0] = numbers[0] - numbers[1];
        break;
    }
    numbers.splice(1, 1);
    operators.splice(0, 1);
  }

  return numbers[0];
}

/**
 *  Mi kell még?

 *
 *  -full delete, backspace
 *  -gyök, négyzetelés, x^y
 *
 *  -Különböző múdok
 */
function newEquation() {
  if (["+", "-", "/", "*"].includes(equation.charAt(0))) {
    return false;
  }
  return true;
}