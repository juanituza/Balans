function habilitarEdicion(inputId, labelId, buttonId) {
  var input = document.getElementById(inputId);
  var label = document.getElementById(labelId);
  var button = document.getElementById(buttonId);

  input.readOnly = false;
  label.style.display = "none";
  if (button) {
    button.style.display = "none";
  }
}
