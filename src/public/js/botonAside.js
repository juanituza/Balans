document.addEventListener("DOMContentLoaded", function () {
  const menuToggleBtn = document.querySelector(".menu-toggle-btn");
  const layoutMenu = document.querySelector(".layout-menu");
  const layoutPage = document.querySelector(".layout-page");

  if (menuToggleBtn && layoutMenu && layoutPage) {
    menuToggleBtn.addEventListener("click", function () {
      layoutMenu.classList.toggle("menu-collapsed");

      // Ajustar el margen izquierdo del contenido principal
      if (layoutMenu.classList.contains("menu-collapsed")) {
        layoutPage.style.marginLeft = "50px"; // ajusta el margen izquierdo cuando el menú está contraído
      } else {
        layoutPage.style.marginLeft = "200px"; // ajusta el margen izquierdo cuando el menú está expandido
      }
    });
  } else {
    console.error("One or more required elements not found.");
  }
});
