const textInput = document.getElementById("text-input");
const messagePara = document.getElementById("message-item-exist");
const ulEL = document.getElementById("ul-eL");
const listEl = document.querySelectorAll(".list-item");
const addBtn = document.getElementById("add-btn");

let itemArray = [];
const savedItems = JSON.parse(localStorage.getItem("listItems"));

let itemId = 0;

if (savedItems) {
  itemArray = savedItems;
  renderHtml();
}

function cleanInputField() {
  document.forms[0].reset();
}

function populateArray(item) {
  itemArray.push(item);
}

function renderHtml() {
  let itemsHtml = "";

  itemArray.forEach((element) => {
    itemId++;
    itemsHtml += `<li data-itemid="${itemId}"">${element}</li>`;
  });

  ulEL.innerHTML = itemsHtml;
}

function saveItemsToLocal() {
  localStorage.setItem("listItems", JSON.stringify(itemArray));
}

function isOnList(item) {
  return itemArray.includes(item);
}

// Add Button
addBtn.addEventListener("click", () => {
  const item = textInput.value.toLowerCase();

  if (isOnList(item)) {
    messagePara.textContent = `${item} is already on your list`;
  } else {
    populateArray(item);
  }

  console.log(itemArray);
  console.log(itemArray.indexOf(item));

  saveItemsToLocal();
  renderHtml();
  cleanInputField();
});

// Delete Items from the list

document.addEventListener("click", (e) => {
  console.log(e.target);
  console.log(itemArray);
});

// localStorage.clear();
