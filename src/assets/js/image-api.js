;(function ($) {
  'use strict'
  
  var BASE_URL = '/images'
  
  /**
   * Images API
   */
  var Image = {
    all: function () {
      return $.get(BASE_URL)
    },
    save: function (image) {}
  }
  
  // exposing Image to global scope
  window.API = window.API || {}
  window.API.Image = Image
})(jQuery)