$(document).ready(function () {
	$("#register-button").click(addNewRegister);
});

function addNewRegister() {
	closeErrors();
	let name = $("#name").val();
	let lastName = $("#lastName").val();
	let email = $("#email").val();
	let password = $("#password").val();
	let phone = $("#phone").val();
	let city = $("#city").val();

	const errorsMessage = [];
	if (name.trim() === "") errorsMessage.push("Name");
	if (lastName.trim() === "") errorsMessage.push("Lastname");
	if (email.trim() === "") {
		errorsMessage.push("Email");
	} else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		errorsMessage.push("You need to add a real email");
	}
	if (password.trim() === "") errorsMessage.push("Password");

	if (errorsMessage.length > 0) {
		const messages = errorsMessage.join(", ");
		openErrors("Error, you need to add the next information: " + messages);
		return;
	}

	saveData({ id: new Date().getTime(), name, lastName, email, password, phone, city });
	openModal("<p>Successful registration<p>", 100, 300);
}

function saveData(data) {
	fetch("http://localhost:4000/registers", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then((response) => response)
		.then((response) => {
			console.log("response", response, typeof response);
		})
		.catch((err) => console.error(err));
}
