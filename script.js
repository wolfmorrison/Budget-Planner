const totalBudget = document.getElementById('total-budget');
const totalExpense = document.getElementById('total-expense');
const balance = document.getElementById('balance');
const expenseForm = document.getElementById('expense-form');
const expenseInput = document.getElementById('expense');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expense-list');

let budget = 0;
let expenses = [];

// Function to update budget summary
function updateBudgetSummary() {
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const remainingBalance = budget - totalExpenses;
    totalExpense.textContent = `$${totalExpenses}`;
    balance.textContent = `$${remainingBalance}`;
}

// Function to display expenses
function displayExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach(expense => {
        const item = document.createElement('li');
        item.innerHTML = `
            ${expense.description} - $${expense.amount} 
            <button class="delete-btn" onclick="deleteExpense(${expense.id})">x</button>
        `;
        expenseList.appendChild(item);
    });
}

// Function to add an expense
function addExpense(e) {
    e.preventDefault();
    const description = expenseInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());
    if (!description || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid expense description and amount');
        return;
    }
    const newExpense = {
        id: Date.now(),
        description,
        amount,
    };
    expenses.push(newExpense);
    displayExpenses();
    updateBudgetSummary();
    expenseInput.value = '';
    amountInput.value = '';
}

// Function to delete an expense
function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    displayExpenses();
    updateBudgetSummary();
}

// Event listeners
expenseForm.addEventListener('submit', addExpense);

// Initial display
updateBudgetSummary();
