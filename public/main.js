$(() => {
  console.log('Ready!')
  renderAllImages()

})

//Request all images and put it into the DOM
function renderAllImages() {
  $.get('/images')
    .done(images => {
      console.log('images: ', images);

      let $medias = images.map(image => {
        let $image = $('.template').clone();
        $image.removeClass('template hidden');
        $image.find('img').attr('src', image.url)
        $image.find('.title').text(image.title);
        $image.find('.description').text(image.description)
        $image.find('.createdAt').text(moment(image.createdAt).format('LLL'))
        $image.data('id', image.id)
        return $image;
      });

      $('.images').append($medias)
    })
    .fail(err => {
      console.log('err: ', err);
    });
}