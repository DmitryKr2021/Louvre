const pictureInnerContainer = document.querySelector('.picture-inner-container');
let arrImg = [];
for (let i = 0; i < 12; i++) {
  const img = document.createElement('img');
  img.classList.add('gallery-img');
  img.src = `assets/img/galery/galery${i+1}.jpg`;
  img.alt = `galery${i+1}`;
  arrImg.push(img);
}

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function shuffle(arr) {
  let arrTemp = [];
  let num;
  while (arr[0]) {
    num = randomInteger(0, arr.length - 1);
    arrTemp.push(arr[num]);
    arr.splice(num, 1);
  }
  return (arrTemp);
}

arrImg = shuffle(arrImg);
arrImg.map(item => pictureInnerContainer.append(item));

/*  Picture animation (hoisting) */
window.onload = function () {
  arrImg.forEach((item) => {
    item.classList.add('hoist');
  });
};

window.addEventListener('scroll', function () {
  arrImg.forEach((item) => {
    if (item.getBoundingClientRect().top >= document.documentElement.clientHeight) {
      item.classList.remove('hoist');
    }
    if (item.getBoundingClientRect().top <= document.documentElement.clientHeight * 0.8) {
      item.classList.add('hoist');
    }
  });
});