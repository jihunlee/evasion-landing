var Evasion = {
  els: {
    window: null,
    headerBg: null,
    logo: null,
    fotorama: null,
    carousel: null,
    parallax: null,
    loginBtn: null,
    loginPopup: null,
    closePopup: null
  },

  values: {
    windowHeight: null,
    ESC_KEYCODE: 27
  },

  inViewIds: [
    'aboutSection', 'recommendSection', 'eventSection', 'membersSection',  'footerSection', 'loginForm'
  ],

  initElements: function () {
    this.els.window = $(window);
    this.els.headerBg = $('.js-header-bg');
    this.els.logo = $('.js-logo');
    this.els.fotorama = $('.fotorama');
    this.els.carousel = $('.js-carousel');
    this.els.parallax = $('.parallax-box');
    this.els.loginBtn = $('.js-login-btn');
    this.els.popup = $('.js-popup');
    this.els.closePopup = $('.js-close-popup');
  },

  initValues: function () {
    this.values.windowHeight = this.els.window.height();
  },

  initInView: function() {
    var self = this;
    for(var i in this.inViewIds) {
      (function() {
        var id = self.inViewIds[i];
        $('#' + id).one('inview', function() {
          console.log('inview.' + id);
          ga('send', 'event', '/', 'displayed', id);
        });
      })();
    }
  },


  initialize: function () {
    this.initElements();
    this.initValues();
    this.initInView();

    this.loadParallax();
    this.onLandingLoaded();

    this.loadEvents();
  },

  loadEvents: function () {
    this.onWindowScroll();
    this.onFotoramaLoad();
    this.onLogoClick();
    this.onLoginClick();
  },

  onLandingLoaded: function () {
    this.hideHeaderBg();
    this.setCarouselHeight();
  },

  onLogoClick: function () {
    this.els.logo.on('click', function () {
      $.smoothScroll({
        speed: 500
      });
      return false;
    });
  },

  onLoginClick: function () {
    var self = this;

    this.els.loginBtn.on('click', function (e) {
      e.preventDefault();
      self.els.popup.show().css({'z-index': '9999'});
      self.loadPopupEvents();
      if(this.href != '#') {
        self.els.popup.find('input[name=url]').val(this.href);
      }
    })
  },

  loadPopupEvents: function () {
    var self = this;

    this.els.closePopup.on('click', function () {
      self.closePopup();
    });

    this.els.window.keyup(function (e) {
      if(e.keyCode == self.values.ESC_KEYCODE){
        self.closePopup();
      }
    });
  },

  onWindowScroll: function () {
    var self = this;

    this.els.window.scroll(function () {
      if ($(this).scrollTop() > 100) {
        self.els.headerBg.fadeIn();
      } else {
        self.els.headerBg.fadeOut();
      }
    })
  },

  onFotoramaLoad: function () {
    var self = this;
    this.els.fotorama.on('fotorama:load', function () {
      self.els.carousel.css({'height': '895px'});
    });

    this.els.fotorama.fotorama({
      width: '100%',
      transition: 'crossfade',
      loop: true,
      keyboard: true,
      spinner: {
        lines: 10,
        length: 10,
        radius: 15,
        color: '#fff'
      }
    });
  },

  closePopup: function () {
    this.els.popup.hide();
  },

  loadParallax: function () {
    this.els.parallax.parallax();
  },

  hideHeaderBg: function () {
    this.els.headerBg.hide();
  },

  setCarouselHeight: function () {
    this.els.carousel.css({'height': this.values.windowHeight});
  }
};

$(function () {
  Evasion.initialize();
});