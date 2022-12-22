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
});
