document.querySelector('.color-items').onclick = function (e) {
  let lo;
  if (e.target.tagName === 'IMG') {
    lo = e.target.src;
    document.querySelectorAll('.color-items img').forEach(elem => {
      console.log(elem.src.includes('main'));
      if (elem.src.includes('main')) {
        elem.src = lo;
      }
    });
    lo = e.target.src;
    e.target.src = 'img/color-main.svg';
  }
};

document.querySelector('.brand-items').onclick = function (e) {
  let lo;
  if (e.target.tagName === 'IMG') {
    lo = e.target.src;
    document.querySelectorAll('.brand-item img').forEach(elem => {
      if (elem.src.includes('main')) {
        elem.src = lo;
      }
    });
    lo = e.target.src;
    e.target.src = 'img/color-brand-main.svg';
  }
};

document.querySelector('.button-filter').onclick = function () {
  document.querySelector('.filter').style.display = 'flex';
};

document.querySelector('.filter-but-clean').onclick = function () {
  document.querySelector('.filter').style.display = 'none';
};
