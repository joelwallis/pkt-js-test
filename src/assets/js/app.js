;(function ($) {
  'use strict'
  /* global API */
  
  var $canvas = $('.canvas .block')
  var $imageList = $('.image ul')
  
  $(function () {
    populateImageList()
    
    /**
     * Helper function that populates the image list on the sidebar
     */
    function populateImageList () {
      return API.Image.all()
        .then(function (images) {
          images
            .map(function (imgUrl) {
              return $(document.createElement('img'))
                .attr('src', imgUrl)
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
  })
})(jQuery)