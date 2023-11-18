// function previewImage() {
//   const fileInput = document.getElementById("fileInput");
//   const iconPreview = document.getElementById("iconPreview");
//   const imagePreview = document.getElementById("imagePreview");
//   const file = fileInput.files[0];

//   if (file) {
//     const reader = new FileReader();

//     reader.onload = function (e) {
//       iconPreview.style.display = "none"; // Oculta el ícono de Font Awesome
//       imagePreview.style.display = "block"; // Muestra la imagen de previsualización
//       imagePreview.src = e.target.result;
//     };

//     reader.readAsDataURL(file);
//   } else {
//     // Restablece la vista previa a su estado inicial
//     iconPreview.style.display = "block"; // Muestra el ícono de Font Awesome
//     imagePreview.style.display = "none"; // Oculta la imagen de previsualización
//     imagePreview.src = "#"; // Restablece la imagen de previsualización
//   }
// }
function previewImage() {
  const fileInput = document.getElementById("fileInput");
  const iconPreview = document.getElementById("iconPreview");
  const imagePreview = document.getElementById("imagePreview");
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      iconPreview.style.display = "none";
      imagePreview.style.display = "block";
      imagePreview.src = e.target.result;
    };

    reader.readAsDataURL(file);
  } else {
    iconPreview.style.display = "block";
    imagePreview.style.display = "none";
    imagePreview.src = "#"; // Cambia esto a una imagen transparente o una imagen de carga
  }
}

