'use strict';

let bmenu = document.querySelector('.bmenu');
let navBody = document.querySelector('.bmenu-nav');
let navClose = document.querySelector('.bmenu-nav__close');

if (bmenu && navBody) {
  bmenu.addEventListener('click', () => {
    document.body.classList.add('_lock');
    navBody.classList.add('_active');
    document.addEventListener('click', removeNav);
  });

  navClose.addEventListener('click', () => {
    document.body.classList.remove('_lock');
    navBody.classList.remove('_active');
  });

  function removeNav(e) {
    if (!e.target.closest('.bmenu-nav') && !e.target.closest('.bmenu')) {
      document.body.classList.remove('_lock');
      navBody.classList.remove('_active');
    }
  }
}

function hide(block) {
  block.style.opacity = '0';
  setTimeout(() => (block.style.display = 'none'), 100);
}

function show(block) {
  setTimeout(() => (block.style.opacity = '1'), 1);
  block.style.display = '';
}

let cards = document.querySelectorAll('.card');

if (cards.length > 0) {
  for (let card of cards) {
    card.addEventListener('click', () => {
      document.location.href = 'card-product.html';
    });
  }
}
