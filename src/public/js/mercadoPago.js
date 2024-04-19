// import {cursoService} from "../../../src/services/repositorios/index.js";
// import config from "../../config.js";
// import MercadoPago from "mercadopago";

// Inizializo mercado pago
const mp = new MercadoPago("APP_USR-48c73f3c-f546-4eab-b3da-c0fdcfa9770a", {
  locale: "es-AR",
});
// Inicializa window.checkoutButton
window.checkoutButton = null;
const form = document.getElementById("mpForm");
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Evitar la acción de envío predeterminada

  try {
    // const precioInput = document.querySelector("input[name='precio']");
    const precioInput = document.querySelector("input[name='precio']");

    // Obtén el valor numérico sin el símbolo '$'
    let precioValue = parseFloat(
      precioInput.dataset.precio.replace("$", "").replace(".", "")
    );
    
    const data = {
      title: document.querySelector("input[name='nombre']").value,
      quantity: 1,
      // price: Number(document.querySelector("input[name='precio']").value),
      // Obtén el valor actual del campo de entrada

      price: precioValue,
    };
   

    const response = await fetch("/api/usuarios/createPreference", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const preference = await response.json();
  

    createCheckoutButton(preference.id);
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al procesar la solicitud");
  }
});

const createCheckoutButton = (preferenceId) => {
  const bricksBuilder = mp.bricks();

  const renderComponent = async () => {
    try {
      console.log("Valor de window.checkoutButton:", window.checkoutButton);
      if (window.checkoutButton) {
        // // Si el botón ya existe, no hacemos nada
        // console.log("El botón de pago ya existe.");
        // return;
        Swal.fire({
          icon: "error",
          title: "El botón de pago ya existe.",
          text: "Debe proseguir con el botón generado",
        });
      } else {
        await bricksBuilder.create("wallet", "wallet_container", {
          initialization: {
            preferenceId: preferenceId,
          },
        });
        // Establecer window.checkoutButton después de la creación del botón
        window.checkoutButton = true;
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al renderizar el botón de pago");
    }
  };

  renderComponent();
};


