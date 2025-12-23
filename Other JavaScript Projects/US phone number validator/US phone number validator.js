const checkButton = document.querySelector("#check-btn");
const inputPhoneNumber = document.querySelector("#user-input");
const resultField = document.querySelector("#results-div");
const clearButton = document.querySelector("#clear-btn");




const checkInput = () => {
  const phoneNumber = inputPhoneNumber.value
  if (phoneNumber === "") {
    // An alert pop-up if the input field is empty
    alert("Please provide a phone number");
  } else {
      // A rather lengthy regex checking the many forms of US phone numbers
      const phoneRegex = /^(1)?(-|\s)?(([0-9][0-9][0-9])|(\([0-9][0-9][0-9]\)))(-|\s)?([0-9][0-9][0-9])(-|\s)?([0-9][0-9][0-9][0-9])$/;
      // If the input matches the regex, it calls validAppend on it. Else, it calls invalidAppen
  return phoneNumber.match(phoneRegex) === null ? invalidAppend(phoneNumber) : validAppend(phoneNumber)
  }
}

// An HTML element is created whose textContent is the one below, followed by the input number. 
const validAppend = (number) => {
  const resultChild = document.createElement("div")
  resultChild.className = "result-child"
  resultChild.textContent = `Valid US number: ${number}`
  resultField.appendChild(resultChild)
}

// An HTML element is created whose textContent is the one below, followed by the input number. 
const invalidAppend = (number) => {
  const resultChild = document.createElement("div")
  resultChild.className = "result-child"
  resultChild.textContent = `Invalid US number: ${number}`
  resultField.appendChild(resultChild)
}


// Clears the input field and gets rid of the HTML elements created
const clearResults = () => {
  resultField.innerHTML = "";
  inputPhoneNumber.value = "";
}

/* Event listener for the check button, which checks the input
by calling the checkInput function */
checkButton.addEventListener("click", checkInput);

inputPhoneNumber.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkInput();
  }
});

// Event listener for the clear button
clearButton.addEventListener("click", clearResults);
