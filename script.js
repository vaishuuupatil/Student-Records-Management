var selectedRow = null

function onFormSubmit() {
    // Read the data from the form.
    var formData = readFormData();
    
    // Call the validation function. If it returns true, proceed.
    if (validate(formData)) {
        if (selectedRow == null) {
            insertNewRecord(formData);
        } else {
            updateRecord(formData);
        }
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["full_name"] = document.getElementById("full_name").value;
    formData["stud_id"] = document.getElementById("stud_id").value;
    formData["branch"] = document.getElementById("branch").value;
    formData["sem"] = document.getElementById("sem").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("studentlist").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.full_name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.stud_id;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.branch;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.sem;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = '<a href="#" onclick="onEdit(this)" style="color: blue; font-family: Arial, sans-serif; font-weight: bold;">Edit</a> <a href="#" onclick="onDelete(this)" style="color: red; font-family: \'Times New Roman\', serif; font-size: 16px;">Delete</a>';
}

function resetForm() {
    document.getElementById("full_name").value = "";
    document.getElementById("stud_id").value = "";
    document.getElementById("branch").value = "";
    document.getElementById("sem").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("full_name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("stud_id").value = selectedRow.cells[1].innerHTML;
    document.getElementById("branch").value = selectedRow.cells[2].innerHTML;
    document.getElementById("sem").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.full_name;
    selectedRow.cells[1].innerHTML = formData.stud_id;
    selectedRow.cells[2].innerHTML = formData.branch;
    selectedRow.cells[3].innerHTML = formData.sem;
}

function onDelete(td) {
    if (confirm("Are you sure to delete this record..?")) {
        row = td.parentElement.parentElement;
        document.getElementById('studentlist').deleteRow(row.rowIndex);
        resetForm();
    }
}

function validate(formData) {
    let isValid = true;
    
    // Clear previous validation messages.
    let full_name_err = document.getElementById("full_name_validation");
    let stud_id_err = document.getElementById("stud_id_validation");
    let branch_err = document.getElementById("branch_validation");
    let sem_err = document.getElementById("sem_validation");
    
    if (full_name_err) full_name_err.innerHTML = "";
    if (stud_id_err) stud_id_err.innerHTML = "";
    if (branch_err) branch_err.innerHTML = "";
    if (sem_err) sem_err.innerHTML = "";
    
    // Check if full_name is empty.
    if (formData.full_name.trim() === "") {
        isValid = false;
        if (!full_name_err) {
            // Create a new span element for the error message if it doesn't exist.
            let span = document.createElement("span");
            span.id = "full_name_validation";
            span.innerHTML = "This field is required.";
            span.style.color = "red";
            document.getElementById("full_name").parentElement.appendChild(span);
        }
    }
    
    // Check if student_id is empty or not a positive number.
    if (formData.stud_id.trim() === "" || isNaN(formData.stud_id) || parseInt(formData.stud_id) <= 0) {
        isValid = false;
        if (!stud_id_err) {
            let span = document.createElement("span");
            span.id = "stud_id_validation";
            span.innerHTML = "Student ID must be a positive number.";
            span.style.color = "red";
            document.getElementById("stud_id").parentElement.appendChild(span);
        }
    }

    // Check if branch is empty.
    if (formData.branch.trim() === "") {
        isValid = false;
        if (!branch_err) {
            let span = document.createElement("span");
            span.id = "branch_validation";
            span.innerHTML = "This field is required.";
            span.style.color = "red";
            document.getElementById("branch").parentElement.appendChild(span);
        }
    }
    
    // Check if semester is empty or not a positive number.
    if (formData.sem.trim() === "" || isNaN(formData.sem) || parseInt(formData.sem) <= 0) {
        isValid = false;
        if (!sem_err) {
            let span = document.createElement("span");
            span.id = "sem_validation";
            span.innerHTML = "Semester must be a positive number.";
            span.style.color = "red";
            document.getElementById("sem").parentElement.appendChild(span);
        }
    }
    
    return isValid;
}