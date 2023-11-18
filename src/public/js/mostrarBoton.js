function mostrarBoton(inputId, labelId, buttonId) {
  var input = document.getElementById(inputId);
  var label = document.getElementById(labelId);
  var button = document.getElementById(buttonId);

  console.log("Valor del input:", input.value);
  console.log("Texto del label:", label.innerText);

  if (input.value !== label.innerText) {
    console.log("Los valores son diferentes. Mostrando el botón.");
    button.style.display = "inline-block";
  } else {
    console.log("Los valores son iguales. Ocultando el botón.");
    button.style.display = "none";
  }
}
