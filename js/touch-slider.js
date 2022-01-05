function start() {
    const images = document.querySelectorAll('.touch-slider .touch-slider-line div img');
    const sliderLine = document.querySelector('.touch-slider .touch-slider-line');
    const sliderList = document.querySelector('.touch-slider');
    let width;
    let screenWidth;
    screenWidth = window.screen.width;
    let slideWidth = images[0].offsetWidth;
    width = document.querySelector('.touch-slider').offsetWidth;
    sliderLine.style.width = width * images.length + 'px';
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
        
                nextTrf = (slideIndex + 1) * -slideWidth;
                prevTrf = (slideIndex - 1) * -slideWidth;
        
                posInit = posX1 = evt.clientX;
                posY1 = evt.clientY;
        
                sliderLine.style.transition = '';
        
                document.addEventListener('touchmove', swipeAction);
                document.addEventListener('mousemove', swipeAction);
                document.addEventListener('touchend', swipeEnd);
                document.addEventListener('mouseup', swipeEnd);
        
                sliderList.classList.remove('grab');
                sliderList.classList.add('grabbing');
            }
            };
            let swipeAction = function() {
        
            let evt = getEvent();
            let transform = +(screenWidth - width);

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
        
                if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
                reachEdge();
                return;
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
        
            sliderList.classList.add('grab');
            sliderList.classList.remove('grabbing');
        
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
            let reachEdge = function() {
            transition = false;
            swipeEnd();
            allowSwipe = true;
            };
        
            sliderLine.style.transform = 'translate3d(0px, 0px, 0px)';
        sliderList.classList.add('grab');
        
        sliderLine.addEventListener('transitionend', () => allowSwipe = true);
        sliderList.addEventListener('touchstart', swipeStart);
        sliderList.addEventListener('mousedown', swipeStart);
}
window.addEventListener('resize', start);
start();