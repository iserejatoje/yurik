import Swiper from 'swiper'
import SwiperCore, { Navigation, Pagination } from 'swiper/core'
SwiperCore.use([Navigation, Pagination])

const teamSlider = new Swiper('.team-slider', {
    spaceBetween: 30,
    speed: 500,
    // preloadImages: false,
    // watchSlidesVisibility: true,
    // lazy: true,
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
