$(() => {
  $("div")
    .css({
      width: "50%",
      height: "100px",
      backgroundColor: "red",
      padding: "8px",
      color: "white",
      margin: "0 auto",
    })
    .on({
      mouseover: function () {
        $(this).css({
          backgroundColor: "blue",
          cursor: "pointer",
        });
      },
      mouseleave: function () {
        $(this).css({
          backgroundColor: "red",
          cursor: "none",
        });
      },
    });
});
