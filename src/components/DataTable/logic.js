import $ from 'jquery';
import 'datatables.net-dt';

export default function () {
  $('#dataTable').DataTable({
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.13.2/i18n/es-MX.json"
    }
  });
};