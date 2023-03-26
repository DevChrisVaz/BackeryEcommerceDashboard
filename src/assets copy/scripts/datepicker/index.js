import $ from 'jquery';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';

export default function (className) {
  $(`.${className}`).datepicker();
  // $('.end-date').datepicker();
}

export function getDate(className) {
  const selectedDate = $(`.${className}`).datepicker("getDate");
  return selectedDate;
}