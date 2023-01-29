"use strict"

import playList from './playList.js';
console.log(playList);

let timeOfDay;

// Часы и календарь;

function showTime() {
   const time = document.querySelector('.time');
   const dateNow = new Date();
   const currentTime = dateNow.toLocaleTimeString();
   time.textContent = currentTime;
   showDate();
   getTimeOfDay();
   showGreeting();
   setTimeout(showTime, 1000);
};
showTime();

function showDate() {
   const date = document.querySelector('.date');
   const dateNow = new Date();
   const options = { weekday: 'long', month: 'long', day: 'numeric'};
   const currentDate = dateNow.toLocaleDateString('en-En', options);
   date.textContent = currentDate;
};

// Приветствие;

function getTimeOfDay() {
   const date = new Date();
   const hours = date.getHours();
   if (0 <= hours && hours < 6) {
      timeOfDay = 'night';
   };
   if (6 <= hours && hours < 12) {
      timeOfDay = 'morning';
   };
   if (12 <= hours && hours < 18) {
      timeOfDay =  'afternoon';
   };
   if (18 <= hours && hours < 24) {
      timeOfDay = 'evening';
   };
};

function showGreeting() {
   const greetingText = document.querySelector('.greeting');
   greetingText.textContent = `Good ${timeOfDay}`;
}

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

async function getWeather() {  
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=7fc8479d420477b3afca25c033208929&units=metric`;  
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
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${Math.floor(data.main.temp)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      weatherError.textContent = '';
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

const changeQuote = document.querySelector('.change-quote');
changeQuote.addEventListener('click', getQuotes)

async function getQuotes() {  
   const quote = document.querySelector('.quote');
   const author = document.querySelector('.author');
   const quotes = 'data.json';
   const res = await fetch(quotes);
   const data = await res.json(); 
   let num = Math.floor(Math.random() * 20);
   quote.textContent = `"${data[num].text}"`;
   author.textContent = data[num].author;
 }
 getQuotes();


// 6. Аудиоплеер

let isPlay = false;
let playNum = 0;
const audio = new Audio();
const playBtn = document.querySelector('.play');
const playNextBtn = document.querySelector('.play-next');
const playPrevBtn = document.querySelector('.play-prev');
playBtn.addEventListener('click', playAudio);

function playAudio() {
  //audio.src = 'https://7oom.ru/audio/naturesounds/07%20Birds%20(7oom.ru).mp3';
  let styleActive = document.querySelector(`.num${playNum}`);
  styleActive.classList.add('item-active');
  console.log(styleActive);
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  if(!isPlay) {
  audio.play();
  isPlay = true;
  playBtn.classList.toggle('pause');
  } else {
   audio.pause();
   isPlay = false;
   playBtn.classList.toggle('pause');
  }
};

playNextBtn.addEventListener('click', playNext);
function playNext() {
   if (playNum < 3) {
      playNum++;
      playAudio();
   } else {
      playNum = 0;
      playAudio();
   }
   console.log(playNum)
};

playPrevBtn.addEventListener('click', playPrev);
function playPrev() {
   if (playNum > 0) {
      playNum--;
      playAudio();
   } else {
      playNum = 3;
      playAudio();
   }
   console.log(playNum)
};


// const playList = [
//    {      
//      title: 'Aqua Caelestis',
//      src: 'assets/sounds/Aqua Caelestis.mp3',
//      duration: '00:39'
//    },  
//    {      
//      title: 'Ennio Morricone',
//      src: 'assets/sounds/Ennio Morricone.mp3',
//      duration: '01:37'
//    },
//    {      
//       title: 'River Flows In You',
//       src: 'assets/sounds/River Flows In You.mp3',
//       duration: '01:37'
//     },  
//     {      
//       title: 'Summer Wind',
//       src: 'assets/sounds/Summer Wind.mp3',
//       duration: '01:50'
//     }
//  ];

for(let i = 0; i < playList.length; i++) {
   const li = document.createElement('li');
   const playListContainer = document.querySelector('.play-list');
   li.classList.add('play-item');
   li.textContent = playList[i].title;
   playListContainer.append(li);
   console.log(playList[i].title)
 }
