var booleana = false;

$(document).ready(function () {
	$("#btn1").click(function () {
		var email = document.getElementById("email").value;
		var password = document.getElementById("password").value;

		if (email == "") {
			openErrors("Email must be filled and a valid character");
			return false;
		}

		if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			openErrors("You entered an email ");
			return false;
		}

		if (password == "") {
			openErrors("Password must be filled out");
			return false;
		}

		//When the form is validaded the login page take to page User-profile
		login({ email, password });
	});
});

function login(data) {
	fetch("http://localhost:4000/login", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then((response) => response.json())
		.then((response) => {
			localStorage.setItem("loginWorkspace", JSON.stringify(response));
			if (localStorage.getItem("loginWorkspace")) {
				window.location.href = "/front/user-profile.html";
			}
		})
		.catch((err) => console.error(err));
}
