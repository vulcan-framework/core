(function ($, global) {

  var ThemePicker = function (conf) {
    this.conf = $.extend({
      // Fetch conf

      // Classes
      container: 'sassdoc-theme-preview',

      // Extra options
      init: true
    }, conf || {});

    if (this.conf.init !== false) {
      this.initialize();
    }
  };

  ThemePicker.prototype.initialize = function () {
    this.bindUI();
    this.select();
  };

  ThemePicker.prototype.select = function (a) {
    var b=document,c;a="undefined"===typeof a[0]?a:a[0];try{a.select();try{"undefined"===typeof a.dataset.mouseup&&(a.dataset.mouseup="true",a.addEventListener("mouseup",function(a){a.preventDefault()},!1))}catch(d){}}catch(e){window.getSelection?(c=window.getSelection(),b=b.createRange(),b.selectNodeContents(a),c.removeAllRanges(),c.addRange(b)):b.body.createTextRange&&(b=b.body.createTextRange(),b.moveToElementText(a),b.select())}
  };

  ThemePicker.prototype.bindUI = function () {
    var _self = this;
    var $frame            = $('.theme-preview__frame');
    var $fullscreenButton = $('.theme-preview__fullscreen-button');
    var $fullscreenClose  = $('.theme-preview__fullscreen-close');
    var $item             = $('.theme-picker__item');
    var $container        = $('.' + this.conf.container);
    var inactiveClass     = this.conf.container + '--empty';
    var $selectedItem;

    $item.on('click', function (event) {
      $selectedItem = $(event.target).closest('[data-theme-name]');

      $container.removeClass(inactiveClass);
      $item.removeClass('active');
      $selectedItem.addClass('active');

      $('[data-inject-theme-name]').html($selectedItem.data('theme-name'));
      $frame.attr('src', 'preview/' + $selectedItem.data('theme-name'));
    });

    $fullscreenButton.on('click', function () {
      $frame.addClass('theme-preview__frame--fullscreen');
    });

    $fullscreenClose.on('click', function () {
      $frame.removeClass('theme-preview__frame--fullscreen');
    });

    $('.theme-code .highlight').on('click', function () {
      _self.select(this);
    });
  };

  global.ThemePicker = ThemePicker;

}(window.jQuery, window));
