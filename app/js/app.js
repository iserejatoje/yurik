import {initMap} from './map'
const trainDistance = 160;

// import IMask from 'imask';
//
// const phoneMask = document.querySelectorAll('[type="tel"]');
// phoneMask.forEach(element => IMask(element, {
//     mask: '+{7}(000)000-00-00'
// }));

function initTrainEvent() {
    if (window.scrollY > trainDistance) {
        document.querySelector('.train').classList.add('fade-in');
    } else {
        document.querySelector('.train').classList.remove('fade-in');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initTrainEvent()
    initMap()
})

window.addEventListener('scroll', () => {
    initTrainEvent()
});