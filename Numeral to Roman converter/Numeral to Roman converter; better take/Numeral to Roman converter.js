const convertButton = document.querySelector("#convert-btn");
const inputNumber = document.querySelector("#number");
const output = document.querySelector("#output");

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


const convertToRoman = (number) => {
  if (number === 0) return "";
  for (const { value, numeral } of romanNumerals) {
    if (number >= value) {
      return numeral + convertToRoman(number - value);
    }
  }
};

const checkInput = () => {
  const inputValue = parseInt(inputNumber.value);

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

convertButton.addEventListener("click", checkInput);

inputNumber.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkInput();
  }
});
