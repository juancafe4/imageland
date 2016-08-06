$(() => {
  console.log('Ready!')
  renderAllImages()
  $('.images').on('click', '.edit', openEditModal)
  $('#myEditModal').find('form').on('submit', ".edit", saveEdit)
})

fucntion saveEdit(e) {
  event.preventDefault()
  let $editModal = $('#myEditModal')

  let id = $editModal.data('editingId')
    //Getting info for the modal
  let title =  $editModal.find('.title').text()
  let description = $editModal.find('.description').text()
  let imageURL = $editModal.find('img').attr('src') 

  $.ajax( {
    url: `/image/${id}`,
    method: 'PUT',
    data: {url, title, description}
  })
  .done(newImage => {
    console.log('newImage: ', newImage)
    renderAllImages()
  })
  .fail(err => {
    console.log('err: ', err)
  })
  .always(() => {
    $editModal.modal('hide')
  })
}
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

      $('.images').empty().append($medias)
    })
    .fail(err => {
      console.log('err: ', err);

    });
}

function openEditModal(event) {
  let $editButton = $(event.target)
  let $myEditModal = $editButton.closest('.media')
  let $media = $myEditModal.closest()
  //Getting info for the modal
  let title =  $media.find('.title').text()
  let description = $media.find('.description').text()
  let imageURL = $media.find('img').attr('src')
  let id = $('.media').data('id')
  console.log('event.target', event.target)
  
  $myEditModal.data("editingId", id)
  $('#myEditModal').modal( {
    keyboard: false,
    backdrop: 'static'
  });
}