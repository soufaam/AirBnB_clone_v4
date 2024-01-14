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
});
