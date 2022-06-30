/* @name: Course Project: Shared Workspace Web App
 * @Course Code: SODV1201 - 22MAYMNOT4
 * @class: Introduction to Web Programming 
 * @authors: Abigail Cruz, Debora Salles Antunes, Jorge Alberto Hurtado Ortega, Maria Estrella
 */

// This is the error components that appears whenever there are errors. For example, invalid input from the user.
const openErrors = (text) => {
	$("#errors").show();
	$("#errors").html(text);
	$(window).scrollTop(0);
};

const closeErrors = () => {
	$("#errors").empty();
	$("#errors").hide("errors");
};
