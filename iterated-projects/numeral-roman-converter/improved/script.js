const convertButton = document.querySelector("#convert-btn");
const inputNumber = document.querySelector("#number");
const output = document.querySelector("#output");

// Defined a "legend" of sorts
const romanNumerals = [
  { value: 1000, numeral: "M" },
  { value: 900, numeral: "CM" },
  { value: 500, numeral: "D" },
  { value: 400, numeral: "CD" },
  { value: 100, numeral: "C" },
  { value: 90, numeral: "XC" },
  { value: 50, numeral: "L" },
  { value: 40, numeral: "XL" },
  { value: 10, numeral: "X" },
  { value: 9, numeral: "IX" },
  { value: 5, numeral: "V" },
  { value: 4, numeral: "IV" },
  { value: 1, numeral: "I" }
];

/* Recursive function that takes the input number and assigns it a numeral from the
"legend" above then runs the function again on the remainder between the number and the value */
const convertToRoman = (number) => {
  if (number === 0) return "";
  for (const { value, numeral } of romanNumerals) {
    if (number >= value) {
      return numeral + convertToRoman(number - value);
    }
  }
};

/* Checks if the input satisfies certain constraints, such as being less than 3999.
If those constraints are all satisfied, the else block runs the convertToRoman function */
const checkInput = () => {
  const inputValue = inputNumber.value;

  if (isNaN(inputValue)) {
    output.innerText = "Please enter a valid number";
  } else if (inputValue < 1) {
    output.innerText = "Please enter a number greater than or equal to 1";
  } else if (inputValue > 3999) {
    output.innerText = "Please enter a number less than or equal to 3999";
  } else {
    output.innerText = convertToRoman(inputValue);
  }
};

// Adds an event listener to the button that runs the event of checking the input
convertButton.addEventListener("click", checkInput);

inputNumber.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkInput();
  }
});
