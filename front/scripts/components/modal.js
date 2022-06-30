/* @name: Course Project: Shared WorkspaceWeb App
 * @Course Code: SODV1201 - 22MAYMNOT4
 * @class: Introduction to Web Programming 
 * @authors: Abigail Cruz, Debora Salles Antunes, Jorge Alberto Hurtado Ortega, Maria Estrella
 */

const content = (children, height, width) => `
  <div class="modal__wrapper" style="height: ${height}px; width: ${width}px">
    <button class="modal__btn-close" onClick="closeModal()"><span>x</span></button>
    <div>${children}</div>
  </div>
`;

const openModal = (children, height, width) => {
	$("#modal").addClass("modal");
	$("#modal").html(content(children, height, width));
};

const closeModal = () => {
	$("#modal").empty();
	$("#modal").removeClass("modal");
};
