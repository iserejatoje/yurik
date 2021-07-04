import Swiper from 'swiper'
import SwiperCore, { Navigation, Pagination } from 'swiper/core'
SwiperCore.use([Navigation, Pagination])

new Swiper('.team-slider', {
    spaceBetween: 30,
    speed: 500,
    navigation: {
        nextEl: '.team-next',
        prevEl: '.team-prev',
    },
    pagination: {
        el: '.team-pagination',
        clickable: true
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        900: {
            spaceBetween: 30,
            slidesPerView: 'auto'
        },
        1366: {
            spaceBetween: 30,
            slidesPerView: 'auto'
        }
    }
})

Element.prototype.hasClass = function(className) {
    return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
};

new Swiper('.work-slider', {
    on: {
        paginationUpdate: function (e, paginationEl) {
            const bullets = document.querySelectorAll('.work-pagination .swiper-pagination-bullet');
            const numbers = document.querySelectorAll('.work-number');
            for (let i = 0; i < bullets.length; i++) {
                if (bullets[i].hasClass('swiper-pagination-bullet-active')) {

                    for (let k = 0; k < numbers.length; k++) {
                        numbers[k].innerHTML = '0' + (i + 1);
                    }

                }
            }
        },
    },
    spaceBetween: 30,
    speed: 500,
    navigation: {
        nextEl: '.work-prev',
        prevEl: '.work-next',
    },
    pagination: {
        el: '.work-pagination',
        clickable: true
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        900: {
            spaceBetween: 30,
            slidesPerView: 'auto'
        },
        1366: {
            spaceBetween: 30,
            slidesPerView: 'auto'
        }
    }
})

new Swiper('.why-slider', {
    spaceBetween: 30,
    speed: 500,
    navigation: {
        nextEl: '.why-prev',
        prevEl: '.why-next',
    },
    pagination: {
        el: '.why-pagination',
        clickable: true
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        900: {
            spaceBetween: 30,
            slidesPerView: 'auto'
        },
        1366: {
            spaceBetween: 30,
            slidesPerView: 'auto'
        }
    }
})

new Swiper('.banks-slider', {
    spaceBetween: 30,
    speed: 500,
    navigation: {
        nextEl: '.banks-next',
        prevEl: '.banks-prev',
    },
    pagination: {
        el: '.banks-pagination',
        clickable: true
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        900: {
            spaceBetween: 30,
            slidesPerView: 'auto'
        },
        1366: {
            spaceBetween: 30,
            slidesPerView: 'auto'
        }
    }
})

const params = {
    paginationUpdate: function (e, paginationEl) {
        const bullets = document.querySelectorAll('.blog-pagination .swiper-pagination-bullet');
        document.querySelector('.swiper-pages').innerHTML = '';
        for (let i = 0; i < bullets.length; i++) {
            document.querySelector('.swiper-pages').innerHTML += '<button class="slider-button">' + (i + 1) + '</button>';
        }

        const blogPagination = document.body.querySelectorAll('.swiper-pages button')
        for (let i = 0; i < blogPagination.length; i++) {
            blogPagination[i].addEventListener('click', function (event) {
                const slider = document.querySelector('.blog-slider').swiper
                const index = [...event.target.parentElement.children].indexOf(event.target)
                slider.slideTo(index)
                event.preventDefault()
            })
        }

    }
}

new Swiper('.blog-slider', {
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 20,
            slidesPerColumn: 1,
        },
        1024: {
            slidesPerView: 2,
            slidesPerColumn: 2,
            spaceBetween: 30,
        },
        1366: {
            slidesPerView: 3,
            slidesPerColumn: 2,
            spaceBetween: 30,
        }
    },
    pagination: {
        el: '.blog-slider .swiper-pagination',
        clickable: true,
    },
    slidesPerColumnFill: 'row',
    navigation: {
        nextEl: '.blog-next',
        prevEl: '.blog-prev',
    },
    on: params
})
