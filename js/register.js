const form = document.forms[0];

function registerUser(e) {
  e.preventDefault();
  let users = localStorage.getItem('users') || '';
  const user = getDataForm();
  
  users = users.concat(JSON.stringify(user)).concat('\n');
  localStorage.setItem('users', users);
  console.log(localStorage.getItem('users'));
}

function getDataForm() {
  const formElements = document.forms[0].elements;
  const user = {
    name: formElements['name'].value,
    email: formElements['email'].value,
    password: formElements['password'].value,
    avatar: formElements['avatar'].value
  };

  return user;
}

form.addEventListener('submit', registerUser);
