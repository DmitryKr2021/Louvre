/**********************************/
/*******Управление стрелками*******/
/**********************************/
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const now = document.querySelector('.now');
let nowNumber = 1;
let delta = 0;
const slideWidth = 1000;
let slideItems = document.querySelector('.slides');
let slides = document.querySelectorAll('.slide');
const radio = document.querySelectorAll('.radio');
radio[nowNumber - 1].classList.add('active');
const slidesLength = slides.length;
let slider = [];
for (let i = 0; i < slides.length; i++) {
  let clone = slides[i].cloneNode(true);
  slider[i] = clone;
  slides[i].remove();
}

let step = 0;
let activeSlide;
let prevSlide;
let nextSlide;

function draw() {
  activeSlide = document.createElement('span');
  activeSlide.classList.add('slide', 'slide_new');
  activeSlide.appendChild(slider[step]);
  activeSlide.style.left = 0 + 'px';

  prevSlide = document.createElement('span');
  prevSlide.classList.add('slide', 'slide_new');
  if (step === 0) {
    prevSlide.appendChild(slider[slider.length - 1]);
  } else {
    prevSlide.appendChild(slider[step - 1]);
  }
  prevSlide.style.left = -slideWidth + 'px';

  nextSlide = document.createElement('span');
  nextSlide.classList.add('slide', 'slide_new');
  if (step + 1 === slider.length) {
    nextSlide.appendChild(slider[0]);
  } else {
    nextSlide.appendChild(slider[step + 1]);
  }
  nextSlide.style.left = slideWidth + 'px';

  slideItems.prepend(activeSlide);
  slideItems.prepend(nextSlide);
  slideItems.append(prevSlide);
}

function changeSlideNumberUp(delta = 1) {
  radio[nowNumber - 1].classList.remove('active');
  nowNumber += delta;
  if (nowNumber === 6) {
    nowNumber = 1;
  }
  now.textContent = '0' + nowNumber;
  radio[nowNumber - 1].classList.add('active');
}

function changeSlideNumberDown(delta = 1) {
  radio[nowNumber - 1].classList.remove('active');
  nowNumber -= delta;
  if (nowNumber < 1) {
    nowNumber = 5;
  }
  now.textContent = '0' + nowNumber;
  radio[nowNumber - 1].classList.add('active');
}

draw();

next.onclick = changeSlideNext;
prev.onclick = changeSlidePrev;

function changeSlideNext() {
  next.onclick = null;
  step++;
  if (step === slidesLength) {
    step = 0;
  }
  activeSlide.style.left = -slideWidth + 'px';
  nextSlide.style.left = 0 + 'px';
  prevSlide.style.left = -2 * slideWidth + 'px';

  setTimeout(function () {
    if (step === 0 || step === 1) {
      //slider[step + slidesLength - 2].remove(); работают оба варианта, но второй видимо более правильный
      prevSlide.removeChild(slider[step + slidesLength - 2]);
    } else {
      //slider[step - 2].remove();
      prevSlide.removeChild(slider[step - 2]);
    }

    draw();
    next.onclick = changeSlideNext;
  }, 300);

  changeSlideNumberUp();
}

function changeSlidePrev() {
  prev.onclick = null;
  if (step === 0) {
    step = slidesLength - 1;
  } else {
    step--;
  }
  activeSlide.style.left = slideWidth + 'px';
  nextSlide.style.left = 2 * slideWidth + 'px';
  prevSlide.style.left = 0 + 'px';

  setTimeout(function () {
    if (step === slidesLength - 1 || step === slidesLength - 2) {
      //slider[step - slidesLength + 2].remove();
      nextSlide.removeChild(slider[step - slidesLength + 2]);
    } else {
      //slider[step + 2].remove();
      nextSlide.removeChild(slider[step + 2]);
    }

    draw();
    prev.onclick = changeSlidePrev;
  }, 300);
  changeSlideNumberDown();
}

/*************************************/
/*******Перетаскивание****************/
/*************************************/
let posX1,
  posX2,
  posInit,
  posFinal,
  trfRegExp = /[-0-9.]+(?=px)/,
  threshold = slideWidth * 0.5;

for (let slide of slider) {
  slide.style.position = 'absolute';
  slide.style.transition = 'transform 0.3s';
  slide.style.transform = `translate3d(-${0}px, 0px, 0px)`;
}

function swipeStart(e) {
  posX1 = posInit = e.clientX;
  window.onmousemove = swipeAction;
  window.onmouseup = swipeEnd;
}

function swipeAction(e) {
  posX2 = posX1 - e.clientX;
  posX1 = e.clientX;
  let style = slider[0].style.transform,
    transform = +style.match(trfRegExp)[0];
  for (let slide of slider) {
    slide.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
  }
}

function swipeEnd(e) {
  posFinal = posInit - posX1;
  window.onmousemove = null;
  window.onmouseup = null;

  if (Math.abs(posFinal) > threshold) {
    if (posInit < posX1) {
      step--;
      if (step < 0) {
        step = slidesLength - 1;
      }
      for (let slide of slider) {
        slide.style.transform = `translate3d(${0}px, 0px, 0px)`;
      } //возвращаем слайды в исходную позицию для отрисовки со сдвигом

      activeSlide.style.left = slideWidth + 'px';
      nextSlide.style.left = 2 * slideWidth + 'px';
      prevSlide.style.left = 0 + 'px';

      setTimeout(function () {
        if (step === slidesLength - 1 || step === slidesLength - 2) {
          //slider[step - slidesLength + 2].remove();
          nextSlide.removeChild(slider[step - slidesLength + 2]);
        } else {
          //slider[step + 2].remove();
          nextSlide.removeChild(slider[step + 2]);
        }
        draw();
      }, 0);
      changeSlideNumberDown();

    } else if (posInit > posX1) {
      step++;
      if (step === slidesLength) {
        step = 0;
      }
      for (let slide of slider) {
        slide.style.transform = `translate3d(${0}px, 0px, 0px)`;
      } //возвращаем слайды в исходную позицию для отрисовки со сдвигом

      activeSlide.style.left = -slideWidth + 'px';
      nextSlide.style.left = 0 + 'px';
      prevSlide.style.left = -2 * slideWidth + 'px';

      setTimeout(function () {
        if (step === 0 || step === 1) {
          //slider[step + slidesLength - 2].remove(); работают оба варианта, но второй видимо более правильный
          prevSlide.removeChild(slider[step + slidesLength - 2]);
        } else {
          //slider[step - 2].remove();
          prevSlide.removeChild(slider[step - 2]);
        }
        draw();
      }, 0);
      changeSlideNumberUp();
    }
  } else {
    for (let slide of slider) {
      slide.style.transform = `translate3d(${0}px, 0px, 0px)`;
    }
  }

}

slideItems.onmousedown = swipeStart;

/****************************/
/********радиокнопки*********/
/****************************/
for (let btn of radio) {
  btn.addEventListener(('click'),
    func);
}

function func(e) {
  const active = document.querySelector('.active');
  delta = e.target.id - active.id;
  step += delta;
  activeSlide.style.left = -delta * slideWidth + 'px';
  nextSlide.style.left = -(delta - 1) * slideWidth + 'px';
  prevSlide.style.left = -(delta + 1) * slideWidth + 'px';

  if (delta !== 0) {
    setTimeout(function () {
      if (step === 0 || step === 1) {
        slider[step + slidesLength - 2].remove();
      } else {
        slider[step - 2].remove();
      }
      draw();
      next.onclick = changeSlideNext;
    }, 300);
    changeSlideNumberUp(delta);
  }

}

/************************************/
/*******сравнение изображений********/
/************************************/

initComparisons();

function initComparisons() {
  let xx = document.querySelector('.img-overlay');
  compareImages(xx);

  function compareImages(img) {
    let clicked = 0;
    let w = img.offsetWidth;
    /*set the width of the img element to 50%:*/
    img.style.width = (w / 2) + "px";

    let slider = document.querySelector('.img-comp-slider');
    slider.style.left = (w / 2) + "px";
    slider.addEventListener("mousedown", slideReady);
    window.addEventListener("mouseup", slideFinish);
    slider.addEventListener("touchstart", slideReady);
    window.addEventListener("touchstop", slideFinish);

    function slideReady(e) {
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*the slider is now clicked and ready to move:*/
      clicked = 1;
      /*execute a function when the slider is moved:*/
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }

    function slideFinish() {
      /*the slider is no longer clicked:*/
      clicked = 0;
    }

    function slideMove(e) {
      let pos;
      /*if the slider is no longer clicked, exit this function:*/
      if (clicked == 0) {
        return false;
      }
      /*get the cursor's x position:*/
      pos = getCursorPos(e);
      /*prevent the slider from being positioned outside the image:*/
      if (pos < 0) {
        pos = 0;
      }
      if (pos > w) {
        pos = w;
      }
      /*execute a function that will resize the overlay image according to the cursor:*/
      slide(pos);
    }

    function getCursorPos(e) {
      let a, x = 0;
      e = e || window.event;
      /*get the x positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x coordinate, relative to the image:*/
      x = e.pageX - a.left;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      return x;
    }

    function slide(x) {
      /*resize the image:*/
      img.style.width = x + "px";
      /*position the slider:*/
      slider.style.left = img.offsetWidth + "px";
    }
  }
}


/****************************************/
/****************************************/
/******** Слайдер в секции Video ********/
/****************************************/
/****************************************/

/**********************************/
/*******Управление стрелками*******/
/**********************************/
const YTprev = document.querySelector('#YTprev');
const YTnext = document.querySelector('#YTnext');
const numChange = 1; //количество заменяемых слайдов
let videoMovie = document.querySelector('.video__movie');
let YTdelta = 0;
let YTnumber = 1;
let YTslideWidth;
let gap = 0;
let YTstep = 0;
const bullets = 5; //количество буллетов
let slidesPerFrame; //количество показываемых слайдов
let YTslideItems = document.querySelector('.YTslides');
let YTslides = document.querySelectorAll('.YTslide');
const YTradio = document.querySelectorAll('.YTradio');
YTradio[YTnumber - 1].classList.add('YTactive');
const YTslidesLength = YTslides.length;
let YTslider = [];
let windowWidth = document.documentElement.clientWidth;
let videoWidth = videoMovie.offsetWidth;
let width1;

if (windowWidth <= 780) {
  YTslideWidth = 360 * videoWidth / 780;
  slidesPerFrame = 2;
  width1 = 780;
} else if (windowWidth < 1025) {
  YTslideWidth = 280 * videoWidth / 1025;
  slidesPerFrame = 3;
  width1 = 1024;
} else {
  YTslideWidth = 452;
  slidesPerFrame = 3;
  width1 = 1920;
}

for (let i = 0; i < YTslides.length; i++) {
  YTslider[i] = YTslides[i].cloneNode(true);
  YTslides[i].remove();
}

let arrSlides = [];
for (let i = 0; i < slidesPerFrame + numChange * 2; i++) {
  arrSlides[i] = document.createElement('span');
  arrSlides[i].classList.add('YTslide');
  //создали массив слайдов показываемых + заменяемых с обеих сторон
}

window.addEventListener('resize', reSlideWidth);

function reSlideWidth() {
  windowWidth = document.documentElement.clientWidth;
  videoWidth = videoMovie.offsetWidth;

  if (windowWidth <= 780) {
    YTslideWidth = 360 * videoWidth / 780;
    slidesPerFrame = 2;
    width1 = 780;
  } else if (windowWidth < 1025) {
    YTslideWidth = 280 * videoWidth / 1025;
    slidesPerFrame = 3;
    width1 = 1024;
  } else {
    YTslideWidth = 452;
    slidesPerFrame = 3;
    width1 = 1920;
  }
}

function setSlidesWidth() {
  windowWidth = document.documentElement.clientWidth;
  videoWidth = videoMovie.offsetWidth;

  gap = (videoWidth - YTslideWidth * windowWidth * slidesPerFrame / width1) / (slidesPerFrame - 1);

  for (let i = 0; i < arrSlides.length; i++) {
    arrSlides[i].style.left = `${(YTslideWidth*windowWidth/width1 + gap)*(i-1)}` + 'px';
  }
}

function YTdraw() {
  arrSlides[1].appendChild(YTslider[YTstep]);
  YTslideItems.append(arrSlides[1]);

  if (YTstep + 1 === YTslider.length) {
    arrSlides[2].appendChild(YTslider[0]);
  } else {
    arrSlides[2].appendChild(YTslider[YTstep + 1]);
  }
  YTslideItems.append(arrSlides[2]);

  if (YTstep === 0) {
    arrSlides[3].appendChild(YTslider[YTslider.length - 1]);
  } else {
    arrSlides[3].appendChild(YTslider[YTstep - 1]);
  }
  YTslideItems.append(arrSlides[3]);

  if (YTstep + 2 === YTslider.length) {
    arrSlides[0] = arrSlides[YTstep + 2].cloneNode(true);
  } else {
    arrSlides[0] = arrSlides[3].cloneNode(true);
  }
  YTslideItems.append(arrSlides[0]);

  arrSlides[4] = arrSlides[1].cloneNode(true);
  YTslideItems.append(arrSlides[4]);

  setSlidesWidth();

  window.addEventListener('resize', setSlidesWidth);
}

function YTchangeSlideNumberUp(YTdelta = 1) {
  YTradio[YTnumber - 1].classList.remove('YTactive');
  YTnumber += YTdelta;
  if (YTnumber === 6) {
    YTnumber = 1;
  }
  YTradio[YTnumber - 1].classList.add('YTactive');
}

function YTchangeSlideNumberDown(YTdelta = 1) {
  YTradio[YTnumber - 1].classList.remove('YTactive');
  YTnumber -= YTdelta;
  if (YTnumber < 1) {
    YTnumber = 5;
  }
  YTradio[YTnumber - 1].classList.add('YTactive');
}

YTdraw();

YTnext.onclick = YTchangeSlideNext;
YTprev.onclick = YTchangeSlidePrev;

function YTchangeSlideNext() {
  YTnext.onclick = null;
  YTstep++;
  if (YTstep === YTslidesLength) {
    YTstep = 0;
  }

  windowWidth = document.documentElement.clientWidth;
  for (let i = 0; i < arrSlides.length; i++) {
    arrSlides[i].style.left = `${(YTslideWidth*windowWidth/width1+gap)*(i-2)}` + 'px';
  }

  setTimeout(function () {
    arrSlides[0].firstElementChild.remove();
    YTdraw();
    YTnext.onclick = YTchangeSlideNext;
  }, 300);

  YTchangeSlideNumberUp();
}

function YTchangeSlidePrev() {
  YTprev.onclick = null;
  if (YTstep === 0) {
    YTstep = YTslidesLength - 1;
  } else {
    YTstep--;
  }

  windowWidth = document.documentElement.clientWidth;
  for (let i = 0; i < arrSlides.length; i++) {
    arrSlides[i].style.left = `${(YTslideWidth*windowWidth/width1+gap)*(i)}` + 'px';
  }

  setTimeout(function () {
    arrSlides[arrSlides.length - 1].firstElementChild.remove();
    YTdraw();
    YTprev.onclick = YTchangeSlidePrev;
  }, 300);
  YTchangeSlideNumberDown();
}

/*************************************/
/*******Перетаскивание****************/
/*************************************/
/*let YTposX1,
  YTposX2,
  YTposInit,
  YTposFinal,
  YTtrfRegExp = /[-0-9.]+(?=px)/,
  YTthreshold = YTslideWidth * 0.5;

for (let slide of arrSlides) {
  slide.style.transform = `translate3d(-${0}px, 0px, 0px)`;
}

YTslideItems.onmousedown = YTswipeStart;

function YTswipeStart(e) {
  YTposX1 = YTposInit = e.clientX;
  window.onmousemove = YTswipeAction;
  window.onmouseup = YTswipeEnd;
}

function YTswipeAction(e) {
  YTposX2 = YTposX1 - e.clientX;
  YTposX1 = e.clientX;
  let style = arrSlides[1].style.transform;
  let transform = +style.match(YTtrfRegExp)[0];
  for (let slide of arrSlides) {
    slide.style.transform = `translate3d(${transform - YTposX2}px, 0px, 0px)`;
  }
}

function toStartPos() {
  for (let slide of arrSlides) {
    slide.style.transform = `translate3d(${0}px, 0px, 0px)`;
  } //возвращаем слайды в исходную позицию для отрисовки со сдвигом
}

function YTswipeEnd(e) {
  YTposFinal = YTposInit - YTposX1;
  window.onmousemove = null;
  window.onmouseup = null;

  if (Math.abs(YTposFinal) > YTthreshold && Math.abs(YTposFinal) < YTthreshold * 2) {
    if (YTposInit < YTposX1) {
      YTstep--;
      if (YTstep < 0) {
        YTstep = YTslidesLength - 1;
      }
      toStartPos();

      for (let i = 0; i < arrSlides.length; i++) {
        arrSlides[i].style.left = `${(YTslideWidth+gap)*(i-2)}` + 'px';
      }

      setTimeout(function () {
        arrSlides[0].firstElementChild.remove();
        YTdraw();
      }, 0);
      YTchangeSlideNumberDown();

    } else if (YTposInit > YTposX1) {
      YTstep++;
      if (YTstep === YTslidesLength) {
        YTstep = 0;
      }
      toStartPos();

      for (let i = 0; i < arrSlides.length; i++) {
        arrSlides[i].style.left = `${(YTslideWidth+gap)*(i-2)}` + 'px';
      }

      setTimeout(function () {
        arrSlides[arrSlides.length - 1].firstElementChild.remove();
        YTdraw();
      }, 0);
      YTchangeSlideNumberUp();
    }
  } else if (Math.abs(YTposFinal) > YTthreshold * 2) {
    if (YTposInit < YTposX1) {
      YTstep -= 2;
      if (YTstep < 0) {
        YTstep = YTslidesLength - 1;
      }
      toStartPos();

      for (let i = 0; i < arrSlides.length; i++) {
        arrSlides[i].style.left = `${(YTslideWidth+gap)*(i-1)}` + 'px';
      }

      setTimeout(function () {
        arrSlides[0].firstElementChild.remove();
        arrSlides[1].firstElementChild.remove();
        YTdraw();
      }, 0);
      YTchangeSlideNumberDown();

    } else if (YTposInit > YTposX1) {
      YTstep += 2;
      if (YTstep === YTslidesLength) {
        YTstep = 0;
      }
      toStartPos();

      for (let i = 0; i < arrSlides.length; i++) {
        arrSlides[i].style.left = `${(YTslideWidth+gap)*(i-1)}` + 'px';
      }

      setTimeout(function () {
        arrSlides[arrSlides.length - 1].firstElementChild.remove();
        arrSlides[arrSlides.length - 2].firstElementChild.remove();
        YTdraw();
      }, 0);
      YTchangeSlideNumberUp();
    }
  } else {
    toStartPos();
  }
}*/

/****************************/
/********радиокнопки*********/
/****************************/
for (let btn of YTradio) {
  btn.addEventListener(('click'),
    funcYT);
}

function funcYT(e) {
  const active = document.querySelector('.YTactive');
  YTdelta = e.target.id - active.id;

  YTchangeSlideNumberUp(YTdelta);

  if (YTdelta >= YTslidesLength) {
    YTdelta -= YTslidesLength;
  }

  if (YTdelta <= -YTslidesLength) {
    YTdelta += YTslidesLength;
  }

  YTstep += YTdelta;

  if (YTstep >= YTslidesLength) {
    YTstep -= YTslidesLength;
  }
  if (YTstep < 0) {
    YTstep += YTslidesLength;
  }


  windowWidth = document.documentElement.clientWidth;
  videoWidth = videoMovie.offsetWidth;

  for (let i = 0; i < arrSlides.length; i++) {
    gap = (videoWidth - 452 * windowWidth * 3 / 1920) / 2;
    arrSlides[i].style.left = `${(452*windowWidth/1920+gap)*(i-1-YTdelta)}` + 'px';
  }

  if (YTdelta !== 0) {
    setTimeout(function () {
      YTdraw();
      YTnext.onclick = YTchangeSlideNext;
    }, 300);
  }

}