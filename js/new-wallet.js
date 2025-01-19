const walletPreview = document.getElementById('preview');

function main() {
  const form = document.forms['new-wallet'];
  const resetButton = document.querySelector('button[type="reset"]');

  form['color'].addEventListener('change', changeColor);
  form['icon'].addEventListener('change', changeIcon);
  form['title'].addEventListener('input', changeTitle);
  form['initial-amount'].addEventListener('input', changeAmount);
  resetButton.addEventListener('click', resetPreview);
}

function resetPreview(e) {
  changeAmount();
  changeColor();
  changeIcon();
  changeTitle();
}

function changeAmount(e) {
  const value = e?.target.value;

  const amountPreview = document.getElementById('amount-preview');
  amountPreview.innerText = value || '-,--';
}

function changeTitle(e) {
  const value = e?.target.value;
  const titlePreview = document.getElementById('title-preview');
  titlePreview.innerText = value || 'Nueva cartera';
}

function changeColor(e) {
  const value = e?.target.value || '';
  const newClass = 'wallet-'.concat(value);
  walletPreview.classList.remove('wallet-red', 'wallet-orange', 'wallet-blue', 'wallet-green');
  walletPreview.classList.add(newClass);
}

function changeIcon(e) {
  const value = '#'.concat(getIconById(e?.target.value));
  const svg = document.getElementById('icon-preview').children[0];
  const href = svg.getAttribute('xlink:href');
  const newHref = href.substring(0, href.indexOf('#')).concat(value);
  console.log(newHref);
  svg.setAttribute('xlink:href', newHref);
}

function getIconById(id) {
  let iconName;

  switch(+id) {
    case 1:
      iconName = 'cerdito';
      break;
    case 2:
      iconName = 'banco';
      break;
    case 3:
      iconName = 'corazon';
      break;
    default:
      iconName = '';
      break;
  }

  return iconName;
}

main();