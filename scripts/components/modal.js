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
