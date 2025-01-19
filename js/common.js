function loadUser() {
  const user = localStorage.getItem('user');
  if(user) {
    replaceLoginWithUser(JSON.parse(user));
  }
}

function replaceLoginWithUser(user) {
  const login = document.querySelector('a[href="/login.html"]');
  const image = document.createElement('img');
  image.src = `/img/avatar/${user.avatar}.png`;
  image.classList = 'bi d-block mx-auto mb-1';
  login.replaceChild(image, login.children[0]);
  login.childNodes[2].replaceWith(user.name);
  login.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    location.reload();
  });
}

loadUser();

