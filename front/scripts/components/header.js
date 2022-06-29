function menuLogin() {
	if (localStorage.getItem("loginWorkspace")) {
		return '<a href="/front/user-profile.html">Profile</a>';
	}
	return '<a href="/front/login.html">Login</a>';
}

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

$("#header").append(HEADER);
