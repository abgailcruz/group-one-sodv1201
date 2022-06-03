//const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
var booleana = false;

$(document).ready(function () {
	$("#btn1").click(function () {
		var email1 = document.getElementById("email").value;
		var password1 = document.getElementById("password").value;

		if (!isNaN(email1)) {
			alert("you entered a number, please fill with letters");
			return false;
		}

		if (email1 == "") {
			alert("Name must be filled and a valid character");
			return false;
		} else if (email1 == "") {
			alert("Name must be filled out");
			return false;
		}

		if (password1 == "") {
			alert("Name must be filled out");
			return false;
		}
		return alert(" Thanks for contact us");
	});
});
