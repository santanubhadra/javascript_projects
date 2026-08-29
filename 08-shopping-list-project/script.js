const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearAll = document.getElementById('clear');
const filterButton = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems() {
    const itemsFromStorage = getItemFromStorage();
    itemsFromStorage.forEach((item) => addItemToDOM(item));
    checkUI();
}

function addItem(e) {
    e.preventDefault();
    newItem = itemInput.value;
    if (newItem=='') {
        alert('Please add a valid item');
            return;
    }

    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
        itemInput.value ='';
    } else {
        if (checkIfItemExists(newItem)) {
            alert('Item already exists!');
            return;
        }
    }

    if (checkIfItemExists(newItem)) {
            alert('Item already exists!');
            return;
        }

    addItemToDOM(newItem);

    addItemToStorage(newItem);
    
    checkUI();

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

function checkIfItemExists(item) {
    const itemsFromStorage = getItemFromStorage();
    if (itemsFromStorage.includes(item)) {
        return true;
    } else {
        return false;
    }
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
        removeItemFromStorage(e.target.parentElement.parentElement.textContent);
        }
    } else {
        setItemToEdit(e.target);
    }

}

function removeItemFromStorage(item) {
    const itemsInStorage = getItemFromStorage();
    indexOfElement = itemsInStorage.indexOf(item);
    itemsInStorage.splice(indexOfElement,1);
    localStorage.setItem('items', JSON.stringify(itemsInStorage));
}

function setItemToEdit(item) {
    isEditMode = true;
    
    itemList.querySelectorAll('li').forEach((i) => i.style.color = '#333');
    item.classList.add("edit-mode");
    item.style.color = '#ccc';
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent;
}

function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
        checkUI();
    }
    localStorage.removeItem('items');
}

function checkUI() {
    itemInput.value = '';
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearAll.style.display = 'none';
        filterButton.style.display = 'none';
    } else {
        clearAll.style.display = 'block';
        filterButton.style.display = 'block';
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';

    isEditMode = false;
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
