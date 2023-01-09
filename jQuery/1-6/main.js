$(() => {
  $(".navItem").on({
    mouseenter: function (e) {
      $(".dropdown").fadeOut(500);
      $("span").css({
        cursor: "pointer",
      });
      $(e.currentTarget.children[1]).slideDown(500);
      $(".dropdown").on({
        mouseenter: function () {
          $(this).removeClass("d-none");
          return;
        },
        mouseleave: function () {
          $(this).fadeOut(500);
        },
      });
    },
  });
});
