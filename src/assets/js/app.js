;(function ($) {
  'use strict'
  /* global API */
  // the comment above declares the variable `API` as global to ESLint
  
  var $canvas = $('.canvas .block')
  var $uploadBtn = $('#submit')
  var $addText = $('#addText')
  var $imageList = $('.image ul')
  var closeBtnTpl = '<span class="glyphicon glyphicon-remove"></span>'
  
  // Bootstrap the app
  $(function () {
    $uploadBtn.click(function (ev) {
      ev.preventDefault()
      saveImage()
    })
    $addText.click(addTextToCanvasCallback)
    populateImageList()
    
    /**
     * Sends the given image file to the server
     */
    function saveImage () {
      return API.Image.save()
        .then(populateImageList)
    }
    
    /**
     * Helper function that populates the image list on the sidebar
     */
    function populateImageList () {
      $imageList.html('')
      
      return API.Image.all()
        .then(function (images) {
          images
            .map(function (imgUrl) {
              return $(document.createElement('img'))
                .attr('src', imgUrl)
                .click(addImageToCanvasCallback)
            })
            .map(function (image) {
              return $(document.createElement('li'))
                .append(image)
            })
            .forEach(function (el) {
              $imageList.append(el)
            })
        })
    }
    
    /**
     * Adds a given text to the HTML canvas (the `<div>` element)
     */
    function addTextToCanvas (text) {
      var tpl = '<div class="canvas-item">@contents @close-btn</div>'
        .replace('@contents', '<p>@text</p>')
        .replace('@close-btn', closeBtnTpl)
        .replace('@text', text)
      var el = $(tpl)
      
      $('.glyphicon', el).click(function (ev) {
        $(ev.currentTarget).parent().remove()
      })
      
      return el
        .appendTo($canvas)
        .draggable()
    }
    
    /**
     * Helper to be used as click callack on the Add Text button of the sidebar
     */
    function addTextToCanvasCallback (ev) {
      var text = window.prompt('Enter the text to be added to the canvas:')
      addTextToCanvas(text)
    }
    
    /**
     * Adds a given image to the HTML canvas (the `<div>` element)
     */
    function addImageToCanvas (imgUrl) {
      var tpl = '<div class="canvas-item">@img @close-btn</div>'
        .replace('@img', '<img src="@img-url">')
        .replace('@close-btn', closeBtnTpl)
        .replace('@img-url', imgUrl)
      var el = $(tpl)
      
      $('.glyphicon', el).click(function (ev) {
        $(ev.currentTarget).parent().remove()
      })
      
      return el
        .appendTo($canvas)
        .draggable()
    }
    
    /**
     * Helper to be used as click callack on image elements of the sidebar
     */
    function addImageToCanvasCallback (ev) {
      return addImageToCanvas($(ev.currentTarget).attr('src'))
    }
  })
})(jQuery)