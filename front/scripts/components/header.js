/* @name: Course Project: Shared Workspace Web App
 * @Course Code: SODV1201 - 22MAYMNOT4
 * @class: Introduction to Web Programming 
 * @authors: Abigail Cruz, Debora Salles Antunes, Jorge Alberto Hurtado Ortega, Maria Estrella
 */

/* Header Components:
 * Right: Register, Profile, and Sign out
 * Left: Clickable logo to "/"
 */

// Function for the Logout button click
function signOff() {
	window.localStorage.removeItem("loginWorkspace");
	window.location.href = "/front/login.html";
}

/* Function to change the header depending on when the user is logged in or not.
 * Logged in: Will show the Profile and the Logout Button.
 * Else: Will show the login button.
 */

// Function for the menu display if the user is logged in:
function menuLogin() {
	if (localStorage.getItem("loginWorkspace")) {
		return '<a href="/front/user-profile.html">Profile</a><button class="btn-sign-off" onClick="signOff()">Logout</button>';
	}
	return '<a href="/front/login.html">Login</a>';
}

// The template for the header:
// (The error will show below the header if, for example, there is an incorrect user input.)
const HEADER = `<div class="header__nav">
	<div class="header__left">
		<a href="/" class="header__logo">BV Workspaces</a>
	</div>
	<div class="header__right">
		<a href="/front/register.html">Register</a>
		${menuLogin()}
	</div>
	</div>
	<div class="message-error" id="errors">
		Error
	</div>
`;

// Append the header(above) to the html pages:
$("#header").append(HEADER);
