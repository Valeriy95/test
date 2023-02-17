"use strict"

import playList from './playList.js';

const todoInput = document.querySelector(".todo-input input");
const btnPenComp = document.querySelectorAll(".btn-pen-comp span");
const list = document.querySelector(".list-container");
const clearBtn = document.querySelector(".btn-clear");
const progressBtn = document.querySelector(".progress-btn");
const doneBtn = document.querySelector(".done-btn");

let editNumber;
let isEditedInput = false;
let todoListArr = JSON.parse(localStorage.getItem("todoList"));

progressBtn.addEventListener("click", () => {
   progressBtn.classList.add("active");
   doneBtn.classList.remove("active");
   showList("progress");
});

doneBtn.addEventListener("click", () => {
   doneBtn.classList.add("active");
   progressBtn.classList.remove("active");
   showList("done");
});

function statusss () {
   alert('Hello')
}

function showList(btn) {
   let li = "";
   if(todoListArr) {
      todoListArr.forEach((value, index) => {
         let isDone = value.status == "done" ? "checked" : "";
         if(btn == value.status) {
            li += `<li class="item ">
                     <label for="${index}">
                        <input onclick=" function sss (${this}) { 
                        let blocName = selected.parentElement.lastElementChild;
                        if(selected.checked) {
                           blocName.classList.add("checked");      
                           todoListArr[selected.id].status = "done";
                        } else {
                           blocName.classList.remove("checked");
                           todoListArr[selected.id].status = "progress";
                        }
                           localStorage.setItem("todoList", JSON.stringify(todoListArr)) }" type="checkbox" id="${index}" ${isDone}>
                        <p class="${isDone}">${value.name}</p>
                     </label>
                     <div class="settings-todo">
                        <p onclick="showMenu(this)">...</p>
                        <ul class="item-menu">
                           <li onclick="editInput(${index}, '${value.name}')">Edit</li>
                           <li onclick="deleteInput(${index})">Delete</li>
                        </ul>
                     </div>
                  </li>`;
         }
      });
   }
   list.innerHTML = li || `<span>No todos yet</span>`;
}
showList("progress");

function showMenu(selected) {
   let containerMenu = selected.parentElement.lastElementChild;
   containerMenu.classList.add("show");
   document.addEventListener("click", e => {
      if(e.target.tagName != "P" || e.target != selected) {
         containerMenu.classList.remove("show");
      }
   })
}

function editInput(taskNumber, valueName) {
   editNumber = taskNumber;
   isEditedInput = true;
   todoInput.value = valueName;
}

function deleteInput(deleteNumber) {
   todoListArr.splice(deleteNumber, 1);
   localStorage.setItem("todoList", JSON.stringify(todoListArr));
   showList("progress");
} 

clearBtn.addEventListener("click", () => {
   todoListArr.splice(0, todoListArr.length);
   localStorage.setItem("todoList", JSON.stringify(todoListArr));
   showList("progress");
});

// function status(selected) {
//    let blocName = selected.parentElement.lastElementChild;
//    if(selected.checked) {
//       blocName.classList.add("checked");
//       todoListArr[selected.id].status = "done";
//    } else {
//       blocName.classList.remove("checked");
//       todoListArr[selected.id].status = "progress";
//    }
//    localStorage.setItem("todoList", JSON.stringify(todoListArr)); 
// };

todoInput.addEventListener("keyup", e => {
   let userInput = todoInput.value.trim();
   if(e.key == "Enter" && userInput) {
      if(!isEditedInput) {
         if (!todoListArr) {
            todoListArr = [];
         }
         let userInfo = {name: userInput, status: "progress"};
         todoListArr.push(userInfo);
      } else {
         isEditedInput = false;
         todoListArr[editNumber].name = userInput;
      }
      todoInput.value = "";
      localStorage.setItem("todoList", JSON.stringify(todoListArr));
      progressBtn.classList.add("active");
      doneBtn.classList.remove("active");
      showList("progress");
   }
});



let isRus = false;
let timeOfDay;
let timeOfDay1;
const greetingTranslation = {
en : [['Good night'], ['Good morning'], ['Good afternoon'], ['Good evening']],
ru : [['Доброй ночи'], ['Доброе утро'], ['Добрый день'], ['Добрый вечер']]
};
// Часы и календарь;

function status(selected) {
   let blocName = selected.parentElement.lastElementChild;
   if(selected.checked) {
      blocName.classList.add("checked");
      todoListArr[selected.id].status = "done";
   } else {
      blocName.classList.remove("checked");
      todoListArr[selected.id].status = "progress";
   }
   localStorage.setItem("todoList", JSON.stringify(todoListArr)); 
};



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
   if (changeImageAPI.value == 'github') {
     (randomNum < 20) ? randomNum++ : randomNum = 1;
      console.log(randomNum.toString().padStart(2, '0'));
      setBg(); 
   };
   if (changeImageAPI.value == 'unsplash') {
      getLinkToImageUnsplash(changeImageAPI.value);
   };
   if (changeImageAPI.value == 'flickr') {
      getLinkToImageUnsplash(changeImageAPI.value);  
   };
//    (randomNum < 20) ? randomNum++ : randomNum = 1;
//    console.log(randomNum.toString().padStart(2, '0'));
//    setBg();
};

const slidePrev = document.querySelector('.slide-prev');
slidePrev.addEventListener('click', getSlidePrev);

function getSlidePrev() {
   if (changeImageAPI.value == 'github') {
      (randomNum > 1) ? randomNum-- : randomNum = 20;
      console.log(randomNum.toString().padStart(2, '0'));
      setBg();
   };
   if (changeImageAPI.value == 'unsplash') {
      getLinkToImageUnsplash(changeImageAPI.value);
   };
   if (changeImageAPI.value == 'flickr') {
      getLinkToImageUnsplash(changeImageAPI.value);  
   };
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

async function getQuotesEn() {  
   const quotes = 'dataRus.json';
   const res = await fetch(quotes);
   const data = await res.json(); 
   quote.textContent = `"${data[num].text}"`;
   author.textContent = data[num].author;
}

async function getQuotesRu() {  
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

function changeLanguagesEnRu (str) {
   const languages = document.querySelector('.languages');
   const imageCollection = document.querySelector('.image-collection');
   const hideBlock = document.querySelector('.hide-block');
   const tagBtn1 = document.querySelector('.tagBtn1');
   const tagBtn2 = document.querySelector('.tagBtn2');
   if (str == 'ru') {
      isRus = true;
      showGreeting('ru');
      getWeather('ru');
      showDate('ru');
      console.log('clickRU');
      if (names.value == '[Enter name]') {
         names.value = 'Введите имя';
      };
      if (city.value == 'Minsk') {
         city.value = 'Минск';
      };
      getQuotesEn();
      languages.textContent = 'Язык';
      imageCollection.textContent = 'Коллекция изображений';
      hideBlock.textContent = 'Скрыть/показать блоки';
      tagBtn1.textContent = 'Тег';
      tagBtn2.textContent = 'Тег';
      };
   if (str == 'en') {
      isRus = false;
      showGreeting('en');
      getWeather('en');
      showDate('en');
      console.log('clickEN');
       if (names.value == 'Введите имя') {
         names.value = '[Enter name]';
      };
      if (city.value == 'Минск') {
         city.value = 'Minsk';
      };
      getQuotesRu();
      languages.textContent = 'Language';
      imageCollection.textContent = 'Image collection';
      hideBlock.textContent = 'Hide/show blocks';
      tagBtn1.textContent = 'Tag';
      tagBtn2.textContent = 'Tag';
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
      changeLanguagesEnRu (chancelanguage.value);
      localStorage.setItem('chancelanguage', chancelanguage.value);
      console.log('RU');
   } else if (chancelanguage.value == 'en') {
      changeLanguagesEnRu (chancelanguage.value);
      localStorage.setItem('chancelanguage', chancelanguage.value);
      console.log('EN');
   }
}));

// function setLocalLanguage() {
//    localStorage.setItem('chancelanguage', chancelanguage.value);
//  };
//  window.addEventListener('beforeunload', setLocalLanguage);

function getLocalLanguage() {
   if(localStorage.getItem('chancelanguage')) {
     chancelanguage.value = localStorage.getItem('chancelanguage');
     changeLanguagesEnRu (chancelanguage.value);
   }
 };
window.addEventListener('load', getLocalLanguage);
   

//  9. Получение фонового изображения от API
let timeOfDayUnsplash;
let timeOfDayFlickr;

async function getLinkToImageUnsplash(changeImageAPI) {
   if (changeImageAPI == 'unsplash') {
      if(timeOfDayUnsplash == null || timeOfDayUnsplash == '' || timeOfDayUnsplash == undefined) {
         timeOfDayUnsplash = timeOfDay;
         console.log('timeOfDayUnsplash-null');
       };
      const url = `https://api.unsplash.com/photos/random?query=${timeOfDayUnsplash}&client_id=TjmnzbgMoc-UhW_LILGZgsS9p_rcXLjTsy9L22RGQ6Y`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data.urls.regular);
      const body = document.querySelector('body');
      let img = new Image();
      img.src = data.urls.regular;
      img.onload = () => {      
         body.style.background = `url(${data.urls.regular}) center/cover, rgba(0, 0, 0, 0.5)`;
      }; 
      console.log('timeOfDayUnsplash');
   } 
   if (changeImageAPI == 'flickr') {
      if(timeOfDayFlickr == null || timeOfDayFlickr == '' || timeOfDayFlickr == undefined) {
         timeOfDayFlickr = timeOfDay;
         console.log('timeOfDayFlickr-null');
       };
      const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=ead20d55cac86a7c2b92802520507b81&tags=${timeOfDayFlickr}&extras=url_l&format=json&nojsoncallback=1`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      console.log(data.photos);
      console.log(data.photos.photo);
      let ranNum = Math.floor(Math.random() * 97 + 1);
      console.log(data.photos.photo[ranNum].url_l);
      const body = document.querySelector('body');
      let img = new Image();
      img.src = data.photos.photo[ranNum].url_l;
      img.onload = () => {      
         body.style.background = `url(${data.photos.photo[ranNum].url_l}) center/cover, rgba(0, 0, 0, 0.5)`;
      }; 
      console.log('timeOfDayFlickr');
      }
 };


const changeImageAPI = document.querySelectorAll('input[type=radio][name="imgcollection"]');
changeImageAPI.forEach(changeImageAPI => changeImageAPI.addEventListener('change', function changeAPI () {
   if(changeImageAPI.value == 'github') {
      localStorage.setItem('changeImageAPI', changeImageAPI.value);
      getLocalImageAPI();
      setBg();
      console.log('github');
   } else if (changeImageAPI.value == 'unsplash') {
      localStorage.setItem('changeImageAPI', changeImageAPI.value);
      getLinkToImageUnsplash(changeImageAPI.value);
      getLocalImageAPI();
      console.log('unsplash');
   } else if (changeImageAPI.value == 'flickr') {
      localStorage.setItem('changeImageAPI', changeImageAPI.value);
      getLinkToImageUnsplash(changeImageAPI.value);
      getLocalImageAPI();
      console.log('flickr');
   }
}));

function getLocalImageAPI() {
   if(localStorage.getItem('changeImageAPI')) {
     changeImageAPI.value = localStorage.getItem('changeImageAPI');
     getLinkToImageUnsplash(changeImageAPI.value);
   }
 };
window.addEventListener('load', getLocalImageAPI);


const tagBtn1 = document.querySelector('.tagBtn1');
const tagBtn2 = document.querySelector('.tagBtn2');
tagBtn1.addEventListener('click', tagChangeUnsplash);
tagBtn2.addEventListener('click', tagChangeFlickr);

function tagChangeUnsplash () {
   getLocalLanguage()
   if (chancelanguage.value == 'ru') {
      timeOfDayUnsplash = prompt('Введите тег для Unsplash API. Например: природа')
   }
   if (chancelanguage.value == 'en') {
      timeOfDayUnsplash = prompt('Enter tag for Unsplash API. For example: nature');
   }
//    timeOfDayUnsplash = prompt('Введите тег для Unsplash API');
   getLinkToImageUnsplash(changeImageAPI.value);
   console.log(timeOfDayUnsplash);
}

function tagChangeFlickr () {
   getLocalLanguage()
   if (chancelanguage.value == 'ru') {
      timeOfDayFlickr = prompt('Введите тег для Flickr API. Например: природа');
   }
   if (chancelanguage.value == 'en') {
      timeOfDayFlickr = prompt('Enter tag for Flickr API. For example: nature');
   }
//    timeOfDayFlickr = prompt('Введите тег для Flickr API');
   getLinkToImageUnsplash(changeImageAPI.value);
   console.log(timeOfDayFlickr);
}


const hideBlocBtn = document.querySelector('.hide-block');
const hideContainer = document.querySelector('.hide-block-container');
const hideBlocCloseBtn = document.querySelector('.hide-bloc-close');
const closeIconHide1 = document.querySelector('.close-icon-hide1');
const closeIconHide2 = document.querySelector('.close-icon-hide2');

hideBlocCloseBtn.addEventListener('click', hideBlocClose);
closeIconHide1.addEventListener('click', hideBlocClose);
closeIconHide2.addEventListener('click', hideBlocClose);

hideBlocBtn.addEventListener('click', hideBlocOpen);


function hideBlocOpen () {
   hideContainer.classList.remove('hidden');
};

function hideBlocClose () {
   hideContainer.classList.add('hidden');
}

// const hideBlocTimeBtn = document.querySelector('.hide-bloc-time');
// hideBlocTimeBtn.addEventListener('click', hideBlocOpenCloseTime);

// function hideBlocOpenCloseTime () {
//    const time = document.querySelector('.time');
//    time.classList.toggle('opacity-bloc');
// }

// let isHideTime = true;


// function getchangeHideTime() {
//    if(localStorage.getItem('chHideTime')) {
//      chHideTime.value = localStorage.getItem('chHideTime');
// //     changeHideTime ()
//    }
//  };
// window.addEventListener('load', getchangeHideTime);


const chHideTime = document.querySelector('input[type=checkbox][name="time"]');
chHideTime.addEventListener('change', changeHideTime);
                                                                            
const chHideDate = document.querySelector('input[type=checkbox][name="date"]');
chHideDate.addEventListener('click', changeHideDate);

const chHideGreeting = document.querySelector('input[type=checkbox][name="greeting"]');
chHideGreeting.addEventListener('change', changeHideGreeting);

const chHideQuote = document.querySelector('input[type=checkbox][name="quote"]');
chHideQuote.addEventListener('change', changeHideQuote);

const chHideWeather = document.querySelector('input[type=checkbox][name="weather"]');
chHideWeather.addEventListener('change', changeHideWeather);

const chHideAudio = document.querySelector('input[type=checkbox][name="audio"]');
chHideAudio.addEventListener('change', changeHideAudio);

// const chHideTodolist = document.querySelector('input[type=checkbox][name="todolist"]');
// chHideTodolist.addEventListener('change', changeHide);

function changeHideTime () {
   const time = document.querySelector('.time');
   time.classList.toggle('opacity-bloc');

   if (time.classList.contains('opacity-bloc') == true) {
      time.classList.add('opacity-bloc');
      localStorage.setItem('chHideTime', chHideTime.value);
   } else {
      time.classList.remove('opacity-bloc');
      localStorage.removeItem('chHideTime');
   }
};


function changeHideDate () { 
   const date = document.querySelector('.date');
   date.classList.toggle('opacity-bloc');
   if(date.classList.contains('opacity-bloc') == true) {
      date.classList.add('opacity-bloc');
      localStorage.setItem('chHideDate', chHideDate.value);
   } else {
      date.classList.remove('opacity-bloc');
      localStorage.removeItem('chHideDate');
   }
};


function changeHideGreeting () {
   const greeting = document.querySelector('.greeting-container');
   greeting.classList.toggle('opacity-bloc');
   if(greeting.classList.contains('opacity-bloc') == true) {
      greeting.classList.add('opacity-bloc');
      localStorage.setItem('chHideGreeting', chHideGreeting.value);
   } else {
      greeting.classList.remove('opacity-bloc');
      localStorage.removeItem('chHideGreeting');
   }
};

function changeHideQuote () {
   const quote = document.querySelector('.quote');
   const author = document.querySelector('.author');
   const changeQuote = document.querySelector('.change-quote');
   quote.classList.toggle('opacity-bloc');
   author.classList.toggle('opacity-bloc');
   changeQuote.classList.toggle('opacity-bloc');
   if(quote.classList.contains('opacity-bloc') == true && author.classList.contains('opacity-bloc') == true && changeQuote.classList.contains('opacity-bloc') == true) {
      quote.classList.add('opacity-bloc');
      author.classList.add('opacity-bloc');
      changeQuote.classList.add('opacity-bloc');
      localStorage.setItem('chHideQuote', chHideQuote.value);
   } else {
      quote.classList.remove('opacity-bloc');
      author.classList.remove('opacity-bloc');
      changeQuote.classList.remove('opacity-bloc');
      localStorage.removeItem('chHideQuote');
   }
};

function changeHideWeather () {
   const weather = document.querySelector('.weather');
   weather.classList.toggle('opacity-bloc');
   if(weather.classList.contains('opacity-bloc') == true) {
      weather.classList.add('opacity-bloc');
      localStorage.setItem('chHideWeather', chHideWeather.value);
   } else {
      weather.classList.remove('opacity-bloc');
      localStorage.removeItem('chHideWeather');
   }
};

function changeHideAudio () {
   const player = document.querySelector('.player');
   const wrapperPlayer = document.querySelector('.wrapper-player');
   player.classList.toggle('opacity-bloc');
   wrapperPlayer.classList.toggle('opacity-bloc');
   if(player.classList.contains('opacity-bloc') == true && wrapperPlayer.classList.contains('opacity-bloc') == true) {
      player.classList.add('opacity-bloc');
      wrapperPlayer.classList.add('opacity-bloc');
      localStorage.setItem('chHideAudio', chHideAudio.value);
   } else {
      player.classList.remove('opacity-bloc');
      wrapperPlayer.classList.remove('opacity-bloc');
      localStorage.removeItem('chHideAudio');
   }
};



function getchangeHideTime() {
   if(localStorage.getItem('chHideTime')) {
     chHideTime.value = localStorage.getItem('chHideTime');
     changeHideTime ()
   }
 };
window.addEventListener('load', getchangeHideTime);

function getchangeHideDate() {
   if(localStorage.getItem('chHideDate')) {
     chHideDate.value = localStorage.getItem('chHideDate');
     changeHideDate ()
   }
 };
window.addEventListener('load', getchangeHideDate);

function getchangeHideGreeting() {
   if(localStorage.getItem('chHideGreeting')) {
     chHideGreeting.value = localStorage.getItem('chHideGreeting');
     changeHideGreeting ()
   }
 };
window.addEventListener('load', getchangeHideGreeting);

function getchangeHideQuote() {
   if(localStorage.getItem('chHideQuote')) {
     chHideQuote.value = localStorage.getItem('chHideQuote');
     changeHideQuote ()
   }
 };
window.addEventListener('load', getchangeHideQuote);

function getchangeHideWeather() {
   if(localStorage.getItem('chHideWeather')) {
     chHideWeather.value = localStorage.getItem('chHideWeather');
     changeHideWeather ()
   }
 };
window.addEventListener('load', getchangeHideWeather);

function getchangeHideAudio() {
   if(localStorage.getItem('chHideAudio')) {
    chHideAudio.value = localStorage.getItem('chHideAudio');
     changeHideAudio ()
   }
 };
window.addEventListener('load', getchangeHideAudio);


// 11. Todo list

const todoListIcon = document.querySelector('.todo-icon');
const todoListContainer = document.querySelector('.wrapper-todo');
todoListIcon.addEventListener('click', openCloseTodoList);

function openCloseTodoList () {
   todoListContainer.classList.toggle('hidden');
}

// const todoInput = document.querySelector(".todo-input input");
// const btnPenComp = document.querySelectorAll(".btn-pen-comp span");
// const list = document.querySelector(".list-container");
// const clearBtn = document.querySelector(".btn-clear");
// const progressBtn = document.querySelector(".progress-btn");
// const doneBtn = document.querySelector(".done-btn");

// let editNumber;
// let isEditedInput = false;
// let todoListArr = JSON.parse(localStorage.getItem("todoList"));

// progressBtn.addEventListener("click", () => {
//    progressBtn.classList.add("active");
//    doneBtn.classList.remove("active");
//    showList("progress");
// });

// doneBtn.addEventListener("click", () => {
//    doneBtn.classList.add("active");
//    progressBtn.classList.remove("active");
//    showList("done");
// });

// function statusss () {
//    alert('Hello')
// }

// function showList(btn) {
//    let li = "";
//    if(todoListArr) {
//       todoListArr.forEach((value, index) => {
//          let isDone = value.status == "done" ? "checked" : "";
//          if(btn == value.status) {
//             li += `<li class="item ">
//                      <label for="${index}">
//                         <input onclick="statusss" type="checkbox" id="${index}" ${isDone}>
//                         <p class="${isDone}">${value.name}</p>
//                      </label>
//                      <div class="settings-todo">
//                         <p onclick="showMenu(this)">...</p>
//                         <ul class="item-menu">
//                            <li onclick="editInput(${index}, '${value.name}')">Edit</li>
//                            <li onclick="deleteInput(${index})">Delete</li>
//                         </ul>
//                      </div>
//                   </li>`;
//          }
//       });
//    }
//    list.innerHTML = li || `<span>No todos yet</span>`;
// }
// showList("progress");

// function showMenu(selected) {
//    let containerMenu = selected.parentElement.lastElementChild;
//    containerMenu.classList.add("show");
//    document.addEventListener("click", e => {
//       if(e.target.tagName != "P" || e.target != selected) {
//          containerMenu.classList.remove("show");
//       }
//    })
// }

// function editInput(taskNumber, valueName) {
//    editNumber = taskNumber;
//    isEditedInput = true;
//    todoInput.value = valueName;
// }

// function deleteInput(deleteNumber) {
//    todoListArr.splice(deleteNumber, 1);
//    localStorage.setItem("todoList", JSON.stringify(todoListArr));
//    showList("progress");
// } 

// clearBtn.addEventListener("click", () => {
//    todoListArr.splice(0, todoListArr.length);
//    localStorage.setItem("todoList", JSON.stringify(todoListArr));
//    showList("progress");
// });

// // function status(selected) {
// //    let blocName = selected.parentElement.lastElementChild;
// //    if(selected.checked) {
// //       blocName.classList.add("checked");
// //       todoListArr[selected.id].status = "done";
// //    } else {
// //       blocName.classList.remove("checked");
// //       todoListArr[selected.id].status = "progress";
// //    }
// //    localStorage.setItem("todoList", JSON.stringify(todoListArr)); 
// // };

// todoInput.addEventListener("keyup", e => {
//    let userInput = todoInput.value.trim();
//    if(e.key == "Enter" && userInput) {
//       if(!isEditedInput) {
//          if (!todoListArr) {
//             todoListArr = [];
//          }
//          let userInfo = {name: userInput, status: "progress"};
//          todoListArr.push(userInfo);
//       } else {
//          isEditedInput = false;
//          todoListArr[editNumber].name = userInput;
//       }
//       todoInput.value = "";
//       localStorage.setItem("todoList", JSON.stringify(todoListArr));
//       progressBtn.classList.add("active");
//       doneBtn.classList.remove("active");
//       showList("progress");
//    }
// });
