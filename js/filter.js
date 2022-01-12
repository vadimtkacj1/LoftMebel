document.querySelector('.color-items').onclick = function(e) {
    let lo;
    if (e.target.tagName === 'IMG') {
        lo = e.target.src
        document.querySelectorAll('.color-items img').forEach(elem =>{
            if (elem.src === 'http://127.0.0.1:5500/img/color-main.svg') {
                elem.src = lo;
            }
        })
        lo = e.target.src
        e.target.src = 'img/color-main.svg'
    }
}

document.querySelector('.brand-items').onclick = function(e) {
    let lo;
    if (e.target.tagName === 'IMG') {
        lo = e.target.src
        document.querySelectorAll('.brand-item img').forEach(elem =>{
            if (elem.src === 'http://127.0.0.1:5500/img/color-brand-main.svg') {
                elem.src = lo;
            }
        })
        lo = e.target.src
        e.target.src = 'img/color-brand-main.svg'
    }
}

document.querySelector('.button-filter').onclick = function() {
    document.querySelector('.filter').style.display = 'flex';
    
}

document.querySelector('.filter-but-clean').onclick = function() {
    document.querySelector('.filter').style.display = 'none';
}