const checkButton = document.querySelector("#check-btn")
const inputField = document.querySelector("#text-input")
const result = document.querySelector("#result")

const checkPalindrome = () => {
  const inputValue = inputField.value;
  console.log(inputValue)
  if (inputValue === "") {
    alert("Please input a value")
  }
  const newInput = fixInput(inputValue)
  const reversedInput = newInput.split("").reverse().join("")
  console.log(reversedInput)
  if (newInput === reversedInput) {
    result.innerText = `${inputValue} is a palindrome`
  } else {
    result.innerText = `${inputValue} is not a palindrome`
  }
}



const fixInput = (str) => {
  const regex = /[^a-zA-Z\d\s:]/g;
  let fixedInput =  str.replace(regex, '').toLowerCase().split(" ").join("");
  console.log(fixedInput)
  return fixedInput;
}




checkButton.addEventListener("click", checkPalindrome)
