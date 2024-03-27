document.addEventListener("DOMContentLoaded", function () {
  const menuToggleBtn = document.querySelector(".menu-toggle-btn");
  const layoutMenu = document.querySelector(".layout-menu");

  if (menuToggleBtn && layoutMenu) {
    menuToggleBtn.addEventListener("click", function () {
      layoutMenu.classList.toggle("menu-collapsed");
    });
  } else {
    console.error("One or more required elements not found.");
  }
});
