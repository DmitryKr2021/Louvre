let sumTotal = document.querySelector('span.total_');
let buttonAmount = document.querySelectorAll('.button-amount');

for (let btn of buttonAmount) {
  btn.addEventListener('click', callTotal);
}

function callTotal() {
  let amountBasic = document.querySelector('input.basic').value;
  let amountSenior = document.querySelector('input.senior').value;
  sumTotal.textContent = amountBasic * 20 + amountSenior * 10;

  console.log(amountBasic, amountSenior);
}

const ticketsType = document.querySelector('.ticketstype');
const ticketType = document.querySelector('.tickettype');
const ticketResumeType = document.querySelector('.ticket-resume__tickettype');
const ticketResumeDate = document.querySelector('.ticket-resume__date');
const ticketResumeTime = document.querySelector('.ticket-resume__time');
const myDate = document.querySelector('.datepicker');
const myTime = document.querySelector('.timepicker');

ticketsType.addEventListener('click', () => {
  ticketsType.classList.toggle('tickets_active');
});

ticketType.addEventListener('click', getTicketType);

function getTicketType(e) {
  let ntype = ticketType.options.selectedIndex;
  ticketResumeType.textContent = ticketType.options[ntype].text;
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

const basic = document.querySelector('.basic_');
const senior = document.querySelector('.senior_');
const basicCount = document.querySelector('.basic-count');
const seniorCount = document.querySelector('.senior-count');
const btnAmount = document.querySelectorAll('.btn-amount');
const basicSum = document.querySelector('.basic-sum');
const seniorSum = document.querySelector('.senior-sum');
const ttSum = document.querySelector('.tt-sum');

for (let ba of btnAmount) {
  ba.addEventListener('click', addAmount);
}

function addAmount() {
  basicCount.textContent = basic.value;
  seniorCount.textContent = senior.value;
  countTotal();
}

function countTotal() {
  basicSum.textContent = basic.value * 20;
  seniorSum.textContent = senior.value * 10;
  ttSum.textContent = basic.value * 20 + senior.value * 10;
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

formSubmit.onclick = (e) => {
  e.preventDefault();
  setTimeout(() => toHideModal(), 500);
};

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