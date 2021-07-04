import {initMap} from './map'
import IMask from 'imask'
import Swiper from "swiper";
import SwiperCore, {Navigation, Pagination} from 'swiper/core'

SwiperCore.use([Navigation, Pagination])

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

const trainDistance = 190
const phoneMask = document.querySelectorAll('[type="tel"]')
phoneMask.forEach(element => IMask(element, {
    mask: '+{7} (000) 000-00-00'
}))

function initTrainEvent() {
    if (window.scrollY > trainDistance) {
        document.querySelector('.train').classList.add('fade-in')
    } else {
        document.querySelector('.train').classList.remove('fade-in')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initTrainEvent()
    initMap()
})

const train = document.querySelector('.train')
train.addEventListener('click', event => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})

function filterBlogSlider(filterName) {
    console.info('Blog filter:', filterName)

    if (filterName) {
        const blogSiblingsSlides = document.querySelectorAll('.blog-slider .blog-slide:not([data-filter="' + filterName + '"])')
        for (let i = 0; i < blogSiblingsSlides.length; i++) {
            blogSiblingsSlides[i].classList.add('non-swiper-slide')
            blogSiblingsSlides[i].classList.remove('swiper-slide')
        }
        const blogSlides = document.querySelectorAll('.blog-slider .blog-slide[data-filter="' + filterName + '"]')
        for (let i = 0; i < blogSlides.length; i++) {
            blogSlides[i].classList.add('swiper-slide')
            blogSlides[i].classList.remove('non-swiper-slide')
        }
    } else {
        const blogSlides = document.querySelectorAll('.blog-slider .blog-slide')
        for (let i = 0; i < blogSlides.length; i++) {
            blogSlides[i].classList.add('swiper-slide')
            blogSlides[i].classList.remove('non-swiper-slide')
        }
    }

    const slider = document.querySelector('.blog-slider').swiper;
    slider.destroy(true, true)

    if (document.querySelectorAll('.blog-slider .swiper-slide').length > 3) {
        new Swiper('.blog-slider', {
            on: params,
            slidesPerView: 3,
            slidesPerColumn: 2,
            spaceBetween: 30,
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
                clickable: true
            },
            navigation: {
                nextEl: '.blog-next',
                prevEl: '.blog-prev',
            },
        });
    } else {
        new Swiper('.blog-slider', {
            on: params,
            slidesPerView: 3,
            spaceBetween: 30,
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
                clickable: true
            },
            navigation: {
                nextEl: '.blog-next',
                prevEl: '.blog-prev',
            },
        });
    }

}

const blogFilter = document.querySelectorAll('.filter a')
for (let i = 0; i < blogFilter.length; i++) {
    blogFilter[i].addEventListener('click', function (event) {
        Array.prototype.forEach.call(blogFilter, function (el, i) {
            el.classList.remove('active')
        })
        event.target.classList.add('active')

        filterBlogSlider(event.target.getAttribute('data-category'))

        event.preventDefault()
    })
}

const formInputs = document.querySelectorAll('.form-input input')
for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('focus', function (event) {
        event.target.parentNode.classList.add('active')
        event.preventDefault()
    })
    formInputs[i].addEventListener('blur', function (event) {
        console.log(event.target.value)
        if (event.target.value === '') {
            event.target.parentNode.classList.remove('active')
        }
        event.preventDefault()
    })
}

window.addEventListener('scroll', () => {
    initTrainEvent()
})
