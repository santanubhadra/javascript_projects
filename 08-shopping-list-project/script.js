const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearAll = document.getElementById('clear');
const filterButton = document.getElementById('filter');

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

    checkUI();

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
        if (confirm('Are you sure?')) {
        e.target.parentElement.parentElement.remove();
        }
    }
    checkUI();
}

function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
        checkUI();
    }
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
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}


itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearAll.addEventListener('click', clearItems);
filterButton.addEventListener('keyup', filterCheck);
checkUI();
