const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearAll = document.getElementById('clear');

function addItem(e) {
    e.preventDefault();
    newItem = itemInput.value;
    if (newItem=='') {
        alert('Please add a valid item');
            retunr;
    }

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);
    itemInput.Value = '';
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
        e.target.parentElement.parentElement.remove();
    }
}

function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
}

itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearAll.addEventListener('click', clearItems);