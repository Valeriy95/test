"use strict"

import playList from './playList.js';
let isRus = false;
let timeOfDay;
let timeOfDay1;
const greetingTranslation = {
en : [['Good night'], ['Good morning'], ['Good afternoon'], ['Good evening']],
ru : [['Доброй ночи'], ['Доброе утро'], ['Добрый день'], ['Добрый вечер']]
};
// Часы и календарь;

function showTime() {
   const time = document.querySelector('.time');
   const dateNow = new Date();
   const currentTime = dateNow.toLocaleTimeString();
   time.textContent = currentTime;
//    showDate();
   getTimeOfDay();
//    showGreeting();
   setTimeout(showTime, 1000);
};
showTime();

function showDate(lang = 'en') {
   const date = document.querySelector('.date');
   const dateNow = new Date();
   const options = { weekday: 'long', month: 'long', day: 'numeric'};
   let currentDate;
   if (lang == 'ru') {
      currentDate = dateNow.toLocaleDateString('ru-Ru', options);
   } else {
      currentDate = dateNow.toLocaleDateString('en-En', options);
   }
   date.textContent = currentDate;
};
showDate();

// Приветствие;

function getTimeOfDay() {
   const date = new Date();
   const hours = date.getHours();
   if (0 <= hours && hours < 6) {
      timeOfDay = 'night';
      timeOfDay1 = 0;
   };
   if (6 <= hours && hours < 12) {
      timeOfDay = 'morning';
      timeOfDay1 = 1;
   };
   if (12 <= hours && hours < 18) {
      timeOfDay =  'afternoon';
      timeOfDay1 = 2;
   };
   if (18 <= hours && hours < 24) {
      timeOfDay = 'evening';
      timeOfDay1 = 3;
   };
};

// function showGreeting(en) {
//    const greetingText = document.querySelector('.greeting');
//    greetingText.textContent = `Good ${timeOfDay}`;
// }


function showGreeting(lang = 'en') {
   const greetingText = document.querySelector('.greeting');
   greetingText.textContent = greetingTranslation[lang][timeOfDay1];
}
showGreeting();

const names = document.querySelector('.names');
function removeValue () {
   names.value = '';
};
names.addEventListener('click', removeValue)

function setLocalStorage() {
   localStorage.setItem('names', names.value);
 };
 window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
   if(localStorage.getItem('names')) {
     names.value = localStorage.getItem('names');
   }
 };
window.addEventListener('load', getLocalStorage);

// Слайдер изображений

let randomNum;

function getRandomNum() {
   randomNum = Math.floor(Math.random() * 20 + 1).toString().padStart(2, '0');
};
getRandomNum();


function setBg() {
   const body = document.querySelector('body');
   let img = new Image();
   img.src = `https://raw.githubusercontent.com/Valeriy95/stage1-tasks/assets/images/${timeOfDay}/${randomNum.toString().padStart(2, '0')}.webp`;
   img.onload = () => {      
      body.style.background = `url('https://raw.githubusercontent.com/Valeriy95/stage1-tasks/assets/images/${timeOfDay}/${randomNum.toString().padStart(2, '0')}.webp') center/cover, rgba(0, 0, 0, 0.5)`;
  }; 
}

setBg();

const slideNext = document.querySelector('.slide-next');
slideNext.addEventListener('click', getSlideNext);

function getSlideNext() {
   (randomNum < 20) ? randomNum++ : randomNum = 1;
   console.log(randomNum.toString().padStart(2, '0'));
   setBg();
};

const slidePrev = document.querySelector('.slide-prev');
slidePrev.addEventListener('click', getSlidePrev);

function getSlidePrev() {
   (randomNum > 1) ? randomNum-- : randomNum = 20;
   console.log(randomNum.toString().padStart(2, '0'));
   setBg();
};

// Виджет погоды

const city = document.querySelector('.city');
city.addEventListener('change', change);
city.value = 'Minsk';

async function getWeather(lang = 'en') {  
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=7fc8479d420477b3afca25c033208929&units=metric`;  
   console.log(url)
   const weatherIcon = document.querySelector('.weather-icon');
   const temperature = document.querySelector('.temperature');
   const weatherDescription = document.querySelector('.weather-description');
   const wind = document.querySelector('.wind');
   const humidity = document.querySelector('.humidity');
   const weatherError = document.querySelector('.weather-error');
   const res = await fetch(url);
   const data = await res.json(); 
   if(data.name === undefined) {
      weatherIcon.className = 'weather-icon owf';
      temperature.textContent = '';
      weatherDescription.textContent = '';
      wind.textContent = '';
      humidity.textContent = '';
      weatherError.textContent = `Error! city not found for '${city.value}'`;
   } else {
//       weatherIcon.className = 'weather-icon owf';
//       weatherIcon.classList.add(`owf-${data.weather[0].id}`);
//       temperature.textContent = `${Math.floor(data.main.temp)}°C`;
//       weatherDescription.textContent = data.weather[0].description;
//       wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
//       humidity.textContent = `Humidity: ${data.main.humidity}%`;
//       weatherError.textContent = '';
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${Math.floor(data.main.temp)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      weatherError.textContent = '';
      if(lang == 'ru') {
         wind.textContent = `Скорость ветра: ${Math.floor(data.wind.speed)} м/с`;
         humidity.textContent = `Влажность: ${data.main.humidity}%`;
      } else {
         wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
         humidity.textContent = `Humidity: ${data.main.humidity}%`;
      }
   }
 };
 getWeather();

function change() {
 getWeather();
};

function setLocalWeather() {
   localStorage.setItem('city', city.value);
 };
 window.addEventListener('beforeunload', setLocalWeather);

function getLocalWeather() {
   if(localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
      getWeather();
   }
 };
window.addEventListener('load', getLocalWeather);


// Виджет цитата дня 

   const quote = document.querySelector('.quote');
   const author = document.querySelector('.author');
   let num;

const changeQuote = document.querySelector('.change-quote');
changeQuote.addEventListener('click', getQuotes)


async function getQuotes() {  
//    const quote = document.querySelector('.quote');
//    const author = document.querySelector('.author');
   let quotes;
   if (isRus == false) {
      quotes = 'data.json';
   } else {
      quotes = 'dataRus.json';
   }
//    const quotes = 'data.json';
   const res = await fetch(quotes);
   const data = await res.json(); 
   num = Math.floor(Math.random() * 20);
   quote.textContent = `"${data[num].text}"`;
   author.textContent = data[num].author;
 }
 getQuotes();

async function getQuotesTest() {  
   const quotes = 'dataRus.json';
   const res = await fetch(quotes);
   const data = await res.json(); 
   quote.textContent = `"${data[num].text}"`;
   author.textContent = data[num].author;
}

async function getQuotesTest2() {  
   const quotes = 'data.json';
   const res = await fetch(quotes);
   const data = await res.json(); 
   quote.textContent = `"${data[num].text}"`;
   author.textContent = data[num].author;
}


// 6. Аудиоплеер


let isPlay = false;
let playNum = 0;
const audio = new Audio();
const playBtn = document.querySelector('.play');
const playNextBtn = document.querySelector('.play-next');
const playPrevBtn = document.querySelector('.play-prev');
const songname = document.querySelector('.song-name');
const songDuraction = document.querySelector('.song-duraction');
const wrapperPlayer = document.querySelector('.wrapper-player');

const playBtnPl = document.querySelector('.btn-play-pl');
const playNextBtnPl = document.querySelector('.btn-next-pl');
const playPrevBtnPl = document.querySelector('.btn-prev-pl');


playBtn.addEventListener('click', playAudio);
playBtnPl.addEventListener('click', playAudio);
function playAudio() {
  let styleActive = document.querySelector(`.num${playNum}`);
  styleActive.classList.add('item-active');
  wrapperPlayer.classList.remove('hidden');
  
  songname.textContent = playList[playNum].title;
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  if(!isPlay) {
  audio.play();
  isPlay = true;
  playBtn.classList.add('pause');
  playBtnPl.classList.add('pause');   
  } else {
   audio.pause();
   isPlay = false;
   playBtn.classList.remove('pause');
   playBtnPl.classList.remove('pause');
  }
};

function songTime() {
   songDuraction.textContent = `${currentTimeDuration(audio.currentTime)} / ${currentTimeDuration(audio.duration)}`;
   setTimeout(songTime, 1000);
};
songTime();

function currentTimeDuration(seconds) {
   let sec = Math.floor(seconds);
   let min = Math.floor(sec / 60);
   min = min >= 10 ? min : '' + min;
   sec = Math.floor(sec % 60);
   sec = sec >=10 ? sec : '0' + sec;
   return min + ':' + sec;
}

playNextBtn.addEventListener('click', playNext);
playNextBtnPl.addEventListener('click', playNext);

function playNext() {
  console.log(playList[playNum].title);
  let styleActive = document.querySelector(`.num${playNum}`);
  styleActive.classList.remove('item-active');
   if (playNum < 3) {
      playNum++;
      isPlay = false;
      playAudio();
   } else {
      playNum = 0;
      isPlay = false;
      playAudio();
   }
};

playPrevBtn.addEventListener('click', playPrev);
playPrevBtnPl.addEventListener('click', playPrev);

function playPrev() {
   let styleActive = document.querySelector(`.num${playNum}`);
   styleActive.classList.remove('item-active');
   if (playNum > 0) {
      playNum--;
      isPlay = false;
      playAudio();
   } else {
      playNum = 3;
      isPlay = false;
      playAudio();
   }
};

for(let i = 0; i < playList.length; i++) {
   const li = document.createElement('li');
   const playListContainer = document.querySelector('.play-list');
   li.classList.add('play-item');
   li.classList.add(`num${[i]}`);
   li.textContent = playList[i].title;
   playListContainer.append(li);
 };


// Продвинутый аудиоплеер
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const volumeBtn = document.querySelector('.volume');
const range = document.querySelector('.range');
let counterVolume = 0;

function updateProgress (e) {
   const {duration, currentTime} = e.srcElement;
   const progressProcent = (currentTime / duration) * 100;
   progress.style.width = `${progressProcent}%`;
};

audio.addEventListener('timeupdate', updateProgress);

function setProgress(e) {
   const width = this.clientWidth;
   const clickX = e.offsetX;
   const duration = audio.duration;
   audio.currentTime = (clickX / width) * duration;
};

progressContainer.addEventListener("click", setProgress);

audio.addEventListener('ended', playNext);

range.addEventListener('change', function () {
   audio.volume = range.value / 100;
});

volumeBtn.addEventListener('click', volumeMuteBtn);

function volumeMuteBtn () {
  counterVolume++;
  if (counterVolume % 2 == 1) {
    audio.volume = 0;
    volumeBtn.style.opacity = '0.5';
  } 
  if (counterVolume % 2 == 0) {
    audio.volume = 1;
    volumeBtn.style.opacity = '1';
  }
};


// 8. Перевод приложения на два языка (en/ru или en/be);

// const settingBtn = document.querySelector('.setting');
// settingBtn.addEventListener('click', tests);

function tests (str) {
   if (str == 'ru') {
      isRus = true;
      showGreeting('ru');
      getWeather('ru');
      showDate('ru');
      console.log('clickRU');
      if (localStorage.getItem('names') == '[Enter name]' || localStorage.getItem('names') == '') {
         names.value = 'Введите имя';
      };
      if (localStorage.getItem('city') == 'Minsk' || localStorage.getItem('city') == '') {
         city.value = 'Минск';
      };
      getQuotesTest();
      };
   if (str == 'en') {
      isRus = false;
      showGreeting('en');
      getWeather('en');
      showDate('en');
      console.log('clickEN');
      if (localStorage.getItem('names') == 'Введите имя' || localStorage.getItem('names') == '') {
         names.value = '[Enter name]';
      };
      if (localStorage.getItem('city') == 'Минск' || localStorage.getItem('city') == '') {
         city.value = 'Minsk';
      };
      getQuotesTest2();
      }
//    isRus = true;
//    showGreeting('ru');
//    getWeather('ru');
//    showDate('ru')
//    console.log('click');
//    if (localStorage.getItem('names') == '[Enter name]' || localStorage.getItem('names') == '') {
//       names.value = 'Введите имя';
//    };
//    if (localStorage.getItem('city') == 'Minsk' || localStorage.getItem('city') == '') {
//       city.value = 'Минск';
//    };
//    getQuotesTest();
};
   

// 10. Настройки

const settingContainer = document.querySelector('.setting-container');
const settingIcon = document.querySelector('.setting-icon');
const closeIcon = document.querySelector('.close-icon1');
const closeIcon1 = document.querySelector('.close-icon1');
const closeIcon2 = document.querySelector('.close-icon2');
settingIcon.addEventListener('click', showSetCont);
closeIcon.addEventListener('click', closeSetCont);
closeIcon1.addEventListener('click', closeSetCont);
closeIcon2.addEventListener('click', closeSetCont);

function showSetCont () {
   settingContainer.classList.add('hide');
};

function closeSetCont () {
   settingContainer.classList.remove('hide');
};

const chancelanguage = document.querySelectorAll('input[type=radio][name="lang"]');
chancelanguage.forEach(chancelanguage => chancelanguage.addEventListener('change', function sur () {
   if(chancelanguage.value == 'ru') {
      tests (chancelanguage.value);
      console.log('RU');
   } else if (chancelanguage.value == 'en') {
      tests (chancelanguage.value);
      console.log('EN');
   }
}));
   
