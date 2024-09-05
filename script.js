class Calculator {
  constructor() {
    this.isOperatorClicked = false;
    this.isNumberClicked = false;
    this.isEqualClicked = false;
  }

  calculate(firstNum, secondNum, operation) {
    let result;
    switch (operation) {
      case "+":
        result = firstNum + secondNum;
        break;

      case "-":
        result = firstNum - secondNum;
        break;

      case "x":
        result = firstNum * secondNum;
        break;

      case "÷":
        result = firstNum / secondNum;
        break;
    }
    if (String(result).includes(".")) {
      result =
        String(result).split(".")[1].length > 2 ? result.toFixed(2) : result;
    }
    return result;
  }

  appendNumber(number) {
    if (this.isEqualClicked) {
      displayResult.textContent = "";
      secondOperand.textContent = number;
      this.isEqualClicked = false;
      return;
    }

    if (
      (secondOperand.textContent == 0 &&
        secondOperand.textContent.length === 1) ||
      this.isOperatorClicked
    ) {
      secondOperand.textContent = number;
    } else {
      secondOperand.textContent += number;
    }
    this.isNumberClicked = true;
    this.isOperatorClicked = false;
  }

  handleOperator(operator) {
    if (this.isEqualClicked) {
      displayResult.textContent = "";
      firstOperand.textContent = secondOperand.textContent;
      operation.textContent = operator;
      this.isOperatorClicked = true;
      this.isNumberClicked = false;
      this.isEqualClicked = false;
      return;
    }
    if (operation.textContent == "") {
      firstOperand.textContent = secondOperand.textContent;
      operation.textContent = operator;
    } else if (
      firstOperand.textContent !== secondOperand.textContent ||
      this.isNumberClicked
    ) {
      const result = this.calculate(
        Number(firstOperand.textContent),
        Number(secondOperand.textContent),
        operation.textContent
      );
      firstOperand.textContent = result;
      secondOperand.textContent = result;
      operation.textContent = operator;
    } else {
      operation.textContent = operator;
    }
    this.isOperatorClicked = true;
    this.isNumberClicked = false;
  }

  handleEqualBtn() {
    if (this.isOperatorClicked || this.isNumberClicked) {
      const result = this.calculate(
        Number(firstOperand.textContent),
        Number(secondOperand.textContent),
        operation.textContent
      );
      displayResult.textContent = `${firstOperand.textContent} ${operation.textContent} ${secondOperand.textContent} =`;
      firstOperand.textContent = "";
      operation.textContent = "";
      secondOperand.textContent = result;
      this.isEqualClicked = true;
      this.isOperatorClicked = false;
      this.isNumberClicked = false;
    } else if (this.isEqualClicked) {
      const parts = displayResult.textContent
        .match(/\d+|\D/g)
        .filter((currentString) => {
          return currentString !== " ";
        });
      const result = this.calculate(
        Number(secondOperand.textContent),
        Number(parts[2]),
        parts[1]
      );
      displayResult.textContent = `${secondOperand.textContent} ${parts[1]} ${parts[2]} =`;
      secondOperand.textContent = result;
    }
  }

  negate() {
    secondOperand.textContent = -Number(secondOperand.textContent);
  }

  addDecimalPoint() {
    console.log("check");
    if (!secondOperand.textContent.includes(".")) {
      secondOperand.textContent += ".";
    }
  }

  clear() {
    firstOperand.textContent = "";
    operation.textContent = "";
    displayResult.textContent = "";
    secondOperand.textContent = 0;
  }

  clearEntry() {
    if (this.isEqualClicked) {
      this.clear();
    } else {
      secondOperand.textContent = 0;
    }
  }

  delete() {
    if (this.isEqualClicked) {
      displayResult.textContent = "";
    } else {
      secondOperand.textContent =
        secondOperand.textContent.length === 1
          ? "0"
          : secondOperand.textContent.slice(0, -1);
    }
  }
}

// display elements
const firstOperand = document.querySelector("[data-first-operand]");
const secondOperand = document.querySelector("[data-current-operand]");
const operation = document.querySelector("[data-operation]");
const displayResult = document.querySelector("[data-display]");

const calculator = new Calculator();

// elment Arrays
const numbers = Array.from(document.querySelectorAll("[data-number]"));
const operators = Array.from(document.querySelectorAll("[data-operator]"));

// event listeners
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    calculator.appendNumber(number.textContent);
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    calculator.handleOperator(operator.textContent);
  });
});

const calculateBtn = document.querySelector("[data-calculate]");

calculateBtn.addEventListener("click", () => {
  calculator.handleEqualBtn();
});

const negateBtn = document.querySelector("[data-negate]");
negateBtn.addEventListener("click", () => {
  calculator.negate();
});

const decimalBtn = document.querySelector("[data-decimal]");
decimalBtn.addEventListener("click", () => {
  calculator.addDecimalPoint();
});

const clearBtn = document.querySelector("[data-clear]");
clearBtn.addEventListener("click", () => {
  calculator.clear();
});

const clearEntryBtn = document.querySelector("[data-clear-entry]");
clearEntryBtn.addEventListener("click", () => {
  calculator.clearEntry();
});

const deleteBtn = document.querySelector("[data-delete]");
deleteBtn.addEventListener("click", () => {
  calculator.delete();
});
