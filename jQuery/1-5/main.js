$(() => {
  $("*").css({
    margin: "0",
    padding: "0",
    boxSizing: "border-box",
  });
  $(".container")
    .css({
      width: "70%",
      margin: "20px auto",
      textAlign: "justify",
    })
    .children()
    .eq(3)
    .children()
    .eq(0)
    .css({
      backgroundColor: "grey",
      padding: "8px",
    });
  $("#slideUp").on("click", () => {
    $("#textContainer").children().eq(0).slideUp();
  });
  $("#slideDown").on("click", () => {
    $("#textContainer").children().eq(0).slideDown();
  });
  $("#slideToggle").on("click", () => {
    $("#textContainer").children().eq(0).slideToggle();
  });
});
