const form = document.forms['edit-profile'];

function main() {
  form['user-avatar'].addEventListener('change', updateAvatarPreview);
}

function updateAvatarPreview(e) {
  let src = '';

  if(e.target.value) {
    const avatarSelected = e.target.value.toLowerCase();
    src = `/img/avatar/${avatarSelected}.png`;
  }

  document.getElementById('avatar-preview').src = src;
}

main();