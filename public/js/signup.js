const signupFormHandler = async (event) => {

    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        document.location.replace('/createpost');
      } else {
        alert(response.statusText);
      }
    }
  };
document
  .querySelector('.login-form')
  .addEventListener('submit', signupFormHandler);