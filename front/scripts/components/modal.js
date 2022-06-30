/* @name: Course Project: Shared Workspace Web App
 * @Course Code: SODV1201 - 22MAYMNOT4
 * @class: Introduction to Web Programming 
 * @authors: Abigail Cruz, Debora Salles Antunes, Jorge Alberto Hurtado Ortega, Maria Estrella
 */

// This is for the modal component that appears over the active page.

// The main content / template of the modal:
const content = (children, height, width) => `
  <div class="modal__wrapper" style="height: ${height}px; width: ${width}px">
    <button class="modal__btn-close" onClick="closeModal()"><span>x</span></button>
    <div>${children}</div>
  </div>
`;

// Function to open the modal as required by the page, with their respective height and width:
const openModal = (children, height, width) => {
	$("#modal").addClass("modal");
	$("#modal").html(content(children, height, width));
};

// Function to close the modal when the X button on the top right corner is clicked:
const closeModal = () => {
	$("#modal").empty();
	$("#modal").removeClass("modal");
};
