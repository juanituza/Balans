const getStates = async (countryName, authToken) => {
  try {
    const encodedCountryName = encodeURIComponent(countryName);
    const statesUrl = `https://www.universal-tutorial.com/api/states/${encodedCountryName}`;

    const statesHeaders = new Headers({
      Authorization: `Bearer ${authToken}`,
      Accept: "application/json",
    });

    const response = await fetch(statesUrl, {
      method: "GET",
      headers: statesHeaders,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const statesData = await response.json();
    console.log("Estados obtenidos (debug):", statesData);
    return statesData;
  } catch (error) {
    console.error("Error al obtener estados:", error);
    throw error;
  }
};

let selectedCountries;
let countrySelect;
const stateSelect = document.getElementById("item-details-stateValue");

const tokenUrl = "https://www.universal-tutorial.com/api/getaccesstoken";
const tokenHeaders = new Headers({
  Accept: "application/json",
  "api-token":
    "arpb6V0iEFFBvxMtLxbiY-vTLcMI6mlWgr3J8rcH20R4HBRnCgSXCqC9Xh_FhR1BP80",
  "user-email": "juanituza85@gmail.com",
});

fetch(tokenUrl, { method: "GET", headers: tokenHeaders })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(async (tokenData) => {
    const countriesUrl = "https://www.universal-tutorial.com/api/countries/";
    const countriesHeaders = new Headers({
      Authorization: `Bearer ${tokenData.auth_token}`,
      Accept: "application/json",
    });

    try {
      const response = await fetch(countriesUrl, {
        method: "GET",
        headers: countriesHeaders,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const countriesData = await response.json();
      selectedCountries = countriesData.filter(
        (country) =>
          country.country_name === "Argentina" ||
          country.country_name === "United States"
      );

      countrySelect = document.getElementById("countrySelect");
      selectedCountries.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.country_name;
        option.text = country.country_name;
        option.dataset.iso2 = country.country_iso2;
        countrySelect.appendChild(option);
      });

      // Agregar evento change después de haber creado countrySelect
      countrySelect.addEventListener("change", async () => {
        const selectedCountry = countrySelect.value;

        // Limpiar opciones anteriores
        stateSelect.innerHTML = "<option value=''>Seleccionar</option>";

        if (selectedCountry) {
          console.log("Cambio en el país seleccionado:", selectedCountry);

          const selectedCountryObject = selectedCountries.find(
            (country) => country.country_name === selectedCountry
          );

          if (selectedCountryObject) {
            console.log(
              "Obteniendo estados para",
              selectedCountryObject.country_name
            );

            try {
              const selectedCountryIso2 = selectedCountryObject.country_name;
              const statesData = await getStates(
                selectedCountryIso2,
                tokenData.auth_token
              );
              console.log(selectedCountryIso2);
              console.log("Estados obtenidos:", statesData);

              // Llenar el select de estados
              statesData.forEach((state) => {
                const option = document.createElement("option");
                option.value = state.state_name;
                option.text = state.state_name;
                stateSelect.appendChild(option);
              });
            } catch (error) {
              console.error("Error al obtener estados:", error);
            }
          }
        }
      });
    } catch (error) {
      console.error("Error al obtener países:", error);
    }
  })
  .catch((error) => {
    console.error("Error al obtener el token de acceso:", error);
  });
