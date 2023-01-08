$(() => {
  $("div")
    .not("#btnContainer")
    .css({
      backgroundColor: "#00ff00",
      border: "1px solid black",
    })
    .add("#btnContainer")
    .css({
      width: "70%",
      margin: "20px auto",
    })
    .eq(2)
    .css({
      paddingBottom: "100px",
    });

  $("#parentBtn").on("click", () => {
    $("#target").html(`${$("#parent").text()} ${$("#target").html()}`);
  });
  $("#childBtn").on("click", () => {
    $("#target").html(`${$("#child").text()} ${$("#target").html()}`);
  });
});
