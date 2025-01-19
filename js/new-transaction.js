const form = document.forms['new-transaction'];

function main() {
  loadTodaysDate();

  form['date-selector']?.forEach(radio => radio.addEventListener('change', changeDates));
}

function changeDates(e) {
  const isTodaySelected = e.target.id === 'date-today';

  if(isTodaySelected) {
    loadTodaysDate();
    form['date'].disabled = true;
  } else {
    form['date'].value = '';
    form['date'].disabled = false;
  }
}

function loadTodaysDate() {
  const date = new Date();
  const formattedDate = date.toISOString().split('T')[0];
  form['date'].value = formattedDate;
}

main();