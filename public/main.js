$(() => {
  console.log('Ready!')
  renderAllImages()
  $('.images').on('click', '.edit', openEditModal)
  $('#editModal').find('form').submit(saveEdit)
  $('.images').on('click', '.delete', openDeleteModal)
  $('.deleteButton').click(deleteImage)
})

function saveEdit(e) {
  event.preventDefault()

  let $editModal = $('#editModal')

  let id = $editModal.data('editingId')
    //Getting info for the modal
    let title =  $editModal.find('.title').val()
    let description = $editModal.find('.description').val()
    let url = $editModal.find('.url').val()

    $.ajax( {
      url: `/images/${id}`,
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
  //querying for the elements
  let $editButton = $(event.target)
  let $editModal = $('#editModal');
  let $media = $editButton.closest('.media')
  //Getting info for the modal
  let title =  $media.find('.title').text()
  let description = $media.find('.description').text()
  let imageURL = $media.find('img').attr('src')
  let id = $('.media').data('id')

  //console.log('event.target', event.target)
  
  $editModal.data("editingId", id)
  $editModal.find('.url').val(imageURL);
  $editModal.find('.title').val(title);
  $editModal.find('.description').val(description);
  $('#editModal').modal( {
    keyboard: false,
    backdrop: 'static'
  });
}


function openDeleteModal(event) {

  let $deleteButton = $(event.target)
  let $deleteModal = $('#deletetModal');

  let $media = $deleteButton.closest('.media')

  let id = $media.data('id')

  $deleteModal.data('deleteId', id);

  $('#deletetModal').modal( {
    keyboard: false,
    backdrop: 'static'
  });
}

function deleteImage(event) {
  let $deleteModal = $('#deletetModal')
  let id = $deleteModal.data('deleteId')
  
  $.ajax( {
      url: `/images/${id}`,
      method: 'DELETE'
    })
    .done(() => {
      console.log('Succes deleting')
      renderAllImages()
    })
    .fail(err => {
      console.log("Error deleting")
    })
    .always(() => {
      $deleteModal.modal('hide')
    })
}
