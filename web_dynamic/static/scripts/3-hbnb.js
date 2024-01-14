$(document).ready(function () {
  const obj = {};
  $('input').on('click', function () {
    if ($(this).is(':checked')) {
      obj[($(this).attr('data-id'))] = ($(this).attr('data-name'));
    } else {
      delete obj[($(this).attr('data-id'))];
    }
    console.log(obj);
    $('div.amenities h4').text(Object.values(obj));
  });
  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.getJSON(url,
    function (data, textStatus, jqXHR) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
        console.log('OK');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  );
  const url_place = 'http://0.0.0.0:5001/api/v1/places_search/';
  const data = {};
  $.post({
    url: url_place,
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function (response) {
      console.log('response', response);
      response.forEach(element => {
        let bedroom, Bathroom, Guest;
        if (element.number_rooms > 1) {
          bedroom = ' Bedrooms';
        } else {
          bedroom = ' Bedroom';
        }
        if (element.number_bathrooms > 1) {
          Bathroom = ' Bathrooms';
        } else {
          Bathroom = ' Bathroom';
        }
        if (element.max_guest > 1) {
          Guest = ' Guests';
        } else {
          Guest = ' Guest';
        }
        const htmlString = `
        <article>
          <div class="title_box">
            <h2>${element.name}</h2>
            <div class="price_by_night"> $${element.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${element.max_guest} ${Guest}</div>
            <div class="number_rooms">${element.number_rooms} ${bedroom}</div>
            <div class="number_bathrooms">${element.number_bathrooms} ${Bathroom}</div>
          </div>
          <div class="description">
            ${element.description}
          </div>
        </article>`;

        $('section.places').append(htmlString);
      });
    },
    error: function (error) {
      console.error('error', error);
    }
  }, data);
});
