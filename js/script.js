function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});


const sendv = document.querySelector('.sendvich');
const navItems = document.querySelector('.nav__items');
const menu = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.menu__list-item');
const menuBtn = document.querySelector('.menu-btn');
const welcomeText = document.querySelector('.welcome__text');

sendv.onclick = function (e) {
  menuBtn.classList.toggle('menu-btn_checked');
  menu.classList.toggle('menu__show');
  welcomeText.classList.toggle('welcome__to-hide');
};

document.querySelector('.main').onclick = (e) => {
  if (e.target !== menu) {
    menuBtn.classList.remove('menu-btn_checked');
    menu.classList.remove('menu__show');
    welcomeText.classList.remove('welcome__to-hide');
  }
};

for (let item of menuItems) {
  item.onclick = (e) => {
    menuBtn.classList.toggle('menu-btn_checked');
    menu.classList.toggle('menu__show');
    welcomeText.classList.toggle('welcome__to-hide');
  };
}

const scrollUp = document.querySelector('.scroll-up');
window.onscroll = () => {
  if (window.pageYOffset > document.documentElement.clientHeight) {
    scrollUp.style.display = 'block';
  } else {
    scrollUp.style.display = 'none';
  }
};