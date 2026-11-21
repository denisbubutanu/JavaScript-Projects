let itemPrice = document.querySelector("#price span");
let cashRegister = document.querySelector("#register");
const purchaseBtn = document.querySelector("#purchase-btn");
let price = 19.5;
itemPrice.textContent = price;
let changeDueSection = document.querySelector("#change-due");


/* The amount of money of each denomination in the register. For instance, there are enough dimes in the cash to make up $3.1 */
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];


/* I added a "legend" of sorts that actually tells the code how much each denomination is worth. I probably would have chosen to add this directly into the the cid array above had that array not been constrained by certain tests I needed my code to pass that necessitated that cid array be untouched other than the values themselves */
let monetaryValues = [
  ['ONE HUNDRED', 100],
  ['TWENTY', 20],
  ['TEN', 10],
  ['FIVE', 5],
  ['ONE', 1],
  ['QUARTER', 0.25],
  ['DIME', 0.10],
  ['NICKEL', 0.05],
  ['PENNY', 0.01]
];

/* Made a shallow copy of the cid array that I then go on and use for most of the code to allow the code to be reused without reloading the page */
let workingCid = [...cid];

/* Function used to update the drawer with the required denomination amounts */
const updateDrawer = () => {
  for (let [noteName, amount] of workingCid) {
  let newDiv = document.createElement("div");
  newDiv.className = "cash-values"
  newDiv.textContent = `${noteName}: $${amount}`;
  cashRegister.appendChild(newDiv);
  }
}

/* Function to clear the drawer content that gets called when the user wishes to buy another item after buying one already */
const clearDrawer = () => {
  cashRegister.textContent = "";
  let titleDiv = document.createElement("h3");
  titleDiv.textContent = "Change in Drawer";
  titleDiv.id = "cid-title-div";
  cashRegister.appendChild(titleDiv);
  }

/* Second main function of the project. The purpose of this function serves mostly to check if there exist denominations to split the change and to move on to the next available denomination if not. If there is no more of a certain denomination, then we eliminate that entry in the monetaryValues array. */
const registerChangeCalculation = (bigArray, denomination, value) => {
  const target = bigArray.find(array => array[0] === denomination);
    if (target && target[1] > 0) {
      target[1] = parseFloat((target[1] - value).toFixed(2));
      if (target[1] <= 0) {
        target[1] = 0;
        const targetArray = monetaryValues.find(array => array[0] === denomination);
        let index = monetaryValues.indexOf(targetArray);
        if (index !== -1) monetaryValues.splice(index, 1);
        }
      }
    }

/* if-else statement that deals with the easy cases where the amount of cash given by the customer is less than or equal to the value of the item */
const cashPriceCompare = () => {
  let cash = parseFloat(document.querySelector("#cash").value);
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cash === price) {
    changeDueSection.textContent = "No change due - customer paid with exact cash";
  } else {
    calculateChange(cash, price);
  };
};

/* Defines an empty denomination tracker */
let denominationTracker = {};

/* Main function of the project. I have chosen to tackle this problem recursively. Broadly, this function calculates the difference between the cash presented by the user and the price of the item and then takes the highest deniomination that is still lower than this difference. It then calculates the difference between that and the next highest denomination recursively, until there value is 0 and we have our answer. It then makes sure to cut the entry of the denomination that has reached 0, update the drawer, etc.  */
const calculateChange = (num1, num2) => {
  if (!changeDueSection.textContent.includes("Status: OPEN")) {
    changeDueSection.textContent = "Status: OPEN ";
  }
  let difference = parseFloat((num1 - num2).toFixed(2));
  const total = parseFloat(workingCid.reduce((sum, [, value]) => sum + value, 0).toFixed(2)
);
  if (total === difference) {
    changeDueSection.textContent = "Status: CLOSED ";
  }
  for (const [denomination, value] of workingCid) {
    if (value === 0) {
      const targetArray = monetaryValues.find(array => array[0] === denomination);
      let index = monetaryValues.indexOf(targetArray);
      if (index !== -1) monetaryValues.splice(index, 1);
    }
  }
  const targetValues = monetaryValues.find(([denomination, value]) => difference >= value);
  if (difference === 0) {
    for (const [key, value] of Object.entries(denominationTracker)) {
    changeDueSection.textContent += `${key}: $${value} `;
    denominationTracker = {};
  };
    return
  } else if (targetValues) {
    const denomName = targetValues[0];
    const denomValue = targetValues[1];
    if (!Object.hasOwn(denominationTracker, denomName)) {
      denominationTracker[denomName] = denomValue;
    } else {
      denominationTracker[denomName] = parseFloat((denominationTracker[denomName] + denomValue).toFixed(2));
    }
    registerChangeCalculation(workingCid, targetValues[0], targetValues[1]);
    clearDrawer();
    updateDrawer();
    return calculateChange(difference, targetValues[1]);
  } else {
    changeDueSection.textContent = "Status: INSUFFICIENT_FUNDS";
  }
}

/* The same array as monetaryValues which will allow us to reset the entire project via the event clicker below for repeat use, since we do directly alter that monetaryValues array with the previous functions */
const allValues = [
  ['ONE HUNDRED', 100],
  ['TWENTY', 20],
  ['TEN', 10],
  ['FIVE', 5],
  ['ONE', 1],
  ['QUARTER', 0.25],
  ['DIME', 0.10],
  ['NICKEL', 0.05],
  ['PENNY', 0.01]
];

/* Click event listener which clears the change due section, empties the denomination tracker and resets the workingCid array and monetaryValues arrays to their original forms to be reused before calling the main function */
purchaseBtn.addEventListener("click", () => {
  changeDueSection.textContent = "";
  denominationTracker = {};
  workingCid = cid.map(([name, amount]) => [name, amount]);
  monetaryValues = allValues.map(([name, value]) => [name, value]);
  cashPriceCompare();
});
