var Evasion = {
  els: {
    window: null,
    headerBg: null,
    logo: null,
    fotorama: null,
    carousel: null,
    parallax: null,
    login: null
  },

  values: {
    windowHeight: null
  },

  initElements: function () {
    this.els.window = $(window);
    this.els.headerBg = $('.js-header-bg');
    this.els.logo = $('.js-logo');
    this.els.fotorama = $('.fotorama');
    this.els.carousel = $('.js-carousel');
    this.els.parallax = $('.parallax-box');
    this.els.login = $('.js-login');

    return this;
  },

  initValues: function () {
    this.values.windowHeight = this.els.window.height();

    return this;
  },

  initialize: function () {
    this.initElements();
    this.initValues();
    this.loadPlugins();

    this.onLandingLoaded();
    this.loadEvents();

    return this;
  },

  loadPlugins: function () {
    this.loadParallax();
    this.animateModal();
  },

  loadEvents: function () {
    this.onWindowScroll();
    this.onFotoramaLoad();
    this.onLogoClick();
  },

  onLandingLoaded: function () {
    this.hideHeaderBg();
    this.setCarouselHeight();
  },

  onLogoClick: function () {
    this.els.logo.on('click', function () {
      $.smoothScroll({
        speed: 800
      });
      return false;
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
      self.els.carousel.css({'height': 'auto'});
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

  loadParallax: function () {
    this.els.parallax.parallax({imageSrc: 'img/earth-bg.png'});
  },

  animateModal: function () {
    this.els.login.animatedModal();
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