// import {cursoService} from "../../../src/services/repositorios/index.js";
// import config from "../../config.js";
// import MercadoPago from "mercadopago";

// Inizializo mercado pago
const mp = new MercadoPago("TEST-71a31df7-b243-436f-9e9e-3f50db9f4d9a", {
  locale: "es-AR",
});

const form = document.getElementById("mpForm");
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Evitar la acción de envío predeterminada

  try {
    const data = {
      title: document.querySelector("input[name='nombre']").value,
      quantity: 1,
      price: document.querySelector("input[name='precio']").value,
    };
    console.log(data);

    const response = await fetch("/api/usuarios/createPreference", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const preference = await response.json();
    console.log(preference.id);

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
      if (window.checkoutButton) window.checkoutButton.unmount();
      await bricksBuilder.create("wallet", "wallet_container", {
        initialization: {
          preferenceId: preferenceId,
        },
      });
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al renderizar el botón de pago");
    }
  };

  renderComponent();
};

