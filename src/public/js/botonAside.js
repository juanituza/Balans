// document.addEventListener("DOMContentLoaded", function () {
//   const menuToggleBtn = document.querySelector(".layout-menu .menu-toggle-btn");
//   const layoutMenu = document.querySelector(".layout-menu");
//   const layoutPage = document.querySelector(".layout-page");
//   const page = document.querySelector("#page");

//   if (menuToggleBtn && layoutMenu && layoutPage && page) {
//     menuToggleBtn.addEventListener("click", function (event) {
//       event.stopPropagation();

//       layoutMenu.classList.toggle("menu-collapsed");

//       if (layoutMenu.classList.contains("menu-collapsed")) {
//         layoutPage.style.marginLeft = "50px";
//       } else {
//         layoutPage.style.marginLeft = "200px";
//       }
//     });

//     // Ajustar el margen izquierdo inicial del contenido
//     layoutPage.style.marginLeft = "200px"; // Ajusta el margen para tener en cuenta el aside cuando se carga la página

//     document.addEventListener("click", function (event) {
//       // Verificar si el clic proviene del área del aside
//       if (!layoutMenu.contains(event.target)) {
//         // Si no, contraer el aside
//         layoutMenu.classList.add("menu-collapsed");
//         layoutPage.style.marginLeft = "50px"; // Mantener el margen izquierdo fijo
//       }
//     });
//   } else {
//     console.error("One or more required elements not found.");
//   }
// });
document.addEventListener("DOMContentLoaded", function () {
  // Función para verificar y activar el código cuando el ancho de la pantalla es menor o igual a 1200px
  function checkScreenWidth() {
    if (window.matchMedia("(max-width: 1200px)").matches) {
      const menuToggleBtn = document.querySelector(
        ".layout-menu .menu-toggle-btn"
      );
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
    } else {
      // Si la pantalla tiene un ancho mayor a 1200px, eliminar event listeners y restablecer estilos
      const layoutPage = document.querySelector(".layout-page");
      const layoutMenu = document.querySelector(".layout-menu");

      if (layoutPage && layoutMenu) {
        layoutPage.style.marginLeft = ""; // Restablecer margen izquierdo
        layoutMenu.classList.remove("menu-collapsed"); // Restablecer clase para mostrar el menú
      }
    }
  }

  // Verificar el ancho de la pantalla al cargar y al cambiar su tamaño
  checkScreenWidth();
  window.addEventListener("resize", checkScreenWidth);
});
