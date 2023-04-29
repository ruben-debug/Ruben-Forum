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
	}
});
