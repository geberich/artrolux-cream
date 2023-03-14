document.addEventListener("DOMContentLoaded", function () {

    // GSAP
    gsap.registerPlugin(ScrollTrigger);

    // CHANGE DOM
    window.addEventListener('resize', changeDOM);
    function changeDOM() {
        if (window.matchMedia("(min-width: 768px)").matches) {
            document.querySelector('.section-five .five-main-text').prepend(document.querySelector('.section-five .five-title'))
        } else {
            document.querySelector('.section-five .five-text').prepend(document.querySelector('.section-five .five-title'))
        }
        if (window.matchMedia("(min-width: 1200px)").matches) {
            document.querySelector('.order-form .order-form-content').prepend(document.querySelector('.order-form .order-form-title-content'))
        } else {
            document.querySelector('.order-form .form-container').prepend(document.querySelector('.order-form .order-form-title-content'))
        }
    }
    changeDOM();

    // MENU
    document.querySelector('.header .hamburger').addEventListener('click', activateMenu);
    document.querySelector('.header .close-menu').addEventListener('click', deactivateMenu);
    document.querySelectorAll('.header .menu-content a').forEach(link => {
        link.addEventListener('click', deactivateMenu);
    });
    function activateMenu() {
        if (this.classList.contains('is-active')) {
            this.classList.remove('is-active');
            document.querySelector('.header').classList.remove('header-active');
        } else {
            this.classList.add('is-active');
            document.querySelector('.header').classList.add('header-active');
        }
    }
    function deactivateMenu() {
        document.querySelector('.header .hamburger').classList.remove('is-active');
        document.querySelector('.header').classList.remove('header-active');
    }

    // POPUP
    function showPopup() {
        document.querySelector(".popup-modal").style.display = "block";
        document.querySelector(".popup-modal .popup-close").addEventListener("click", () => { document.querySelector(".popup-modal").style.display = "none" });

        document.querySelectorAll('.popup .popup-btn-buy').forEach(item => {
            item.addEventListener('click', (e) => {
                document.querySelector(".popup-modal").style.display = "none";
            });
        });
    };
    // INVOKE POPUP
    setTimeout(() => {
        showPopup();
    }, 5000);

    // COMPONENTS POPUP
    document.querySelectorAll('.section-five .five-image-btn').forEach(button => {
        button.addEventListener('click', showComponent);
    });
    function showComponent() {
        let title = this.dataset.componentTitle;
        let content = this.dataset.componentContent;

        document.querySelector('.section-five .component-content h5').textContent = title;
        document.querySelector('.section-five .component-content p').textContent = content;
        document.querySelector('.section-five .component-content').classList.add('component-content-active');
    }
    document.querySelector('.section-five .component-content .close-popup').addEventListener('click', () => {
        document.querySelector('.section-five .component-content').classList.remove('component-content-active');
    });

    // SLIDERS
    var breakpoint = window.matchMedia('(min-width:1200px)');
    var mySwiper;
    function breakpointChecker() {
        if (breakpoint.matches === true) {
            if (mySwiper !== undefined) {
                mySwiper.destroy(true, true);
            }
            return;
        } else if (breakpoint.matches === false) {
            return enableSwiper();
        }
    }

    var enableSwiper = function () {
        mySwiper = new Swiper('.swiper-container', {
            slidesPerView: 'auto',
            slidesPerGroup: 1,
            spaceBetween: 20,
        });
    };

    breakpoint.addListener(breakpointChecker);
    breakpointChecker();

    // Comment SLIDER
    var mySwiper = new Swiper('.section-eight .swiper-container', {
        spaceBetween: 30,
        grabCursor: true,
        loop: true,
        pagination: {
            el: '.section-eight .swiper-pagination',
        },
        navigation: {
            nextEl: '.section-eight .swiper-btn-next',
        },

    });

    // TIME REMAIN
    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date());
        let seconds = Math.floor((t / 1000) % 60);
        let minutes = Math.floor((t / 1000 / 60) % 60);
        let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        let days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    function initializeClock(id, endtime) {

        function updateClock() {
            var t = getTimeRemaining(endtime);

            if (t.total <= 0) {
                clearInterval(timeinterval);
                var deadline = new Date(Date.parse(new Date()) + 13500 * 1000);
                initializeClock('clockdiv', deadline);
            }

            let clock = document.querySelectorAll('.time-remain').forEach(item => {
                item.querySelector(".hour").innerHTML = ("0" + t.hours).slice(-2);
                item.querySelector(".minutes").innerHTML = ("0" + t.minutes).slice(-2);
                item.querySelector(".seconds").innerHTML = ("0" + t.seconds).slice(-2);
            });
        }
        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
    }
    var deadline = new Date(Date.parse(new Date()) + 13500 * 1000);
    initializeClock("clockdiv", deadline);

    // COPYRIGHT YEAR
    document.querySelector('.copyright-year').textContent = new Date().getFullYear();

    // ANIMATION
    // SECTION ONE
    gsap.from('.section-one .white-top-image', {
        scrollTrigger: {
            trigger: '.section-one .white-top-image',
            start: "top 80%",
        },
        opacity: 0,
        scale: 0
    });
    let one_tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.one-white-bottom',
            start: "top 80%",
        }
    });
    one_tl.from('.section-one .white-item:nth-child(1)', {
        opacity: 0,
        yPercent: 100
    }).from('.section-one .white-item:nth-child(2)', {
        opacity: 0,
        yPercent: 100
    }, '=-0.25').from('.section-one .white-item:nth-child(3)', {
        opacity: 0,
        yPercent: 100
    }, '=-0.25');

    // SECTION TWO
    const two_tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.section-two',
            start: "top 80%",
        }
    });
    two_tl.from('.section-two .title', {
        opacity: 0,
        scale: 0
    }).from('.section-two .check:nth-child(1)', {
        opacity: 0,
        xPercent: 100
    }).from('.section-two .check:nth-child(2)', {
        opacity: 0,
        xPercent: 100
    }, '=-0.25').from('.section-two .check:nth-child(3)', {
        opacity: 0,
        xPercent: 100
    }, '=-0.25');

    // SECTION THREE
    gsap.from('.section-three .title', {
        scrollTrigger: {
            trigger: '.section-three',
            start: "top 80%",
        },
        opacity: 0,
        scale: 0
    });

    // SECTION FOUR
    const four_tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.section-four',
            start: "top 80%",
        }
    });
    four_tl.from('.section-four .four-title', {
        opacity: 0,
        scale: 0
    }).from('.section-four .four-text p', {
        opacity: 0,
        xPercent: 100,
        stagger: 0.25,
    });

    gsap.from('.section-four .four-bottom .white-item', {
        scrollTrigger: {
            trigger: '.section-four .four-bottom',
            start: "top 80%",
        },
        opacity: 0,
        yPercent: 100,
        stagger: 0.25,
    });

    // SECTION FIVE
    const five_tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.section-five',
            start: "top 80%",
        }
    });
    five_tl.from('.section-five .five-title', {
        opacity: 0,
        scale: 0
    }).from('.section-five .five-main-text p', {
        opacity: 0,
        xPercent: 100,
        stagger: 0.25,
    }).from('.section-five .five-main-text .five-btn', {
        opacity: 0,
        xPercent: 100,
        stagger: 0.25,
    });

    // SECTION SIX
    const six_tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.section-six',
            start: "top 80%",
        }
    });
    six_tl.from('.section-six .section-six-title', {
        opacity: 0,
        scale: 0
    }).from('.section-six .section-six-card', {
        opacity: 0,
        yPercent: 100,
        stagger: 0.25,
    });

    // SECTION SEVEN
    gsap.from('.section-seven .title', {
        scrollTrigger: {
            trigger: '.section-seven',
            start: "top 80%",
        },
        opacity: 0,
        scale: 0
    });

    // SECTION EIGHT
    gsap.from('.section-eight .eight-title', {
        scrollTrigger: {
            trigger: '.section-eight',
            start: "top 80%",
        },
        opacity: 0,
        scale: 0
    });

    // SECTION NINE
    const nine_tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.section-nine',
            start: "top 80%",
        }
    });
    nine_tl.from('.section-nine .nine-title', {
        opacity: 0,
        scale: 0
    }).from('.section-nine .nine-card', {
        opacity: 0,
        yPercent: 100,
        stagger: 0.25,
    });

    // ORDER-FORM
    const orderform_tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.order-form',
            start: "top 80%",
        }
    });
    orderform_tl.from('.order-form .product-img', {
        opacity: 0,
        scale: 0
    }).from('.order-form .product-bg', {
        opacity: 0,
        scale: 0
    });



});

