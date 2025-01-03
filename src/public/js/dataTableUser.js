// jQuery(document).ready(function ($) {
//   new DataTable("#miTabla", {
//     stateSave: true,
//     responsive: true,
//     language: {
//       url: "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json", // URL del archivo de idioma español
//     },
//   });
//   // $("#miTabla").DataTable();
// });

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
    { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6] },
    { orderable: false, targets: [4, 5, 6] },
    // {searchable :false, targets:[0]}
  ],
  stateSave: true,
  // responsive: true,
  language: {
    url: "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json", // URL del archivo de idioma español
  },
};

const initDataTable = async () => {
  if(dataTableIsInitialized){
    dataTable.destroy();
  }
  dataTable = $("#miTabla").dataTable(dataTableOptions);
  dataTableIsInitialized = true;
}

window.addEventListener("load", async () => {
  await initDataTable();
});