const convertButton = document.querySelector("#convert-btn")
const inputNumber = document.querySelector("#number")
const output = document.querySelector("#output")

// function which calls another function named numberToArray
const convertToRoman = (number) => {
  numberToArray(number)
}

/* Below function makes sure the number input satisfies certain constraints such as being less than 3999, 
after which it runs a function to convert the number if it is of appropriate format */
const checkInput = () => {
  const inputValue = inputNumber.value;
  if (inputValue === "" || isNaN(inputValue)) {
    output.innerText = "Please enter a valid number"
  } else if (inputValue <= 0) {
    output.innerText = "Please enter a number greater than or equal to 1"
  } else if (inputValue >= 4000) {
    output.innerText = "Please enter a number less than or equal to 3999"
  } else {
    output.innerText = "";
    convertToRoman(inputValue)
  }
}

// The following function, numberToArray, firstly splits the number input into an array of the number's digits.
const numberToArray = (number) => {
  const numArray = String(number).split("")
  
  // It then defines the following 4 variables
  let unitsPlace, tensPlace, hundredsPlace, thousandsPlace;
  
  /* It then assigns each of the 4 variables above the digit corresponding to its place i.e 
  if the number is 436, it assigns unitsPlace to 6, tensPlace to 3, hundredsPlace to 4 and thousandsPlace to null*/
  if ((numArray.length - 1) >= 0) {
    unitsPlace = numArray[numArray.length - 1]
  } else {
    unitsPlace = null
  }
  if ((numArray.length - 2) >= 0) {
    tensPlace = numArray[numArray.length - 2]
  } else {
    tensPlace = null
  }
  if ((numArray.length - 3) >= 0) {
    hundredsPlace = numArray[numArray.length - 3]
  } else {
    hundredsPlace = null
  }
  if ((numArray.length - 4) >= 0) {
    thousandsPlace = numArray[numArray.length - 4]
  } else {
    thousandsPlace = null
  }

  /* The function then uses many if-else statements and number comparasions
  to basically break down the number into thousands, hundreds, tens and units, assigns
  them a numeral and glues them together */
  if (thousandsPlace <= 3) {
    output.innerText += "M".repeat(thousandsPlace)
  }
  if (hundredsPlace <= 3) {
    output.innerText += "C".repeat(hundredsPlace)
  } else if (hundredsPlace == 4) {
    output.innerText += "CD"
  } else if (hundredsPlace == 9) {
    output.innerText += "CM"
  } else {
    output.innerText += "D" + "C".repeat(hundredsPlace - 5)
  }
  if (tensPlace <= 3) {
    output.innerText += "X".repeat(tensPlace)
  } else if (tensPlace == 4) {
    output.innerText += "XL"
  } else if (tensPlace == 9) {
    output.innerText += "XC"
  } else {
    output.innerText += "L" + "X".repeat(tensPlace - 5)
  }
  if (unitsPlace <= 3) {
    output.innerText += "I".repeat(unitsPlace)
  } else if (unitsPlace == 4) {
    output.innerText += "IV"
  } else if (unitsPlace == 9) {
    output.innerText += "IX"
  } else {
    output.innerText += "V" + "I".repeat(unitsPlace - 5)
  }
}

// Event listener for the convert button
convertButton.addEventListener("click", checkInput)

inputNumber.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkInput();
  }
});
