const formStatisticsFilter = document.forms['statistics-filter'];
const formActions = document.forms['transaction-actions'];

function main() {
  if(formStatisticsFilter) {
    formStatisticsFilter['period'].addEventListener('change', reactivateFields);
    generateGraphic(); 
  }

  if(formActions) {
    formActions['select-all'].addEventListener('change', toggleAllCheckboxes);
  }
}

function reactivateFields(e) {
  const fromDateInput = formStatisticsFilter['from-date'];
  const untilDateInput = formStatisticsFilter['until-date'];
  const searchButton = document.querySelector('button[type="submit"]');

  const periodSelected = e.target.value;
  const isPeriodCustom = periodSelected === 'custom';
  
  disableNavegator(isPeriodCustom);
  fromDateInput.disabled = !isPeriodCustom;
  untilDateInput.disabled = !isPeriodCustom;
  searchButton.disabled = !isPeriodCustom;
    
  fromDateInput.value = isPeriodCustom ? fromDateInput.value : '';
  untilDateInput.value = isPeriodCustom ? untilDateInput.value : '';
}

function disableNavegator(disable) {
  const navegator = Array.from(document.getElementById('navegator').children);

  navegator.forEach(button => button.disabled = disable)
}

function deleteSelectedItems() {
  const selectedItems = Array.from(document.querySelectorAll('input[name="transaction-select"]:checked'));
  const selectedItemsIds = selectedItems.map(i => i.value);
  
  formActions['selected-transactions'].value = selectedItemsIds;
  // formActions.submit();
}

function toggleAllCheckboxes(e) {
  const check = e.target.checked;
  const checkboxes = Array.from(document.querySelectorAll('input[name="transaction-select"]'));
  checkboxes.forEach(c => c.checked = check);
}

main();

function generateGraphic() {
  const ctx = document.getElementById('balance');

  const labels = generateArrayDaysOfActualMonth();
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total',
        data: [5, 7, 7, 5, 5, 5, 5, 5, 6, 8, 8, 8, 10, 10, 10, 10, 10, 10],
        fill: false,
        borderColor: 'rgb(47, 44, 216)',
        tension: 0,
      },
      {
        label: 'Ingresos',
        data: [0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 0, 0, 0 ,0 ,0],
        fill: false,
        borderColor: 'rgb(48, 185, 48)',
        tension: 0,
      },
      {
        label: 'Gastos',
        data: [0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
        fill: false,
        borderColor: 'rgb(185, 48, 48)',
        tension: 0,
      },
    ],
  };

  new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      responsive: true, /* Asegura que se ajuste al contenedor */
      maintainAspectRatio: true,
      plugins: {
        legend: {
          align: 'center',
          display: true,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        }
      }
    }
  });
}

function generateArrayDaysOfActualMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const lastDayOfMonth = new Date(year, month, 0).getDate();

  const days = [];

  for (let day = 1; day <= lastDayOfMonth; day++) {
    const date = new Date(year, month - 1, day);
    const options = { day: 'numeric', month: 'short' };
    const formattedDay = date.toLocaleDateString('es-ES', options);
    days.push(formattedDay);
  }

  const daysUntilToday = days.slice(0, today.getDate());

  return daysUntilToday;
}