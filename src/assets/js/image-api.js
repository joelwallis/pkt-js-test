;(function ($) {
  'use strict'
  
  /**
   * Images API
   */
  var Image = {
    all: function () {
      return $.get('/images')
    },
    save: function () {
      return jQuery.ajax('/uploads', {
        type: 'POST',
        contentType: false,
        processData: false,
        data: new FormData(document.getElementById('image-form'))
      })
    }
  }
  
  // exposing Image to global scope
  window.API = window.API || {}
  window.API.Image = Image
})(jQuery)