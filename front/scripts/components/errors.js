/* @name: Course Project: Shared WorkspaceWeb App
 * @Course Code: SODV1201 - 22MAYMNOT4
 * @class: Introduction to Web Programming 
 * @authors: Abigail Cruz, Debora Salles Antunes, Jorge Alberto Hurtado Ortega, Maria Estrella
 */

const openErrors = (text) => {
	$("#errors").show();
	$("#errors").html(text);
	$(window).scrollTop(0);
};

const closeErrors = () => {
	$("#errors").empty();
	$("#errors").hide("errors");
};
