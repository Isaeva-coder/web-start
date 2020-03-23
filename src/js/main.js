$(document).ready(function() {
  var modal = $(".modal"),
    modalBtn = $("[data-toggle=modal]"),
    closeBtn = $(".modal__close");
  thanks = $(".thanks");
  closeBtnThanks = $(".thanks__close");

  modalBtn.on("click", function() {
    modal.toggleClass("modal--visible");
  });
  closeBtn.on("click", function() {
    modal.toggleClass("modal--visible");
  });
  modal.on("click", function(event) {
    if ($(event.target).is("modal__dialog")) event.stopPropagation();
    else if ($(event.target).is(".modal")) modal.toggleClass("modal--visible");
  });
  $(document).on("keydown", function(event) {
    if (event.keyCode === 27 && $(".modal").hasClass("modal--visible"))
      modal.toggleClass("modal--visible");
  });
  // Закрытие окна благодарности
  closeBtnThanks.on("click", function() {
    thanks.removeClass("thanks--visible");
  });
  thanks.on("click", function(event) {
    if ($(event.target).is("thanks__dialog")) event.stopPropagation();
    else if ($(event.target).is(".thanks"))
      thanks.removeClass("thanks--visible");
  });
  $(document).on("keydown", function(event) {
    if (event.keyCode === 27 && $(".thanks").hasClass("thanks--visible"))
      thanks.removeClass("thanks--visible");
  });

  $(document).scroll(function() {
    if ($(this).scrollTop() >= 30 && $(window).width() >= 760) {
      if ($(".button-up").is(":hidden")) {
        $(".button-up")
          .css({ opacity: 1 })
          .fadeIn("slow");
      }
    } else {
      $(".button-up")
        .stop(true, false)
        .fadeOut("fast");
    }
  });
  $(".button-up").click(function() {
    $("html, body")
      .stop()
      .animate({ scrollTop: 0 }, 1300);
  });

  $(".nav").on("click", "a", function(e) {
    e.preventDefault();
    var id = $(this).attr("href"),
      idTop = $(id).offset().top;
    $("body, html").animate({ scrollTop: idTop }, 1300);
  });
  $(".logo").on("click", "a", function(e) {
    $("body, html").animate({ scrollTop: 0 }, 1300);
  });

  var mySwiper = new Swiper(".projects-swiper", {
    loop: true,
    pagination: {
      el: ".projects-pagination",
      type: "bullets"
    },
    navigation: {
      nextEl: ".projects-swiper-button-next",
      prevEl: ".projects-swiper-button-prev"
    }
  });

  var next = $(".projects-swiper-button-next");
  var prev = $(".projects-swiper-button-prev");
  var bullets = $(".projects-pagination");

  var mql = window.matchMedia("all and (max-width: 570px)");
  if (mql.matches) {
    $(".swiper-slide__img").each(function() {
      $(this).attr("src", "img/project/project-mobile.jpg");
    });
  } else {
    $(".swiper-slide__img").each(function() {
      $(this).attr("src", "img/project/project.jpg");
    });
  }

  var positionPrev = prev.position();

  bullets.css("left", positionPrev.left + prev.width() + 20);
  next.css(
    "left",
    positionPrev.left + prev.width() + 20 + bullets.width() + 20
  );

  new WOW().init();

  // Валидация формы
  $(".modal__form").validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      // строчное правило
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhone: {
        required: true,
        minlength: 17
      },
      // правило-объект (блок)
      userEmail: {
        required: true,
        email: true
      },
      policyCheckbox: "required"
    }, // сообщения
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Имя не должно быть короче двух букв",
        maxlength: "Имя не должно быть больше 15 букв"
      },
      userPhone: {
        required: "Заполните поле",
        minlength: "Номер не может быть короче 11 цифр"
      },
      userEmail: {
        required: "Заполните поле",
        email: "Введите в формате: name@domain.com"
      },
      policyCheckbox: "Обязательное поле"
    },

    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function(response) {
          $(".thanks").addClass("thanks--visible");
          $(form)[0].reset();
          if ($(".thanks").hasClass("thanks--visible")) {
            modal.removeClass("modal--visible");
          }
        }
      });
    }
  });
  $(".footer__form").validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      // строчное правило
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhone: {
        required: true,
        minlength: 17
      },
      // правило-объект (блок)
      userQuestion: {
        required: true
      },
      policyCheckbox: "required"
    }, // сообщения
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Имя не должно быть короче двух букв",
        maxlength: "Имя не должно быть больше 15 букв"
      },
      userPhone: {
        required: "Заполните поле",
        minlength: "Номер не может быть короче 11 цифр"
      },
      userQuestion: {
        required: "Заполните поле"
      },
      policyCheckbox: "Обязательное поле"
    },
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function(response) {
          $(".thanks").addClass("thanks--visible");
          $(form)[0].reset();
          if ($(".thanks").hasClass("thanks--visible")) {
            modal.removeClass("modal--visible");
          }
        }
      });
    }
  });
  $(".control__form").validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      // строчное правило
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhone: {
        required: true,
        minlength: 17
      },
      policyCheckbox: "required"
    }, // сообщения
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Имя не должно быть короче двух букв",
        maxlength: "Имя не должно быть больше 15 букв"
      },
      userPhone: {
        required: "Заполните поле",
        minlength: "Номер не может быть короче 11 цифр"
      },
      policyCheckbox: "Обязательное поле"
    },
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function(response) {
          $(".thanks").addClass("thanks--visible");
          $(form)[0].reset();
          if ($(".thanks").hasClass("thanks--visible")) {
            modal.removeClass("modal--visible");
          }
        }
      });
    }
  });

  // маска для номера телефона

  $("[type=tel]").mask("+7(000) 000-00-00", {
    placeholder: "+7 (___) ___-__-__"
  });

  // создание yandex карты
  ymaps.ready(function() {
    var myMap = new ymaps.Map(
        "map",
        {
          center: [47.244729, 39.723187],
          zoom: 13
        },
        {
          searchControlProvider: "yandex#search"
        }
      ),
      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; width: 100%; height: 100%; font-weight: bold;">$[properties.iconContent]</div>'
      ),
      myPlacemark = new ymaps.Placemark(
        myMap.getCenter(),
        {
          hintContent: "Наш офис",
          balloonContent: "Турецкий ремонт квартир"
        },
        {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: "default#image",
          // Своё изображение иконки метки.
          iconImageHref: "img/location.png",
          // Размеры метки.
          iconImageSize: [32, 32],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-5, -38]
        }
      );

    myMap.behaviors.disable("scrollZoom");
    myMap.geoObjects.add(myPlacemark);
  });
});
