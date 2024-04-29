document.addEventListener("DOMContentLoaded", function () {
  const menuToggleBtn = document.querySelector(".layout-menu .menu-toggle-btn");
  const layoutMenu = document.querySelector(".layout-menu");
  const layoutPage = document.querySelector(".layout-page");
  const page = document.querySelector("#page");

  if (menuToggleBtn && layoutMenu && layoutPage && page) {
    menuToggleBtn.addEventListener("click", function (event) {
      event.stopPropagation();

      layoutMenu.classList.toggle("menu-collapsed");

      if (layoutMenu.classList.contains("menu-collapsed")) {
        layoutPage.style.marginLeft = "50px";
      } else {
        layoutPage.style.marginLeft = "200px";
      }
    });

    // Ajustar el margen izquierdo inicial del contenido
    layoutPage.style.marginLeft = "200px"; // Ajusta el margen para tener en cuenta el aside cuando se carga la página

    document.addEventListener("click", function (event) {
      // Verificar si el clic proviene del área del aside
      if (!layoutMenu.contains(event.target)) {
        // Si no, contraer el aside
        layoutMenu.classList.add("menu-collapsed");
        layoutPage.style.marginLeft = "50px"; // Mantener el margen izquierdo fijo
      }
    });
  } else {
    console.error("One or more required elements not found.");
  }
});
