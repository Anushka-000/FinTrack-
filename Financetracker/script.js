document.addEventListener('DOMContentLoaded', () => {
  const addTransactionBtn = document.getElementById('addTransactionBtn');
  const addTransactionForm = document.getElementById('addTransactionForm');
  const transactionForm = document.getElementById('transactionForm');
  const transactionsList = document.getElementById('transactions');

  let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

  function updateUI() {
      let totalIncome = 0;
      let totalExpenses = 0;
      transactions.forEach(transaction => {
          if (transaction.type === 'income') {
              totalIncome += parseFloat(transaction.amount);
          } else {
              totalExpenses += parseFloat(transaction.amount);
          }
      });
      const balance = totalIncome - totalExpenses;

      document.getElementById('totalIncome').innerText = `$${totalIncome.toFixed(2)}`;
      document.getElementById('totalExpenses').innerText = `$${totalExpenses.toFixed(2)}`;
      document.getElementById('balance').innerText = `$${balance.toFixed(2)}`;

      transactionsList.innerHTML = '';
      transactions.forEach((transaction, index) => {
          const li = document.createElement('li');
          li.innerHTML = `${transaction.date} - ${transaction.category} - ${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}`;
          transactionsList.appendChild(li);
      });
  }

  function saveToLocalStorage() {
      localStorage.setItem('transactions', JSON.stringify(transactions));
  }

  addTransactionBtn.addEventListener('click', () => {
      addTransactionForm.classList.toggle('hidden');
  });

  transactionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const type = document.getElementById('type').value;
      const amount = document.getElementById('amount').value;
      const category = document.getElementById('category').value;
      const date = document.getElementById('date').value;

      const transaction = {
          type,
          amount,
          category,
          date
      };

      transactions.push(transaction);
      saveToLocalStorage();
      updateUI();

      transactionForm.reset();
      addTransactionForm.classList.add('hidden');
  });

  // Initialize UI
  updateUI();
});
