const form = document.forms[0];

function login(e) {
  e.preventDefault();
  const users = parseUsers(localStorage.getItem('users').split('\n') || []);
  const login = getDataForm();
  const user = isUserRegistered(login, users);

  if(user.length === 1) {
    saveUser(user[0]);
    location.href = '/index.html';
  } else {
    console.log('error');
  }

  console.log(users);
}

function getDataForm() {
  const formElements = document.forms[0].elements;
  const user = {
    email: formElements['email'].value,
    password: formElements['password'].value,
  };

  return user;
}

function parseUsers(users) {
  for(let i = 0; i < users.length - 1; i++) {
    const u = JSON.parse(users[i]);
    users[i] = u;
  };

  return users.pop() || users;
}

function isUserRegistered(login, users) {
  const uniqueUser = users.filter(u => u.email === login.email && u.password == login.password);

  return uniqueUser;
}

function saveUser(user) {
  const safeUser = {
    name: user.name,
    avatar: user.avatar
  };

  localStorage.setItem('user', JSON.stringify(safeUser));
}

form.addEventListener('submit', login);