const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearAll = document.getElementById('clear');
const filterButton = document.getElementById('filter');

function displayItems() {
    const itemsFromStorage = getItemFromStorage();
    itemsFromStorage.forEach((item) => addItemToDOM(item));
}

function addItem(e) {
    e.preventDefault();
    newItem = itemInput.value;
    if (newItem=='') {
        alert('Please add a valid item');
            return;
    }

    addItemToDOM(newItem);

    addItemToStorage(newItem);
    
    checkUI();

    itemInput.Value = '';
}

function addItemToDOM(item) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);
}

function addItemToStorage(item) {
    const itemsFromStorage = getItemFromStorage();
    itemsFromStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemFromStorage() {
    let itemsFromStorage;
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;;
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className=classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function removeItem(e) {
    if (e.target.parentElement.classList.contains('text-red')) {
        if (confirm('Are you sure?')) {
        e.target.parentElement.parentElement.remove();
        const itemsInStorage = getItemFromStorage();
        const elementToBeRemoved = e.target.parentElement.parentElement.textContent;

        indexOfElement = itemsInStorage.indexOf(elementToBeRemoved);
        itemsInStorage.splice(indexOfElement,1);

        localStorage.setItem('items', JSON.stringify(itemsInStorage));
        }
    }
    checkUI();
}

function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
        checkUI();
    }
    localStorage.removeItem('items');
}

function checkUI() {
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearAll.style.display = 'none';
        filterButton.style.display = 'none';
    } else {
        clearAll.style.display = 'block';
        filterButton.style.display = 'block';
    }
}

function filterCheck() {
    const filterText = filterButton.value.toLowerCase();
    const allItems = itemList.querySelectorAll('li');

    allItems.forEach((item) => {
        const itemText = item.firstChild.textContent.trim().toLowerCase();
        if (itemText.includes(filterText)){
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}


itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearAll.addEventListener('click', clearItems);
filterButton.addEventListener('keyup', filterCheck);
document.addEventListener('DOMContentLoaded', displayItems);
checkUI();


// Local Storage
/* localStorage.setItem('name', 'Santanu');
console.log(localStorage.getItem('name'));
localStorage.removeItem('name');
localStorage.clear(); */
