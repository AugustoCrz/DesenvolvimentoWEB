var DateRangePicker = {
  init: function () {
    var st = this;
    setTimeout(function () {
      st.setDateRangePicker();
    }, 200);
  },
  setDateRangePicker: function () {
    if ($('.js-daterange')[0]) {
      $('.js-daterange').daterangepicker({
        opens: 'right',
        ranges: {
          'Hoje': [moment(), moment()],
          'Ontem': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          '7 Dias': [moment().subtract(6, 'days'), moment()],
          '30 Dias': [moment().subtract(29, 'days'), moment()]
        },
        "locale": {
          "customRangeLabel": "Personalizar",
          "format": "DD/MM/YYYY",
          "separator": " - ",
          "applyLabel": "Aplicar",
          "cancelLabel": "Cancelar",
          "daysOfWeek": [
            "Dom",
            "Seg",
            "Ter",
            "Qua",
            "Qui",
            "Sex",
            "Sab"
          ],
          "monthNames": [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro"
          ],
          "firstDay": 1
        }
      }, function (start, end, label) {
        console.log(start.format('DD-MM-YYYY'));
        console.log(end.format('DD-MM-YYYY'));

      });
    }
    if ($('.datepicker:not(".daterange")')[0]) {
      $('.datepicker:not(".daterange")').daterangepicker({
        singleDatePicker: true,
        "locale": {
          "format": "DD/MM/YYYY",
          "separator": " - ",
          "daysOfWeek": [
            "Dom",
            "Seg",
            "Ter",
            "Qua",
            "Qui",
            "Sex",
            "Sab"
          ],
          "monthNames": [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro"
          ],
          "firstDay": 1
        }
      }, function (start, end, label) {
        console.log('Selecionada ' + start.format('DD-MM-YYYY') + ' ** ' + end.format('DD-MM-YYYY'));
      });
    }
  }
}

DateRangePicker.init();
