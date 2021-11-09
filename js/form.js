let sumTotal = document.querySelector('span.total_');
let buttonAmount = document.querySelectorAll('.button-amount');
const basic = document.querySelector('.basic_');
const basicPrice = document.querySelectorAll('.basicPrice');
const senior = document.querySelector('.senior_');
const seniorPrice = document.querySelectorAll('.seniorPrice');
let amountBasic = 0;
let amountSenior = 0;
const basicCount = document.querySelector('.basic-count');
const seniorCount = document.querySelector('.senior-count');
const btnAmount = document.querySelectorAll('.btn-amount');
const basicSum = document.querySelector('.basic-sum');
const seniorSum = document.querySelector('.senior-sum');
const ttSum = document.querySelector('.tt-sum');
const ticketTypes = document.querySelectorAll('.tickets__radio');
const ticketLabels = document.querySelectorAll('.choose__label');
let ticketPrice;
let tt = 'Permanent exhibition';
let typeNumber = 0;
const prices = {
  'Permanent exhibition': 20,
  'Temporary exhibition': 30,
  'Combined Admission': 40
};

/* Определить начальный номер и цену типа билета в списке */
for (let i = 0; i < ticketTypes.length; i++) {
  if (ticketTypes[i].checked) {
    ticketPrice = prices[ticketLabels[i].textContent];
  }
}

/* Определить выбранный номер и цену типа билета в списке */
ticketTypes.forEach((item, index) => item.addEventListener('click', () => {
  typeNumber = index;
  ticketType[typeNumber].selected = true;
  tt = item.nextElementSibling.textContent;
  ticketPrice = prices[tt];
  basicPrice.forEach((item) => item.textContent = ticketPrice);
  seniorPrice.forEach((item) => item.textContent = ticketPrice / 2);
  calculateTotal();
}));


for (let btn of buttonAmount) {
  btn.addEventListener('click', callTotal);
}

function calculateTotal() {
  sumTotal.textContent = amountBasic * ticketPrice + amountSenior * ticketPrice / 2;
}

function callTotal() {
  amountBasic = document.querySelector('input.basic').value;
  amountSenior = document.querySelector('input.senior').value;
  calculateTotal();
  basic.value = amountBasic;
  senior.value = amountSenior;
  addAmount();
}

const ticketType = document.querySelector('.tickettype');
const ticketResumeType = document.querySelector('.ticket-resume__tickettype');
const ticketResumeDate = document.querySelector('.ticket-resume__date');
const ticketResumeTime = document.querySelector('.ticket-resume__time');
const myDate = document.querySelector('.datepicker');
const myTime = document.querySelector('.timepicker');


ticketType.addEventListener('click', getTicketType);


function getTicketType(e) {
  let ntype = ticketType.options.selectedIndex;
  ticketResumeType.textContent = ticketType.options[ntype].text;
  ticketPrice = prices[ticketResumeType.textContent];
  basicPrice.forEach((item) => item.textContent = ticketPrice);
  seniorPrice.forEach((item) => item.textContent = ticketPrice / 2);
  addAmount();
}

const b = document.querySelector('body');
myDate.value = 'Date';
myTime.value = 'Time';

/***********************************
b.onclick = (e) => {
  if (e.target != myDate) {
    getMyDate();
  }
};
function getMyDate() {
  myDate.onclick = null;
  setTimeout(function () {
    ticketResumeDate.textContent = myDate.value;
    myDate.onclick = getMyDate;
  }, 300);
}
День и месяц выводятся в скрипте datepicker
***********************************/

myTime.addEventListener('click', getMyTime);

function getMyTime() {
  b.onclick = () => {
    const trt = myTime.value;
    const tl = trt.length;
    const trmin = trt[tl - 5] + trt[tl - 4];

    let trhour = tl === 8 ? trt.substr(0, 2) : trt.substr(0, 1);
    if (trt[tl - 2] === 'p' && trhour < 12) {
      trhour = +trhour + 12;
    }
    ticketResumeTime.textContent = trhour + ':' + trmin;
  };
}

for (let ba of btnAmount) {
  ba.addEventListener('click', addAmount);
}

function addAmount() {
  basicCount.textContent = basic.value;
  seniorCount.textContent = senior.value;
  countTotal();
}

function countTotal() {
  basicSum.textContent = basic.value * ticketPrice;
  seniorSum.textContent = senior.value * ticketPrice / 2;
  ttSum.textContent = basic.value * ticketPrice + senior.value * ticketPrice / 2;
}

const dateUp = document.querySelector('.date-up');
const dateDown = document.querySelector('.date-down');
const dateItems = document.querySelectorAll('.date-item');
let nDate = 0;
dateUp.addEventListener('click', nextMonth);
dateDown.addEventListener('click', prevMonth);


function nextMonth() {
  if (nDate < 11) {
    nDate++;
  }
  for (let dateItem of dateItems) {
    dateItem.style.transform = `translateY(-${28*nDate}px)`;
  }
}

function prevMonth() {
  if (nDate > 0) {
    nDate--;
  }
  for (let dateItem of dateItems) {
    dateItem.style.transform = `translateY(-${28*nDate}px)`;
  }
}

const yearUp = document.querySelector('.year-up');
const yearDown = document.querySelector('.year-down');
const yearItems = document.querySelectorAll('.year-item');
let nYear = 0;
yearUp.addEventListener('click', nextYear);
yearDown.addEventListener('click', prevYear);

function nextYear() {
  if (nYear < 4) {
    nYear++;
  }
  for (let yearItem of yearItems) {
    yearItem.style.transform = `translateY(-${28*nYear}px)`;
  }
}

function prevYear() {
  if (nYear > 0) {
    nYear--;
  }
  for (let yearItem of yearItems) {
    yearItem.style.transform = `translateY(-${28*nYear}px)`;
  }
}

const form_ = document.querySelector('.booking-ticket');
const ticketsBuy = document.querySelector('.tickets__buy');
const formClose = document.querySelector('.form__close');
const formSubmit = document.querySelector('.form-submit');
const body = document.querySelector('body');
const styleBody = document.head.appendChild(document.createElement('style'));
let show_modal = false;

form_.classList.add('form-hide');

ticketsBuy.onclick = () => {
  countTotal();
  toShowModal();
};

body.onclick = (e) => {
  if (show_modal && e.target.classList.contains('for_modal')) {
    toHideModal();
  }
};

formClose.onclick = (e) => {
  e.preventDefault();
  toHideModal();
};

formSubmit.addEventListener('mousedown', function (e) {
  const btnLeft = formSubmit.getBoundingClientRect().left;
  const btnTop = formSubmit.getBoundingClientRect().top;
  const x = e.clientX;
  const y = e.clientY;
  const xInside = x - btnLeft;
  const yInside = y - btnTop;
  const circle = document.createElement('span');
  circle.classList.add('circle');
  circle.style.top = yInside + 'px';
  circle.style.left = xInside + 'px';
  this.appendChild(circle);
  setTimeout(() => circle.remove(), 500);
});

/*formSubmit.onclick = (e) => {
  e.preventDefault();
  setTimeout(() => toHideModal(), 500);
};*/

function toHideModal() {
  styleBody.innerHTML = "body::after {display: none}";
  form_.classList.add('form-hide');
  show_modal = false;
}

function toShowModal() {
  styleBody.innerHTML = "body::after {display: block}";
  form_.classList.remove('form-hide');
  show_modal = true;
}

/* Form validation */
const validation = document.querySelector('#validation');
const alertModal = document.querySelector('.alertModal');
const alertModalContent = document.querySelector('.alertModal__content');
const alertModalOk = document.querySelector('.alertModal__ok');
const inputName = document.querySelector('.name');
const inputEmail = document.querySelector('.email');
const inputPhone = document.querySelector('.phone');
const regName = /^[a-zа-яё\s]{3,15}$/ig;
const regEmail = /^[A-Z0-9_-]{3,15}@[A-Z0-9-]{4,10}\.[A-Z]{2,4}$/i;
const regPhone = /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;
const nameAlert = `Your name is not valid. Only characters A-Z, a-z, А-Я, а-я and ' ' are  acceptable. Number of characters 3-15`;
const emailAlert = `Your eMail is not valid. It must look such "username@example.com". Only characters A-Z, a-z, " ", "-" are  acceptable. Number of characters 3-15, 4-10, 2-4`;
const phoneAlert = `Your phone is not valid. It must consists of digits and opionally "+" at the beginning. Number of symbols 5-10`;

let valid = true;

function validateInput(inputType, inputRegExp, inputAlert) {
  valid = inputType.value.match(inputRegExp);
  if (valid == null) {
    inputType.classList.add('invalid');
    alertModal.style.display = "block";
    alertModalContent.textContent = inputAlert;
    inputType.focus();
    alertModalOk.onclick = (e) => {
      e.preventDefault();
      alertModal.style.display = "none";
    };
  } else {
    inputType.classList.remove('invalid');
  }
}

formSubmit.onclick = (e) => {
  e.preventDefault();
  if (validation.checked) {
    validateInput(inputName, regName, nameAlert);
    if (valid) {
      validateInput(inputEmail, regEmail, emailAlert);
    }
    if (valid) {
      validateInput(inputPhone, regPhone, phoneAlert);
    }
    if (valid) {
      setTimeout(() => toHideModal(), 500);
    }
  } else {
    setTimeout(() => toHideModal(), 500);
  }
};