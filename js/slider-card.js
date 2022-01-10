const images = document.querySelectorAll('.slider-line_item');
const sliderLine = document.querySelector('.slider .slider-line');
const slider = document.querySelector('.slider');
let width;
let s;
function start() {
    let screenWidth;
    let width;

    width = document.querySelector('.slider').offsetWidth;
    screenWidth = window.screen.width;
    if (screenWidth > 500) {
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
        
    } else {
        let slideWidth = images[0].offsetWidth;
        let slideIndex = 0;
        let posInit = 0;
        let posX1 = 0;
        let posX2 = 0;
        let posY1 = 0;
        let posY2 = 0;
        let posFinal = 0;
        let isSwipe = false;
        let isScroll = false;
        let allowSwipe = true;
        let transition = true;
        let lastTrf = --images.length * slideWidth;
        let posThreshold = images[0].offsetWidth * 0.35;
        let swipeStartTime;
        let swipeEndTime;
        let getEvent = function() {
          return (event.type.search('touch') !== -1) ? event.touches[0] : event;
        };
        let slide = function() {
          if (transition) {
              sliderLine.style.transition = 'transform .5s';
          }
          sliderLine.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;
        };
        let swipeStart = function() {
          let evt = getEvent();
      
          if (allowSwipe) {
      
            swipeStartTime = Date.now();
            
            transition = true;
      
            posInit = posX1 = evt.clientX;
            posY1 = evt.clientY;
      
            sliderLine.style.transition = '';
      
            document.addEventListener('touchmove', swipeAction);
            document.addEventListener('mousemove', swipeAction);
            document.addEventListener('touchend', swipeEnd);
            document.addEventListener('mouseup', swipeEnd);
      
            slider.classList.remove('grab');
            slider.classList.add('grabbing');
          }
        };
        let swipeAction = function() {
      
          let evt = getEvent();
            let transform = +width;
      
          posX2 = posX1 - evt.clientX;
          posX1 = evt.clientX;
      
          posY2 = posY1 - evt.clientY;
          posY1 = evt.clientY;
      
          if (!isSwipe && !isScroll) {
            let posY = Math.abs(posY2);
            if (posY > 7 || posX2 === 0) {
              isScroll = true;
              allowSwipe = false;
            } else if (posY < 7) {
              isSwipe = true;
            }
          }
      
          if (isSwipe) {
            if (slideIndex === 0) {
              if (posInit < posX1) {
                setTransform(transform, 0);
                return;
              } else {
                allowSwipe = true;
              }
            }
            
            if (slideIndex === --images.length) {
              if (posInit > posX1) {
                setTransform(transform, lastTrf);
                return;
              } else {
                allowSwipe = true;
              }
            }

            sliderLine.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
          }
      
        };
        let swipeEnd = function() {
          posFinal = posInit - posX1;
      
          isScroll = false;
          isSwipe = false;
      
          document.removeEventListener('touchmove', swipeAction);
          document.removeEventListener('mousemove', swipeAction);
          document.removeEventListener('touchend', swipeEnd);
          document.removeEventListener('mouseup', swipeEnd);
      
          slider.classList.add('grab');
          slider.classList.remove('grabbing');
      
          if (allowSwipe) {
            swipeEndTime = Date.now();
            if (Math.abs(posFinal) > posThreshold || swipeEndTime - swipeStartTime < 300) {
              if (posInit < posX1) {
                slideIndex--;
              } else if (posInit > posX1) {
                slideIndex++;
              }
            }
      
            if (posInit !== posX1) {
              allowSwipe = false;
              slide();
            } else {
              allowSwipe = true;
            }
      
          } else {
            allowSwipe = true;
          }
      
        };
        let setTransform = function(transform, comapreTransform) {
          if (transform >= comapreTransform) {
            if (transform > comapreTransform) {
              sliderLine.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
            }
          }
          allowSwipe = false;
        };
      
        sliderLine.style.transform = 'translate3d(0px, 0px, 0px)';
      slider.classList.add('grab');
      
      sliderLine.addEventListener('transitionend', () => allowSwipe = true);
      slider.addEventListener('touchstart', swipeStart);
      slider.addEventListener('mousedown', swipeStart);
    } 
}
window.addEventListener('resize', start);
start();
