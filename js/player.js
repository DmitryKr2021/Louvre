let videoPlay = document.querySelector('.video__play');
const go = document.querySelector('.go');
const videoGo = document.querySelector('.video-go');
const videoIn = document.querySelectorAll('.video__in');
let v_progress = document.querySelector('.video-progress');
const a_progress = document.querySelector('.audio-progress');
const mySpeed = document.querySelector('.speed');
const start = document.querySelector('.start');
const finish = document.querySelector('.finish');
const myAudio = document.querySelector('.block2');
const audioImg = document.querySelector('.audio');
const myScreen = document.querySelector('.block3');
const btnBack = document.querySelector('.back');
const btnForward = document.querySelector('.forward');
let progress = 0;
let position;
let volume;
let audio_ = true;
let afterDrag = false;
let toggle_ = false;
let relation;

v_progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${0}%, #fff ${0}%, white 100%)`;
videoPlay.volume = 0.5;
a_progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${45}%, #fff ${45}%, white 100%)`;

go.addEventListener('click', togglePlay);
videoGo.addEventListener('click', togglePlay);
videoPlay.addEventListener('click', togglePlay);
videoPlay.addEventListener('timeupdate', videoProgress);
finish.addEventListener('click', toFinish);
start.addEventListener('click', toStart);
btnBack.addEventListener('click', toBack);
btnForward.addEventListener('click', toForward);

function changeAudio() {
  if (audio_) {
    audioImg.classList.remove('audio_non');
    a_progress.style.background = `linear-gradient(to right, #710707
    0%, #710707 ${volume*100}%, #fff ${volume*100}%, white 100%)`;
    videoPlay.volume = volume;
    videoPlay.volume = volume * 100;
  } else {
    audioImg.classList.add('audio_non');
    a_progress.value = 0;
    a_progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${0}%, #fff ${0}%, white 100%)`;
    videoPlay.volume = 0;
  }
}

function toBack() {
  relation = v_progress.value / videoPlay.currentTime;
  if (v_progress.value < 5 / relation) {
    toStart();
  } else {
    v_progress.value -= 5 / relation;
    videoPlay.currentTime -= 5;
  }
}

function toForward() {
  relation = v_progress.value / videoPlay.currentTime;
  if (v_progress.value >= 90 / relation) {
    toFinish();
  } else {
    v_progress.value += 10 / relation;
    videoPlay.currentTime += 10;
  }
}

function pause() { //ставим видео на паузу
  videoPlay.pause();
  go.classList.remove('pause');
  for (let item of videoIn) {
    item.classList.remove('hide');
  }
}

function unPause() { //снять с паузы
  videoPlay.play();
  go.classList.add('pause');
  for (let item of videoIn) {
    item.classList.add('hide');
  }
}

function toFinish() {
  videoPlay.currentTime = videoPlay.duration;
  v_progress.value = 100;
  pause();
  if (toggle_) {
    toggle_ = !toggle_;
  }
  afterDrag = false;
}

function toStart() {
  videoPlay.currentTime = 0;
  v_progress.value = 0;
  pause();
  if (toggle_) {
    toggle_ = !toggle_;
  }
  v_progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${0}%, #fff ${0}%, white 100%)`;
  afterDrag = false;
}

function togglePlay(e) {
  toggle_ = !toggle_; //для взаимодействия со слайдером
  const playState = videoPlay.paused ? 'play' : 'pause';
  videoPlay[playState](); // Call play or paused method 
  go.classList.toggle('pause');
  for (let item of videoIn) {
    item.classList.toggle('hide');
  }
  if (afterDrag) {
    videoPlay.currentTime = videoPlay.duration * position / 100;
  }
}

function videoProgress() { //Отображаем время воспроизведения
  progress = (Math.floor(videoPlay.currentTime) / (Math.floor(videoPlay.duration) / 100));
  v_progress.value = progress;
  v_progress.style.background = `linear-gradient(to right, #710707 0%,
    #710707 ${progress}%, #fff ${progress}%, white 100%)`;
}

myAudio.addEventListener('click', () => {
  audio_ = !audio_;
  changeAudio();
});

myScreen.addEventListener('click', () => {
  videoPlay.requestFullscreen();
});

v_progress.addEventListener('input', function () {
  videoPlay.removeEventListener('timeupdate', videoProgress);
  pause();
  const value = this.value;
  videoPlay.currentTime = value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
});

v_progress.addEventListener('change', () => {
  toggle_ = !toggle_; //для взаимодействия со слайдером
  videoPlay.addEventListener('timeupdate', videoProgress);
  position = v_progress.value;
  afterDrag = true;
});

a_progress.addEventListener('input', function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
  videoPlay.volume = this.value / 100;
  if (this.value <= 0.1) {
    audio_ = false;
    changeAudio();
  } else {
    audio_ = true;
    changeAudio();
  }
});

mySpeed.addEventListener('input', function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
  if (value <= 40) {
    videoPlay.playbackRate = 2 * value / 100;
  } else if (value > 40) {
    videoPlay.playbackRate = 6 * value / 100 - 2;
  }
});

function cancelFullscreen() {
  if (document.cancelFullScreen) {
    document.cancelFullScreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  }
}

function videoPlayAdjust() {
  if (videoPlay.playbackRate <= 0.8) {
    mySpeed.value = videoPlay.playbackRate * 50;
  }
  if (videoPlay.playbackRate > 0.8) {
    mySpeed.value = (videoPlay.playbackRate + 2) * 100 / 6;
  }
  mySpeed.style.background = `linear-gradient(to right, #710707 0%,
     #710707 ${mySpeed.value}%, #fff ${mySpeed.value}%, white 100%)`;
}

function audioAdjust() {
  a_progress.value = videoPlay.volume * 100;
  a_progress.style.background = `linear-gradient(to right, #710707
         0%, #710707 ${videoPlay.volume*100}%, #fff ${videoPlay.volume*100}%, white 100%)`;
}

document.addEventListener('keydown', event => {
  if (event.code === 'KeyM') {
    if (audio_) {
      volume = videoPlay.volume;
    }
    audio_ = !audio_;
    changeAudio();
  }
  if (event.key === ' ') {
    event.preventDefault();
    togglePlay();
  }
  if (event.key === '0') {
    toStart();
  }

  /*if (event.code === 'KeyF') {
    videoPlay.requestFullscreen();
    if (document.fullscreenEnabled || document.mozFullscreenEnabled || document.webkitFullscreenEnabled) {
      cancelFullscreen();
    } else {
      videoPlay.requestFullscreen();
    }
  }*/ // incorrect form for book tickets

  if (event.code === 'Period') {
    if (event.shiftKey) {
      if (videoPlay.playbackRate < 4) {
        videoPlay.playbackRate = videoPlay.playbackRate + 0.2;
      }
      videoPlayAdjust();
    }
  }
  if (event.code === 'Comma') {
    if (event.shiftKey) {
      if (videoPlay.playbackRate > 0.3) {
        videoPlay.playbackRate = videoPlay.playbackRate - 0.2;
      }
      videoPlayAdjust();
    }
  }

  if (event.code === 'ArrowUp') {
    if (videoPlay.volume < 0.9) {
      videoPlay.volume = videoPlay.volume * 1.1;
      audioAdjust();
    }
  }
  if (event.code === 'ArrowDown') {
    videoPlay.volume = videoPlay.volume / 1.1;
    audioAdjust();
  }
});