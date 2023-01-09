$(() => {
  let defaultProgress = 10;
  $("#increaseProgress").on({
    click: function () {
      if (defaultProgress < 100) {
        defaultProgress += 10;
        $("#bar").css({
          width: `${defaultProgress}%`,
        });
        $("#text").text(`${defaultProgress}%`);
      }
    },
  });
});
