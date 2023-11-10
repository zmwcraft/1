// Sample data for the table
let data = [
    { col1: 'Data 1', col2: 'Data A', col3: 'Value X' },
    { col1: 'Data 2', col2: 'Data B', col3: 'Value Y' },
    // Add more data as needed
];

document.addEventListener('DOMContentLoaded', () => {
    populateTable(data);
});

function populateTable(data) {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';

    data.forEach((row, index) => {
        const newRow = tableBody.insertRow();

        for (const key in row) {
            const cell = newRow.insertCell();
            cell.textContent = row[key];
        }

        const actionsCell = newRow.insertCell();
        actionsCell.innerHTML = `<button onclick="editRow(${index})">Edit</button>
                                 <button onclick="deleteRow(${index})">Delete</button>`;
    });
}

function filterTable() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const filteredData = data.filter(row =>
        Object.values(row).some(value => value.toLowerCase().includes(searchValue))
    );

    populateTable(filteredData);
}

function addRow() {
    const newData = { col1: 'New Data', col2: 'New Value', col3: 'New Info' };
    data.push(newData);
    populateTable(data);
}

function editRow(index) {
    // Implement your edit logic here
    console.log('Edit row:', index);
}


function deleteRow(index) {
    const tableBody = document.querySelector('#data-table tbody');
    const row = tableBody.rows[index];

    // Display a confirmation dialog
    const confirmDelete = confirm('Do you want to delete the row?');

    if (confirmDelete) {
        // Remove the row from the table
        tableBody.removeChild(row);

        // Remove the corresponding data from the array
        data.splice(index, 1);

        saveDataToLocalStorage(); // Save data after deleting a row
    }
}


function editRow(index) {
    const tableBody = document.querySelector('#data-table tbody');
    const row = tableBody.rows[index];

    // Create input fields for each cell in the selected row
    for (let i = 0; i < row.cells.length - 1; i++) {
        const cell = row.cells[i];
        const currentData = cell.textContent;

        // Create an input field with the current data
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentData;

        // Replace the cell's content with the input field
        cell.innerHTML = '';
        cell.appendChild(input);
    }

    // Change the "Edit" button to "Save" and attach the saveRow function
    const editButton = row.cells[row.cells.length - 1].querySelector('button');
    editButton.textContent = 'Save';
    editButton.onclick = function () {
        saveRow(index);
    };
}

function saveRow(index) {
    const tableBody = document.querySelector('#data-table tbody');
    const row = tableBody.rows[index];
    saveDataToLocalStorage();
    // Create an object to store the updated row data
    const updatedRow = {};

    // Iterate through the cells and update the data
    for (let i = 0; i < row.cells.length - 1; i++) {
        const cell = row.cells[i];
        const input = cell.querySelector('input');
        const newData = input.value;

        // Update the cell's content with the new data
        cell.innerHTML = newData;

        // Store the updated data in the object
        const key = `col${i + 1}`;
        updatedRow[key] = newData;
    }

    // Change the "Save" button back to "Edit" and reattach the editRow function
    const editButton = row.cells[row.cells.length - 1].querySelector('button');
    editButton.textContent = 'Edit';
    editButton.onclick = function () {
        editRow(index);
    };

    // Update the data array with the edited row
    data[index] = updatedRow;
}


function saveDataToLocalStorage() {
    localStorage.setItem('tableData', JSON.stringify(data));
}

function loadDataFromLocalStorage() {
    const storedData = localStorage.getItem('tableData');
    const loadedData = storedData ? JSON.parse(storedData) : [];
    data = loadedData;
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';
    data.forEach((row, index) => {
        const newRow = tableBody.insertRow();
        for (const key in row) {
            const cell = newRow.insertCell();
            cell.textContent = row[key];
        }
        const actionsCell = newRow.insertCell();
        actionsCell.innerHTML = `<button onclick="editRow(${index})">Edit</button>
                                 <button onclick="deleteRow(${index})">Delete</button>`;
    });
}




document.addEventListener('DOMContentLoaded', () => {
    loadDataFromLocalStorage();
    populateTable(data);
});
