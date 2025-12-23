const checkButton = document.querySelector("#check-btn")
const inputField = document.querySelector("#text-input")
const result = document.querySelector("#result")

// Checks the input field is non-empty
const checkPalindrome = () => {
  const inputValue = inputField.value;
  if (inputValue === "") {
    alert("Please input a value")
  }
  const newInput = fixInput(inputValue)
  // Reverses the input and checks whether it is equal to the original string
  const reversedInput = newInput.split("").reverse().join("")
  if (newInput === reversedInput) {
    result.innerText = `${inputValue} is a palindrome`
  } else {
    result.innerText = `${inputValue} is not a palindrome`
  }
}


// Regex making sure remove punctiation, spaces and puts all in lower case.
const fixInput = (str) => {
  const regex = /[^a-zA-Z\d\s:]/g;
  let fixedInput =  str.replace(regex, '').toLowerCase().split(" ").join("");
  return fixedInput;
}



// Event listener for the check button
checkButton.addEventListener("click", checkPalindrome)
