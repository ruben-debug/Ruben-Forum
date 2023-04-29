const form = document.querySelector('form');
const greetingsList = document.querySelector('#greetings');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = event.target.elements['name'].value;
  const message = event.target.elements['message'].value;
  if (name && message) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${name}:</strong> ${message}`;
    greetingsList.prepend(li);
    event.target.reset();

    // Send the message to the server to save in the database
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'save-message.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
      } else {
        console.error(xhr.statusText);
      }
    };
    xhr.send(`name=${name}&message=${message}`);
  }
});
