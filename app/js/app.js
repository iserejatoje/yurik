import {initMap} from './map'
import IMask from 'imask'

const trainDistance = 160
const phoneMask = document.querySelectorAll('[type="tel"]')
phoneMask.forEach(element => IMask(element, {
    mask: '+{7} (000) 000-00-00'
}));

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
});