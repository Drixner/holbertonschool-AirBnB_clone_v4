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

  
  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    type: 'POST',
    data: JSON.stringify({}),
    contentType: 'application/json',
    dataType: 'json'
  })
    .done(function (data) {
      data.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      data.forEach(function (place) {
        const article = $(document.createElement('article'));
        const placeH2 = $(document.createElement('h2')).text(place.name);
        article.append(placeH2);

        const priceByNightDiv = $(document.createElement('div'))
          .addClass('price_by_night');
        const priceByNightP = $(document.createElement('p'))
          .text(`$${place.price_by_night}`);
		const addPriceText = $(document.createElement('div'))
		  .addClass('title_box');
        priceByNightDiv.append(priceByNightP);
        addPriceText.append(placeH2, priceByNightDiv);
        article.append(addPriceText);

        const informationDiv = $(document.createElement('div'))
          .addClass('information');
        const maxGuestDiv = $(document.createElement('div'))
          .addClass('max_guest');
        const guestImageDiv = $(document.createElement('div'))
          .addClass('guest_image');
        const maxGuestP = $(document.createElement('div'))
		  .text(`${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}`);
        maxGuestDiv.append(guestImageDiv);
        maxGuestDiv.append(maxGuestP);
        informationDiv.append(maxGuestDiv);

        const numberRoomsDiv = $(document.createElement('div'))
          .addClass('number_rooms');
        const bedImageDiv = $(document.createElement('div'))
          .addClass('bed_image');
        const numberRoomsP = $(document.createElement('div'))
          .text(`${place.number_rooms} Room${place.number_rooms !== 1 ? 's' : ''}`);
        numberRoomsDiv.append(bedImageDiv);
        numberRoomsDiv.append(numberRoomsP);
        informationDiv.append(numberRoomsDiv);

        const numberBathroomsDiv = $(document.createElement('div'))
          .addClass('number_bathrooms');
        const bathImageDiv = $(document.createElement('div'))
          .addClass('bath_image');
        const numberBathroomsP = $(document.createElement('div'))
          .text(`${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}`);
        numberBathroomsDiv.append(bathImageDiv);
        numberBathroomsDiv.append(numberBathroomsP);
        informationDiv.append(numberBathroomsDiv);

        article.append(informationDiv);

        const userId = place.user_id;
        $.ajax({
          url: `http://127.0.0.1:5001/api/v1/users/${userId}`,
          type: 'GET',
          dataType: 'json'
        })
          .done(function (data) {
            const userDiv = $(document.createElement('div'))
              .addClass('user');
            const content = `<b>Owner: </b>${data.first_name} ${data.last_name}`;
            const ownerP = $(document.createElement('p'))
              .html(content);
            userDiv.append(ownerP);

            informationDiv.after(userDiv);
          });

        const descriptionDiv = $(document.createElement('div'))
          .addClass('description');
        const descriptionP = $(document.createElement('p'))
          .html(place.description);
        descriptionDiv.append(descriptionP);

        article.append(descriptionDiv);

        $('section.places').append(article);
    });
  });
});
