var ExpenseFinalValue;
var RemainingBudget;
var DeleteBudgetValue;
var displayRemainingBudget = document.getElementById("remainingBudget");

function TakeValue() {
    var budgetValue = document.getElementById("monthlyBudget").value;
    var displayBudget = document.getElementById("displayingBudget");


    // var error = document.getElementById("error");

    if (budgetValue === "") {
        // error.innerHTML = "Please add a budget"
        alert("Please type something");
        return;
    }
    else if (isNaN(budgetValue)) {
        alert("Please give a valid number");
        // error.innerHTML = "Please give a valid number"
        return;

    } else {
        ExpenseFinalValue = +budgetValue;

    }

    RemainingBudget = ExpenseFinalValue;
    displayBudget.innerHTML = "Budget: " + ExpenseFinalValue;
    displayRemainingBudget.innerHTML = "Remaining Budget: " + RemainingBudget;



}



// --------- ARRAY OF OBJECT TO STORE EXPENSES ----------------- // 

var ArrayExpenses = [];


// ------------- SAVING EXPENSES ----------------------- // 

var AddInformation = document.getElementById("AddInformation");

function saving() {
    var inputExpense = document.getElementById("inputExpense");
    var description = document.getElementById("description");
    var date = document.getElementById("dateInput");
    var category = document.getElementById("Categories");

    if (inputExpense.value === "" || isNaN(inputExpense.value) || description.value === ""
        || date.value === "" || category.value === "" || ExpenseFinalValue === 0
        || isNaN(ExpenseFinalValue)) {

        alert("Enter complete or valid values");
        return;

    }


    else {
        var ExpenseValue = +inputExpense.value;
    }

    // ------------- OBJECT FOR EXPENSES -------------- // 

    var expenses = {
        expense: inputExpense.value,
        Description: description.value,
        InputDates: date.value,
        Categories: category.value,
        BudgetRemaining: RemainingBudget
    };

    ArrayExpenses.push(expenses);

    // ----------------- CREATING TABLE AT RUNTIME ----------- // 


    var table = document.getElementById("displayResult");


    var HeaderRow = document.createElement("tr");

    var tableHeading = ["Expense", "Description", "Category", "Date", "Remaining Budget"];

    var th = document.createElement("th");

    for (let i = 0; i < tableHeading.length; i++) {
        var th = document.createElement("th");
        th.textContent = tableHeading[i];
        HeaderRow.appendChild(th);
    }

    table.appendChild(HeaderRow);

    var TableRow = document.createElement("tr");

    var cell1 = document.createElement("td");
    cell1.textContent = inputExpense.value;

    var cell2 = document.createElement("td");
    cell2.textContent = description.value;

    var cell3 = document.createElement("td");
    cell3.textContent = category.value;

    var cell4 = document.createElement("td");
    cell4.textContent = date.value;

    var cell5 = document.createElement("td");
    RemainingBudget = ExpenseFinalValue - (+inputExpense.value);
    cell5.textContent = RemainingBudget;

    ExpenseFinalValue = RemainingBudget;
    displayRemainingBudget.innerHTML = "Remaining Budget: " + RemainingBudget;


    TableRow.appendChild(cell1);
    TableRow.appendChild(cell2);
    TableRow.appendChild(cell3);
    TableRow.appendChild(cell4);
    TableRow.appendChild(cell5);

    table.appendChild(TableRow);



    // --------- RESETTING VALUES ---------- //
    
    var backupExpense =  inputExpense.value;
    var backupDescription = description.value;
    var backupDate = date.value; 
    var backupCategory = category.value; 
    var BackupRemainingBuget = RemainingBudget; 
    var BackupFinalValue = ExpenseFinalValue;



    inputExpense.value = "";
    description.value = "";
    date.value = "";
    category.value = "";


    // --------------- EDIT & DELETE BUTTON -------------- // 

    var EditButton = document.createElement("button");
    EditButton.id = "editButton";
    EditButton.textContent = "Edit";

    

    var DeleteButton = document.createElement("button");
    DeleteButton.id = "editButton";
    DeleteButton.textContent = "Delete";

    var para = document.createElement("p");
    para.style.marginBottom = "18px";


    var cell6 = document.createElement("td");
    cell6.appendChild(EditButton);
    TableRow.appendChild(cell6);

    var cell7 = document.createElement("td");
    cell7.appendChild(DeleteButton);
    TableRow.appendChild(cell7);


    table.appendChild(para);
    table.appendChild(para);
    table.appendChild(para);

    var lineBreak = document.createElement("p");
    table.appendChild(lineBreak);


    TableRow.style.backgroundColor = "goldenrod";
    HeaderRow.style.backgroundColor ="goldenrod";

    table.style.borderCollapse = 'collapse';


    // ----------------EDIT BUTTON FUNCTIONALITY -------------
    EditButton.addEventListener("click", function () {


        var editExpenseValue = document.getElementById("inputExpense");
        var editDescription = document.getElementById("description");
        var editCatgories = document.getElementById("Categories");
        var editDateInput = document.getElementById("dateInput");

        editExpenseValue.value = backupExpense;
        editDescription.value =  backupDescription; 
        editDateInput.value = backupDate;
        editCatgories.value = backupCategory

        
        var saveButton = document.createElement("button");
        saveButton.textContent = "Save Changes";

    
        var AddButton  = document.getElementById("add_expense");
        AddButton.replaceWith(saveButton);
        saveButton.id = "editButton";


        saveButton.addEventListener("click" ,function(){

            RemainingBudget = +RemainingBudget + (+backupExpense) - (+editExpenseValue.value);
            ExpenseFinalValue = RemainingBudget; 
            displayRemainingBudget.innerHTML = "Remaining Budget: " + RemainingBudget;

            cell1.innerText = editExpenseValue.value;
            cell2.innerText = editDescription.value;
            cell3.innerText = editCatgories.value;
            cell4.innerText = editDateInput.value;
            cell5.innerText = RemainingBudget; 
            
            saveButton.replaceWith(AddButton);

            editExpenseValue.value="";
            editDescription.value="";
            editCatgories.value="";
            editDateInput.value="";

             
        })

        
    })

    // ----------------DELETE BUTTON FUNCTIONALITY ------------- // 

    DeleteButton.addEventListener("click", function () {
        RemainingBudget = RemainingBudget + ExpenseValue;

        displayRemainingBudget.innerHTML = "Remaining Budget: " + RemainingBudget;

        ExpenseFinalValue = RemainingBudget;

        table.removeChild(TableRow);
        table.removeChild(HeaderRow);
      
        for (var i = 0; i < ArrayExpenses.length; i++) {

           
            
            if (ArrayExpenses[i].expense === backupExpense && 
                ArrayExpenses[i].Description === backupDescription && 
                ArrayExpenses[i].InputDates === backupDate && 
                ArrayExpenses[i].Categories === backupCategory)
                {
                    ArrayExpenses.splice(i,1);
                }

        }
        
        console.log(ArrayExpenses);

        HeaderRow.style.backgroundColor ="none";
        TableRow.style.backgroundColor = "none";




    })


}







