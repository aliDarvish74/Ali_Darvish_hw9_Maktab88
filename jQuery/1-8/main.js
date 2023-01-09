$(() => {
  $(".slider p:first-child").on({
    click: function () {
      if ($(this).next().is(":hidden")) {
        $(".text").slideUp();
        $("i").removeClass("fa-caret-down").addClass("fa-caret-right");
        $(this)
          .children()
          .eq(0)
          .removeClass("fa-caret-right")
          .addClass("fa-caret-down");
        $(this).next().slideDown(500);
      }
    },
  });
});
