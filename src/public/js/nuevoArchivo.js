document.addEventListener("DOMContentLoaded", function () {
  const menuToggleBtn = document.querySelector(".layout-menu .menu-toggle-btn");
  const layoutMenu = document.querySelector(".layout-menu");
  const layoutPage = document.querySelector(".layout-page");
  const table = document.querySelector("#miTabla");

  if (menuToggleBtn && layoutMenu && layoutPage && table) {
    menuToggleBtn.addEventListener("click", function (event) {
      event.stopPropagation();

      layoutMenu.classList.toggle("menu-collapsed");

      if (layoutMenu.classList.contains("menu-collapsed")) {
        layoutPage.style.marginLeft = "50px";
      } else {
        layoutPage.style.marginLeft = "200px";
      }
    });

    // Detener la propagación del clic en la tabla para evitar que llegue al aside
    table.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  } else {
    console.error("One or more required elements not found.");
  }

  document.addEventListener("click", function () {
    if (layoutMenu.classList.contains("menu-collapsed")) {
      layoutMenu.classList.remove("menu-collapsed");
      layoutPage.style.marginLeft = "200px";
    }
  });
});
