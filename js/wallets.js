const wallets = document.querySelectorAll('.card.wallet');

function main() {
  wallets.forEach(wallet => {
    if(isWalletTitleBiggerThanBox(wallet)) {
      addTooltip(wallet);
    } else {
      removeTooltip(wallet);
    }
  });
}

function addTooltip(wallet) {
  const title = wallet.children[0].children[0].innerText;

  wallet.title = title;
}

function removeTooltip(wallet) {
  wallet.title = '';
}

function isWalletTitleBiggerThanBox(wallet) {
  const boxSize = wallet.children[0].children[0].clientWidth;
  const actualSize = wallet.children[0].children[0].scrollWidth;

  return actualSize > boxSize;
}

function createWallet() {
  location = '/new-wallet.html';
}

function goToWallet(id) {
  location.href = '/wallet.html';
}

main();

window.onresize = main;