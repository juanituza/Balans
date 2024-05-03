let dataTable;
let dataTableIsInitialized = false;

const dataTableOptions = {
  
  columnDefs: [{ className: "centered", targets: [0, 1] }],
  stateSave: true,
  responsive: true,
  language: {
    url: "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json", // URL del archivo de idioma español
  },
};

const initDataTable = async () => {
  if (dataTableIsInitialized) {
    dataTable.destroy();
  }
  dataTable = $("#miTabla").dataTable(dataTableOptions);
  dataTableIsInitialized = true;
};

window.addEventListener("load", async () => {
  await initDataTable();
});
