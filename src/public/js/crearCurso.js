const form = document.getElementById("crearCurso");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Obtener el contenido del editor TinyMCE
  const editorContent = tinymce.get("editor").getContent();

  // Construir el objeto FormData con los datos del formulario
  const formData = new FormData(form);
  formData.set("texto", editorContent); // Reemplazar el contenido del textarea con el contenido del editor

  // Obtener el archivo de imagen seleccionado
  const imagenInput = document.querySelector(
    'input[type="file"][name="imagen"]'
  );
  const imagenFile = imagenInput.files[0];
  if (imagenFile) {
    formData.set("imagen", imagenFile, imagenFile.name);
  }

  // Realizar la solicitud POST
  try {
    const response = await fetch("/api/curso/CrearCurso", {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();

    if (responseData.status === "success") {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Curso generado con éxito",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.replace("/admin/cursos");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: responseData.error,
      });
    }
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    Swal.fire({
      icon: "error",
      title: "Error al enviar el formulario",
      text: "Hubo un problema al enviar el formulario. Inténtelo de nuevo más tarde.",
    });
  }
});
