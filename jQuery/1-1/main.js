$(() => {
  const body = $("body");
  const div = document.createElement("div");
  body.append(div);
  $("div")
    .html("Click here and watch the text change!")
    .css({
      border: "1px solid black",
      backgroundColor: "green",
      color: "white",
      width: "50%",
      height: "100px",
      margin: "0 auto",
      padding: "8px",
      overflow: "auto",
    })
    .on("click", function () {
      $(this).html($(this).html() + " Click added some text!");
    });
});
