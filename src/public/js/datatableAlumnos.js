let dataTable;
let dataTableIsInitialized = false;

const dataTableOptions = {
  lengthMenu: [
    [10, 25, 50, -1],
    [10, 25, 50, "All"],
  ],
  // pagingType: "simple",
  pagingType: "simple_numbers",
  columnDefs: [
    { className: "centered", targets: [0, 1, 2, 3] },   
  ],
  stateSave: true,
  // responsive: true,
  language: {
    url: "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json", // URL del archivo de idioma español
  },
};

const initDataTable = async () => {
  if (dataTableIsInitialized) {
    dataTable.destroy();
  }
  dataTable = $("#miTablaC").dataTable(dataTableOptions);
  dataTableIsInitialized = true;
};

window.addEventListener("load", async () => {
  await initDataTable();
});
