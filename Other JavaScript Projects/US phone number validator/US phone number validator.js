const checkButton = document.querySelector("#check-btn");
const inputPhoneNumber = document.querySelector("#user-input");
const resultField = document.querySelector("#results-div");
const clearButton = document.querySelector("#clear-btn");




const checkInput = () => {
  const phoneNumber = inputPhoneNumber.value
  if (phoneNumber === "") {
    alert("Please provide a phone number");
  } else {
      const phoneRegex = /^(1)?(-|\s)?(([0-9][0-9][0-9])|(\([0-9][0-9][0-9]\)))(-|\s)?([0-9][0-9][0-9])(-|\s)?([0-9][0-9][0-9][0-9])$/;
  return phoneNumber.match(phoneRegex) === null ? invalidAppend(phoneNumber) : validAppend(phoneNumber)
  }
}

const validAppend = (number) => {
  const resultChild = document.createElement("div")
  resultChild.className = "result-child"
  resultChild.textContent = `Valid US number: ${number}`
  resultField.appendChild(resultChild)
}


const invalidAppend = (number) => {
  const resultChild = document.createElement("div")
  resultChild.className = "result-child"
  resultChild.textContent = `Invalid US number: ${number}`
  resultField.appendChild(resultChild)
}



const clearResults = () => {
  resultField.innerHTML = "";
  inputPhoneNumber.value = "";
}


checkButton.addEventListener("click", checkInput);

inputPhoneNumber.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkInput();
  }
});

clearButton.addEventListener("click", clearResults);
