const images = document.querySelectorAll('.slider-line_item');
const sliderLine = document.querySelector('.slider .slider-line');
const slider = document.querySelector('.slider');
let width;
let s;

function init() {
    width = images[0].offsetWidth;
    sliderLine.style.width = width * images.length + 'px';
}

init();
window.addEventListener('resize', init);
let lo = (width * images.length - slider.offsetWidth);
let count = 0;

document.querySelector('.slider-next').addEventListener('click', function () {
    count += lo / 2;
    if (count <= width * images.length - slider.offsetWidth) {
        lso(count)
   } else {
        lso(0)
        count = 0;
   }

});

document.querySelector('.slider-prev').addEventListener('click', function () {
    if (count > 0) {
        count -= lo / 2;
       lso(count, 'prev')
   } else {
        lso(width * images.length - slider.offsetWidth);
        count = width * images.length - slider.offsetWidth;
   }
});


function lso(c) {
    return sliderLine.style.transform = 'translate(-' + c + 'px)';
}

sliderLine.onclick = function(event) {
    images.forEach(e => e.classList.remove('slider-line_item__selected'))
    let thumbnail = event.target.closest('img');
    event.target.classList.add('slider-line_item__selected');
    if (!thumbnail) return;
    document.querySelector('.card-product-img').src = thumbnail.src;
    event.preventDefault();
}


document.addEventListener('touchstart', t, false)
// document.addEventListener('touchmove', m, false)

function t(event) {
    const firs = event.touches[0]
    if (firs.clientX / 2 <= width * images.length - slider.offsetWidth) {
        console.log(firs.clientX)
        lso(firs.clientX / 2)
    }
}