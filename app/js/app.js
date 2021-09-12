import IMask from 'imask'
import Swiper from 'swiper'
import SwiperCore, {Navigation, Pagination} from 'swiper/core'
import * as $ from 'jquery'
import {initMap} from './map'

const params = {
    paginationUpdate: function (e, paginationEl) {
        const bullets = document.querySelectorAll('.blog-pagination .swiper-pagination-bullet');
        document.querySelector('.blog .swiper-pages').innerHTML = ''
        for (let i = 0; i < bullets.length; i++) {
            document.querySelector('.blog .swiper-pages').innerHTML += '<button class="slider-button">' + (i + 1) + '</button>';
        }

        const blogPagination = document.body.querySelectorAll('.blog .swiper-pages button')
        for (let i = 0; i < blogPagination.length; i++) {
            blogPagination[i].addEventListener('click', function (event) {
                const slider = document.querySelector('.blog-slider').swiper
                const index = [...event.target.parentElement.children].indexOf(event.target)
                slider.slideTo(index)
                event.preventDefault()
            })
        }

        const pages = document.querySelectorAll('.blog .slider-button')
        for (let i = 0; i < bullets.length; i++) {
            if (bullets[i].hasClass('swiper-pagination-bullet-active')) {
                pages[i].classList.add('active')
            }
        }
    }
}

const service_params = {
    paginationUpdate: function (e, paginationEl) {
        const bullets = document.querySelectorAll('section.services .swiper-pagination-bullet');
        document.querySelector('section.services .swiper-pages').innerHTML = '';
        for (let i = 0; i < bullets.length; i++) {
            document.querySelector('section.services .swiper-pages').innerHTML += '<button class="slider-button">' + (i + 1) + '</button>';
        }

        const servicePagination = document.body.querySelectorAll('section.services .swiper-pages button')
        for (let i = 0; i < servicePagination.length; i++) {
            servicePagination[i].addEventListener('click', function (event) {
                const slider = document.querySelector('.services-slider').swiper
                const index = [...event.target.parentElement.children].indexOf(event.target)
                slider.slideTo(index)
                event.preventDefault()
            })
        }

        const pages = document.querySelectorAll('section.services .slider-button');
        for (let i = 0; i < bullets.length; i++) {
            if (bullets[i].hasClass('swiper-pagination-bullet-active')) {
                pages[i].classList.add('active');
            }
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

    const slider = document.querySelector('.blog-slider').swiper
    slider.destroy(true, true)

    const slider_columns = document.querySelector('.blog-slider').hasClass('column-1')
    let columns = 1

    if (!slider_columns) {
        columns = 2
    }

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
                    slidesPerColumn: columns,
                    spaceBetween: 30,
                },
                1366: {
                    slidesPerView: 3,
                    slidesPerColumn: columns,
                    spaceBetween: 30,
                }
            },
            pagination: {
                el: '.blog-slider .swiper-pagination',
                clickable: true
            },
            slidesPerColumnFill: 'row',
            navigation: {
                nextEl: '.blog-next',
                prevEl: '.blog-prev',
            },
        })
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
                    slidesPerColumn: columns,
                    spaceBetween: 30,
                },
                1366: {
                    slidesPerView: 3,
                    slidesPerColumn: columns,
                    spaceBetween: 30,
                }
            },
            slidesPerColumnFill: 'row',
            pagination: {
                el: '.blog-slider .swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.blog-next',
                prevEl: '.blog-prev',
            },
        })
    }
}

function filterServiceSlider(filterName) {

    if (filterName) {
        const serviceSiblingsSlides = document.querySelectorAll('.services-slider .service-slide:not([data-filter="' + filterName + '"])')
        for (let i = 0; i < serviceSiblingsSlides.length; i++) {
            serviceSiblingsSlides[i].classList.add('non-swiper-slide')
            serviceSiblingsSlides[i].classList.remove('swiper-slide')
        }
        const serviceSlides = document.querySelectorAll('.services-slider .service-slide[data-filter="' + filterName + '"]')
        for (let i = 0; i < serviceSlides.length; i++) {
            serviceSlides[i].classList.add('swiper-slide')
            serviceSlides[i].classList.remove('non-swiper-slide')
        }
    } else {
        const serviceSlides = document.querySelectorAll('.services-slider .service-slide')
        for (let i = 0; i < serviceSlides.length; i++) {
            serviceSlides[i].classList.add('swiper-slide')
            serviceSlides[i].classList.remove('non-swiper-slide')
        }
    }

    const slider = document.querySelector('.services-slider').swiper
    slider.destroy(true, true)

    new Swiper('.services-slider', {
        on: service_params,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 20,
                slidesPerColumn: 1
            },
            1024: {
                slidesPerView: 2,
                slidesPerColumn: 2,
                spaceBetween: 30,
            },
            1366: {
                slidesPerView: 2,
                slidesPerColumn: 2,
                spaceBetween: 30,
            }
        },
        slidesPerColumnFill: 'row',
        pagination: {
            el: 'section.services .swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.service-next',
            prevEl: '.service-prev',
        },
    })
}

const blogFilter = document.querySelectorAll('.filter.blog a')
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

const loadMore = document.querySelectorAll('.load-more')
for (let i = 0; i < loadMore.length; i++) {
    loadMore[i].addEventListener('click', function (event) {
        $(this).parents('.page').find('.text-text').html($(this).parents('.page').find('.read').html());
        event.target.style.display = 'none'
        event.preventDefault()
    })
}
const burger = document.querySelector('.burger')
burger.addEventListener('click', function (event) {
    document.body.classList.toggle('menu-opened')
    event.preventDefault()
})

const closeBurger = document.querySelector('.menu-close_button')
closeBurger.addEventListener('click', function (event) {
    document.body.classList.remove('menu-opened')
    event.preventDefault()
})

function index(el) {
    if (!el) return -1
    let i = 0
    do {
        i++
    } while (el = el.previousElementSibling)
    return i
}

$('.filter.example a').on('click', function(event) {
    $(this).addClass('active').siblings().removeClass('active');
    $('.pages .page').eq($(this).index()).show().siblings().hide();
    event.preventDefault()
});

$('.mini-cert').on('click', function(event) {
    $(this).parents('.page').find('.full-image a').eq($(this).index()).removeClass('hidden').siblings().addClass('hidden');
    event.preventDefault()
});

const serviceFilter = document.querySelectorAll('.filter.service a')
for (let i = 0; i < serviceFilter.length; i++) {
    serviceFilter[i].addEventListener('click', function (event) {
        Array.prototype.forEach.call(serviceFilter, function (el, i) {
            el.classList.remove('active')
        })
        event.target.classList.add('active')

        filterServiceSlider(event.target.getAttribute('data-category'))

        event.preventDefault()
    })
}

document.addEventListener('click', function (event) {
    if (event.target && event.target.hasClass('close-popup') || event.target.hasClass('overlay')) {
        closeAllPopups()
    }
})

document.onkeydown = function (evt) {
    evt = evt || window.event
    if (evt.keyCode == 27) {
        if (document.querySelector('.overlay')) {
            closeAllPopups()
        }
    }
}

window.addEventListener('scroll', () => {
    initTrainEvent()
})

function initTeamPopup(popup, title, text, role, education, photo) {
    document.body.classList.add('popup-opened')
    let newDiv = document.createElement('div')
    newDiv.innerHTML = popup.innerHTML

    newDiv.querySelector('.title').innerHTML = title
    newDiv.querySelector('[name="person"]').value = $.trim(title)
    newDiv.querySelector('.text').innerHTML = text
    newDiv.querySelector('.role').innerHTML = role
    newDiv.querySelector('.education span').innerHTML = education
    newDiv.querySelector('img').setAttribute('src', photo)
    $(newDiv).find('[name="employee"]').val($.trim(title))

    document.body.insertAdjacentHTML("beforeEnd", '<div class="overlay"><div class="content team-popup">' + newDiv.innerHTML + '</div></div>')

    const phoneMask = document.querySelectorAll('[type="tel"]')
    phoneMask.forEach(element => IMask(element, {
        mask: '+{7} (000) 000-00-00'
    }))
}

function initPopup(popup, title, text) {
    document.body.classList.add('popup-opened')
    let newDiv = document.createElement('div')
    newDiv.innerHTML = popup.innerHTML
    $(newDiv).find('.popup-content').html('<br/>'+text)
    $(newDiv).find('.title').html(title)
    document.body.insertAdjacentHTML("beforeEnd", '<div class="overlay"><div class="content text-popup">' + newDiv.innerHTML + '</div></div>')
}

function initSuccessPopup() {
    document.body.classList.add('popup-opened')
    let newDiv = document.createElement('div')
    newDiv.innerHTML = document.querySelector('.success-popup').innerHTML
    document.body.insertAdjacentHTML("beforeEnd", '<div class="overlay"><div class="content success-popup">' + newDiv.innerHTML + '</div></div>')
}

function initFeedbackPopup(popup, title, subject, subtitle, redirect_uri) {
    subtitle = subtitle || '';
    redirect_uri = redirect_uri || '';
    document.body.classList.add('popup-opened')
    let newDiv = document.createElement('div')
    newDiv.innerHTML = popup.innerHTML
    $(newDiv).find('.popup-title').html('<span>' + title + '</span>')
    $(newDiv).find('[name="subject"]').val(subject)
    $(newDiv).find('[name="url"]').val(redirect_uri)
    if (subtitle == '') {
        $(newDiv).find('.form-subtitle').html('Оставьте контакты и мы сами Вам перезвоним')
    } else {
        $(newDiv).find('.form-subtitle').html(subtitle)
    }
    $(newDiv).find('[type="submit"]').html('Отправить')
    document.body.insertAdjacentHTML("beforeEnd", '<div class="overlay"><div class="content feedback-popup">' + newDiv.innerHTML + '</div></div>')
    const phoneMask = document.querySelectorAll('[type="tel"]')
    phoneMask.forEach(element => IMask(element, {
        mask: '+{7} (000) 000-00-00'
    }))
}

function closeAllPopups() {
    $('body').removeClass('popup-opened')
    $('.overlay').remove()
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

$(document).ready(function () {
    $('body').on('submit', 'form', function () {
        let $this = $(this)
        $.post("/wp-admin/admin-ajax.php", $this.serialize(), function () {
            ym(65148547,'reachGoal','REQUEST')
            if ($this.find('[name="url"]').val() !== '') {
                window.open($this.find('[name="url"]').val())
                console.log($this.find('[name="url"]').val())
            }
            $this[0].reset()
            $this.find('.form-input').removeClass('active')
            closeAllPopups()
            initSuccessPopup()

        });
        return false
    })

    $( ".full-text table" ).wrapAll( "<div class='table-wrap' />");

    $('[data-city]').click(function (e) {
        let attr = $(e.target).attr('data-city');
        $('.city-overlay').remove();
        if (typeof attr !== typeof undefined && attr !== false) {
            setCookie('ui_city', $(this).attr('data-city'))
            $('.select > span').html($(e.target).text())
            $('.cities-list').removeClass('active')
            window.location.reload()
        }
    })
    $('.select').on('click', function () {
        $(this).toggleClass('active')
        return false;
    })

    $('[data-popup]').on('click', function (event) {
        let popup_src = this.getAttribute('data-src')
        let $el
        if ($(this).hasClass('swiper-slide')) {
            $el = $(this)
        } else {
            $el = $(this).parents('.swiper-slide')
        }
        initTeamPopup(
            document.querySelector(popup_src),
            $el.find('.title').text(),
            $el.find('.full-text').text(),
            $el.find('.role').text(),
            $el.find('.education').html(),
            $el.find('img').attr('src')
        )
        event.preventDefault()
    })
    $(document).click(function(event) {
        let $target = $(event.target);
        if (!$target.closest('.select').length && $('.select').is(":visible")) {
            $('.location .select').removeClass('active');
        }
    });

    $('[data-popup-text]').on('click', function (event) {
        let popup_src = this.getAttribute('data-src')
        let $this = $(this)
        initPopup(
            document.querySelector(popup_src),
            $this.find('.title').text(),
            $this.find('.full-text').html(),
        )
        event.preventDefault()
    })

    $('[data-popup-text2]').on('click', function (event) {
        let popup_src = this.getAttribute('data-src')
        let $this = $(this)
        initPopup(
            document.querySelector(popup_src),
            $this.parents('.swiper-slide').find('.title').text(),
            $this.parents('.swiper-slide').find('.full-text').html()
        )
        event.preventDefault()
    })

    $('[data-feedback]').on('click', function (event) {
        let popup_src = this.getAttribute('data-src')
        let subtitle = this.getAttribute('data-subtitle')
        let $this = $(this)
        let subject = '';
        let redirect_uri = '';

        if ($this.attr('data-subject') !== '') {
            subject = $this.attr('data-subject');
        }
        if ($this.attr('data-redirect') !== '') {
            redirect_uri = $this.attr('data-redirect');
        }

        initFeedbackPopup(
            document.querySelector(popup_src),
            $this.attr('data-title'),
            subject,
            subtitle,
            redirect_uri
        )
        event.preventDefault()
    })

    $('body')
        .on('focus', '.form-input input', function (event) {
            $(this).parent().addClass('active')
            event.preventDefault()
        })
        .on('blur', '.form-input input', function (event) {
            if (event.target.value === '') {
                $(this).parent().removeClass('active')
            }
            event.preventDefault()
        })

})
