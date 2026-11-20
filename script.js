// Get expenses from browser storage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];


// Get HTML elements
const form = document.getElementById("expenseForm");
const expenseTable = document.getElementById("expenseTable");
const totalAmount = document.getElementById("totalAmount");
const expenseCount = document.getElementById("expenseCount");


// Add expense
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("expenseName").value;
    const amount = Number(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    const expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        category: category,
        date: date
    };

    expenses.push(expense);

    saveExpenses();

    form.reset();

    displayExpenses();

});


// Display expenses
function displayExpenses() {

    expenseTable.innerHTML = "";

    expenses.forEach(function(expense) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${expense.date}</td>
            <td>${expense.name}</td>
            <td>${expense.category}</td>
            <td>₹${expense.amount}</td>
            <td>
                <button
                    class="delete-btn"
                    onclick="deleteExpense(${expense.id})">
                    Delete
                </button>
            </td>
        `;

        expenseTable.appendChild(row);

    });

    calculateTotal();

}


// Calculate total
function calculateTotal() {

    let total = 0;

    expenses.forEach(function(expense) {
        total = total + expense.amount;
    });

    totalAmount.textContent = "₹" + total;

    expenseCount.textContent = expenses.length;

}


// Delete expense
function deleteExpense(id) {

    expenses = expenses.filter(function(expense) {
        return expense.id !== id;
    });

    saveExpenses();

    displayExpenses();

}


// Save data in browser
function saveExpenses() {

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

}


// Display existing expenses when page opens
displayExpenses();