$(() => {
  $(".fadeContainer")
    .css({
      width: "70%",
      margin: "0 auto",
    })
    .children()
    .eq(2)
    .css({
      backgroundColor: "grey",
      padding: "8px",
      margin: "0",
    });
  $("#fadeIn").on("click", () => {
    $(".fadeContainer").children().eq(2).fadeIn();
  });
  $("#fadeOut").on("click", () => {
    $(".fadeContainer").children().eq(2).fadeOut();
  });
});
