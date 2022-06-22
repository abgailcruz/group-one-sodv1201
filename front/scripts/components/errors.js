const openErrors = (text) => {
	$("#errors").show();
	$("#errors").html(text);
	$(window).scrollTop(0);
};

const closeErrors = () => {
	$("#errors").empty();
	$("#errors").hide("errors");
};
