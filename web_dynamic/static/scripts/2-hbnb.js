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
  url = 'http://0.0.0.0:5001/api/v1/status/';
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
});
