const textInput = document.getElementById("text-input");
const messagePara = document.getElementById("message-to-user");
const ulEL = document.getElementById("ul-eL");
const listEl = document.querySelectorAll(".list-item");
const addBtn = document.getElementById("add-btn");

let itemArray = [];
const savedItems = JSON.parse(localStorage.getItem("listItems"));

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
    itemsHtml += `<li class="button-55">${element}</li>`;
  });

  ulEL.innerHTML = itemsHtml;
}

function saveItemsToLocal() {
  localStorage.setItem("listItems", JSON.stringify(itemArray));
}

function isOnList(item) {
  return itemArray.includes(item);
}

function inputOnEnter() {
  textInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addBtn.click();
    }
  });
}

inputOnEnter();

// Add Button
addBtn.addEventListener("click", () => {
  const item = textInput.value.toLowerCase();

  if (item === "") {
    messagePara.textContent = `*Enter a valid value`;
  } else {
    if (isOnList(item)) {
      messagePara.textContent = `*${item} is already on your list`;
    } else {
      messagePara.textContent = "";
      populateArray(item);
    }
  }

  saveItemsToLocal();
  renderHtml();
  cleanInputField();
});

// Delete clicked item
ulEL.addEventListener("click", (e) => {
  const clickedEl = e.target.textContent;
  const itemIndex = itemArray.indexOf(clickedEl);
  //removes the clicked item
  itemArray.splice(itemIndex, 1);

  //stringify the array back to the local storage
  saveItemsToLocal();
  renderHtml();
});
