let itemPrice = document.querySelector("#price span");
let cashRegister = document.querySelector("#register");
const purchaseBtn = document.querySelector("#purchase-btn");
let price = 19.5;
itemPrice.textContent = price;
let changeDueSection = document.querySelector("#change-due");

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


let workingCid = [...cid];


const updateDrawer = () => {
  for (let [noteName, amount] of workingCid) {
  let newDiv = document.createElement("div");
  newDiv.className = "cash-values"
  newDiv.textContent = `${noteName}: $${amount}`;
  cashRegister.appendChild(newDiv);
  }
}


const clearDrawer = () => {
  cashRegister.textContent = "";
  let titleDiv = document.createElement("h3");
  titleDiv.textContent = "Change in Drawer";
  titleDiv.id = "cid-title-div";
  cashRegister.appendChild(titleDiv);
  }


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


let denominationTracker = {};
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

purchaseBtn.addEventListener("click", () => {
  changeDueSection.textContent = "";
  denominationTracker = {};
  workingCid = cid.map(([name, amount]) => [name, amount]);
  monetaryValues = allValues.map(([name, value]) => [name, value]);
  cashPriceCompare();
});
