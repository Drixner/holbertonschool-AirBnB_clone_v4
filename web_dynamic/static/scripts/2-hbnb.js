$(document).ready(function () {
  const DicObjIds = {};
  $('input[type="checkbox"]').on('click', function () {
    if (this.checked) {
      DicObjIds[$(this).data('id')] = $(this).data('name');
    } else {
      delete DicObjIds[$(this).data('id')];
    }
    let msjpri = Object.values(DicObjIds).join(', ');
    if (msjpri.length > 28) {
      msjpri = msjpri.slice(0, 28) + '...';
    }
    $('.amenities h4').html(msjpri.length === 0 ? '&nbsp' : msjpri);
  });

  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/status/',
    type: 'GET',
    dataType: 'json'
  }).done(function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      }
    });
});
