try {
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
    $(".nav__item, .hero__scroll-down").on("click", function(e) {
      e.preventDefault();
      var id = $(this).attr("href"),
        idTop = $(id).offset().top;
      $("body, html").animate({ scrollTop: idTop }, 1300);
    });
    $("#team-link").on("click", function(e) {
      e.preventDefault();
      var idTeam = $(this).attr("href"),
        idTeamTop = $(idTeam).offset().top;
      idTeamTopBack = idTeamTop + 70;
      $("body, html").animate({ scrollTop: idTeamTopBack }, 500);
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
  
    $(window).resize(function() {
      if ($(window).width() <= 570) {
        $(".swiper-slide__img").each(function() {
          $(this).attr("src", "img/project/project-mobile.jpg");
        });
      } else {
        $(".swiper-slide__img").each(function() {
          $(this).attr("src", "img/project/project.jpg");
        });
      }
    });
  
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
  
    // new WOW().init();
  
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
            ym(61243786, "reachGoal", "submitForm");
            return true;
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
            ym(61243786, "reachGoal", "submitForm");
            return true;
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
            ym(61243786, "reachGoal", "submitForm");
            return true;
          }
        });
      }
    });
  
    // маска для номера телефона
    $('[type=tel]').mask('+7(000) 000-00-00');
  
    // создание yandex карты
  
    YaMapsShown = false;
    $(document).ready(function() {
      $(window).scroll(function() {
        if (!YaMapsShown) {
          if (
            $(window).scrollTop() + $(window).height() >
            $(document).height() - 700
          ) {
            showYaMaps();
            YaMapsShown = true;
          }
        }
      });
    });
    function showYaMaps() {
      var script = document.createElement("script");
      script.src =
        "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Aadaefd3a68216182e1677916ac13b4dc233d108d3d83352f784fe6ff083004cb&amp;width=100%25&amp;height=100%&amp;lang=ru_RU&amp;scroll=false";
      document.getElementById("map").appendChild(script);
    }
  
    // создание видео
    var player;
    $(".video__play").on("click", function onYouTubeIframeAPIReady() {
      player = new YT.Player("player", {
        height: "341",
        width: "100%",
        videoId: "38zznVtI5FA",
        events: {
          onReady: videoPlay
        }
      });
    });
  
    function videoPlay(event) {
      event.target.playVideo();
    }
  });
} catch (error) {
  console.debug('error', error);
}

