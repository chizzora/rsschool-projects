const time = document.querySelector('.time');
const newdate = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const timeOfDay = getTimeOfDay();
const name = document.querySelector('.name');
const body = document.querySelector('body');
const nextSlide = document.querySelector('.slide-next');
const prevSlide = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuoteButton = document.querySelector('.change-quote');
const playPauseBtn = document.querySelector('.play');
const playNextBtn = document.querySelector('.play-next');
const playPrevBtn = document.querySelector('.play-prev');
const playListContainer = document.querySelector('.play-list');
const songName = document.querySelector('.song-name');
let randomNum, isPlay = false, playNum = 0, c = 0;
import playList from './playList.js';

let lang = localStorage.getItem('language');
if(!lang) {
    lang = 'en';
}

const quoteArr = [
    {
        "text": "Programming isn't about what you know; it's about what you can figure out",
        "author": "Chris Pine"
    },
    {
        "text": "The only way to learn a new programming language is by writing programs in it",
        "author": "Dennis Ritchie"
    },
    {
        "text": "Sometimes it's better to leave something alone, to pause, and that's very true of programming",
        "author": "Joyce Wheeler"
    },
    {
        "text": "underidoderidoderiododeriodoo",
        "author": "Winston Churchill"
    },
    {
        "text": "Testing leads to failure, and failure leads to understanding",
        "author": "Burt Rutan"
    },
    {
        "text": "The best error message is the one that never shows up",
        "author": "Thomas Fuchs"
    },
    {
        "text": "The most damaging phrase in the language is.. it's always been done this way",
        "author": "Grace Hopper"
    },
    {
        "text": "Everybody should learn to program a computer because it teaches you how to think",
        "author": "Steve Jobs"
    },
    {
        "text": "You might not think that programmers are artists, but programming is an extremely creative profession. It’s logic-based creativity",
        "author": "John Romero"
    },
    {
        "text": "IwbnfouevcmsiehwvudbqvGovernment",
        "author": "Winston Churchill"
    }
]

const quoteArrRu = [
    {
        "text": "Пишите код так, как будто сопровождать его будет склонный к насилию психопат, который знает, где вы живете",
        "author": "Стив Макконнелл"
    },
    {
        "text": "Сложность программы растет до тех пор, пока не превысит способности программиста",
        "author": "Артур Блох. Законы Мэрфи"
    },
    {
        "text": "Ходить по воде и разрабатывать программы, следуя ТЗ, очень просто… если они заморожены",
        "author": "И. Берард"
    },
    {
        "text": "Сначала решите проблему. Затем напишите код",
        "author": "Дж. Джонсон"
    },
    {
        "text": "В теории, теория и практика неразделимы. На практике это не так.",
        "author": "Йоги Берра"
    },
    {
        "text": "Язык, который не меняет вашего представления о программировании, недостоин изучения.",
        "author": "Алан Перлис"
    },
    {
        "text": "Если вы хотите, чтобы код было легко и быстро писать — делайте его удобным для чтения",
        "author": "Роберт Мартин"
    },
    {
        "text": "Простота — это необходимое условие надёжности",
        "author": "Эдсгер Дейкстра"
    },
    {
        "text": "Чем усерднее вы работаете, тем более удачливым вы становитесь",
        "author": "Томас Джефферсон"
    },
    {
        "text": "Сегодняшний специалист в чем-либо когда-то был новичком",
        "author": "Хелен Хейз"
    },
]

    let settings = {
      time: true,
      date: true,
      'greeting-container': true,
      quotes: true,
      player: true,
      weather: true,
    };

    if (localStorage.getItem('settings')) {
      settings = JSON.parse(localStorage.getItem('settings'));
    }

const translate = {
    en: {
        language: 'en-EN',
        morning: 'Good morning',
        afternoon: 'Good afternoon',
        evening: 'Good evening',
        night: 'Good night',
        placeholder: '[Enter name]',
        city: 'Minsk',
        windSpeed: 'Wind speed',
        windSpeedUnits: 'm/s',
        humidity: 'Humidity',
        weatherError1: 'Error! City not found for',
        weatherError2: '',
        quoteArr: quoteArr,
        setLang: 'Change language',
        setTime: 'Time',
        setDate: 'Date',
        setGreeting: 'Greeting',
        setWeather: 'Weather',
        setQuotes: 'Quotes',
        setAudioplayer: 'Audioplayer'
    },
    ru: {
        language: 'ru-RU',
        morning: 'Доброе утро',
        afternoon: 'Добрый день',
        evening: 'Добрый вечер',
        night: 'Доброй ночи',
        placeholder: '[Введите имя]',
        city: 'Минск',
        windSpeed: 'Скорость ветра',
        windSpeedUnits: 'м/с',
        humidity: 'Влажность',
        weatherError1: 'Ошибка! Город',
        weatherError2: ' не найден',
        quoteArr: quoteArrRu,
        setLang: 'Изменить язык',
        setTime: 'Время',
        setDate: 'Дата',
        setGreeting: 'Приветствие',
        setWeather: 'Погода',
        setQuotes: 'Цитаты',
        setAudioplayer: 'Аудиоплеер'
    }
}

const langBtn = document.querySelector('.langBtn')

if (lang === 'en') {
    langBtn.style.background = `url(assets/svg/united-kingdom-flag-icon.svg)`
} else {
    langBtn.style.background = `url(assets/svg/russia-flag-icon.svg)`
}

langBtn.addEventListener('click', translateTo)

function translateTo() {
    lang === 'en' ? lang = 'ru' : lang = 'en';
    cityValue();
if (city.value === 'Minsk' || city.value === 'Минск') {
    city.value = translate[lang].city;
}
showGreeting();
if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name')
} else {
    name.placeholder = `${translate[lang].placeholder}`
}

    ShowTime();
    getWeather();
    dailyQuote();
    innerSettings();

    if (lang === 'en') {
        langBtn.style.background = `url(/chizzora-JSFEPRESCHOOL2022Q2/momentum/assets/svg/united-kingdom-flag-icon.svg)`
    } else {
        langBtn.style.background = `url(/chizzora-JSFEPRESCHOOL2022Q2/momentum/assets/svg/russia-flag-icon.svg)`
    }
}



for(let i = 0; i < playList.length; i++) {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = playList[i].title;
    playListContainer.append(li);
}

const playItems = document.querySelectorAll('.play-item');

function cityValue () {
    if(localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    } else {
        city.value = translate[lang].city;
    }
}

cityValue();

function ShowTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;

    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString(translate[lang].language, options);
    newdate.textContent = currentDate;
    setTimeout(ShowTime, 1000);
};

if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name')
}
else {
    name.placeholder = `${translate[lang].placeholder}`
}

function showGreeting() {
    const greetingText = `${translate[lang][timeOfDay]},`;
    name.value = ''
    greeting.textContent = greetingText;
}

function getTimeOfDay() {
    const newDate = new Date();
    const hours = newDate.getHours();
    let dayTime;
    if (hours >= 0 && hours < 4) {
        return dayTime = 'night'
    }
    else if (hours >= 4 && hours < 12) {
        return dayTime = 'morning'
    }
    else if (hours >= 12 && hours < 17) {
        return dayTime = 'afternoon'
    }
    else {
        return dayTime = 'evening'
    }
}

function getRandomNum() {
  return Math.floor(Math.random() * 20) + 1;
}

randomNum = getRandomNum();

function getSlideNext() {
    if (randomNum >= 20) {
        randomNum = 0
    }
    randomNum += 1;
    setBg();
}

function getSlidePrev() {
    if (randomNum <= 1) {
        randomNum = 21
    }
    randomNum += -1;
    setBg();
}

function setBg () {
    let bgNum = String(randomNum).padStart(2, '0');
    const img = new Image();
  img.src = `https://raw.githubusercontent.com/chizzora/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}


function setLocalStorage() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
    localStorage.setItem('language', lang);
    localStorage.setItem('settings', JSON.stringify(settings));
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
    LocalCity();
    if (localStorage.getItem('settings')) {
        settings = JSON.parse(localStorage.getItem('settings'));
        defaultSettings();
    }
}

function LocalCity() {
    if(localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
}
window.addEventListener('load', getLocalStorage);

ShowTime();
showGreeting();
setBg();

nextSlide.addEventListener('click', () => {
    getSlideNext()
});

prevSlide.addEventListener('click', () => {
    getSlidePrev()
});

async function getWeather() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=22dce9799ab2990da05538388300a7bc&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.floor(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `${translate[lang].windSpeed}: ${data.wind.speed} ${translate[lang].windSpeedUnits}`;
        humidity.textContent = `${translate[lang].humidity}: ${data.main.humidity}%`;
        weatherError.textContent = '';
    } catch (err) {
        weatherError.textContent = `${translate[lang].weatherError1} '${city.value}'${translate[lang].weatherError2}!`;
        weatherIcon.className = 'weather-icon owf';
        temperature.textContent = '';
        weatherDescription.textContent = '';
        wind.textContent = '';
        humidity.textContent = '';
    }
}

function setCity(event) {
    if (event.code === 'Enter') {
      getWeather();
      city.blur();
    }
}

function setCityOnchange() {
    getWeather();
    city.blur();
}

city.addEventListener('keypress', setCity);
city.addEventListener('change', setCityOnchange);

getWeather();

function randomQuote() {
    return Math.floor(Math.random() * (translate[lang].quoteArr.length));
}

let randQuote = randomQuote();

function dailyQuote() {
    quote.textContent = translate[lang].quoteArr[randQuote].text;
    author.textContent = translate[lang].quoteArr[randQuote].author;
    let previousQuote = randQuote;
}

dailyQuote();

function changeQuote() {
    let newQuote = randomQuote();
    if (newQuote === randQuote) {
        console.log('beda')
        changeQuote();
    } else {
        randQuote = newQuote;
        dailyQuote();
    }
}

changeQuoteButton.addEventListener('click', changeQuote);


// audioplayer
const audio = new Audio();
audio.src = playList[playNum].src;

function playAudio() {
    songName.textContent = playList[playNum].title;
        if(!isPlay) {
        playPauseBtn.classList.toggle('pause');
        isPlay = true;
        audio.play();
    } else {
        playPauseBtn.classList.toggle('pause');
        audio.pause();
        isPlay = false;
    }
    playItems[playNum].classList.add('item-active')
}

function playCheck() {
    if (playPauseBtn.classList.contains('pause')) {
        console.log('<3')
    } else {
        playPauseBtn.classList.toggle('pause');
        isPlay = true;
        audio.play();
    }
}

function playNext() {
    if (playNum >= playList.length - 1) {
        playNum = -1
        playItems[playList.length - 1].classList.remove('item-active')
    }
    playNum += 1;
    if (playItems[playNum-1]) {
        playItems[playNum-1].classList.remove('item-active')
    }
    audio.src = playList[playNum].src;
    playAudio();
    playCheck();

}

function playPrev() {
    if (playNum <= 0) {
        playNum = playList.length
        playItems[0].classList.remove('item-active')
    }
    playNum += -1;
    audio.src = playList[playNum].src;
    playAudio();
    playCheck();
    if (playItems[playNum+1]) {
        playItems[playNum+1].classList.remove('item-active')
    }
}

playPauseBtn.addEventListener('click', playAudio);
playNextBtn.addEventListener('click', playNext);
playPrevBtn.addEventListener('click', playPrev);

const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress-bar');
const durationTime = document.querySelector('.duration-time');
const soundTime = document.querySelector('.current-time');
durationTime.textContent = '0:00';
soundTime.textContent = '0:00';

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const percentProgress = (currentTime / duration) * 100
    let mins = ~~(~~duration / 60);
    let secs = ~~ duration - mins * 60;
    let seconds = String(secs).padEnd(2, '0');
    let durationForm = `${mins}:${seconds}`;
    let cmins = ~~(~~currentTime / 60);
    let csecs = ~~ currentTime - cmins * 60;
    let cseconds = String(csecs).padStart(2, '0');
    let currentForm = `${cmins}:${cseconds}`
    progress.style.width = `${percentProgress}%`
    durationTime.textContent = durationForm;
    soundTime.textContent = currentForm;
}
audio.addEventListener('timeupdate', updateProgress)

function setProgress(e) {
    const barWidth = this.clientWidth;
    const clickAxisX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickAxisX / barWidth) * duration
}

progressBar.addEventListener('click', setProgress);
audio.addEventListener('ended', playNext)

const soundIcon = document.querySelector('.sound-icon')
const soundBar = document.querySelector('.sound-bar__container');
const soundBarProgress = document.querySelector('.sound-bar__container-progress');

soundBarProgress.style.width = '50%';
audio.volume = 0.5;
let curVolume;
soundIcon.addEventListener('click', () => {
    if (soundIcon.classList.contains('mute')) {
        audio.volume = curVolume;
        soundBarProgress.style.width = `${audio.volume * 100}%`
        soundIcon.classList.remove('mute')
    } else {
        curVolume = audio.volume;
        audio.volume = 0;
        soundBarProgress.style.width = '0%'
        soundIcon.classList.add('mute')
    }
})


function setVolume(e) {
    const soundBarWidth = this.clientWidth;
    const clickAxisX = e.offsetX;
    audio.volume = (clickAxisX / soundBarWidth)
    soundBarProgress.style.width = `${audio.volume * 100}%`
    if (soundIcon.classList.contains('mute')) {
        soundIcon.classList.remove('mute')
    }
}

soundBar.addEventListener('click', setVolume)


// settings
const settingsBtn = document.querySelector('.settings');
const setContainer = document.querySelector('.settings__container');
const bgWrapper = document.querySelector('.settings__bg-wrapper');
const setLang = document.querySelector('.setLang');
const setTime = document.querySelector('.setTime');
const setDate = document.querySelector('.setDate');
const setGreeting = document.querySelector('.setGreeting');
const setWeather = document.querySelector('.setWeather');
const setQuotes = document.querySelector('.setQuotes');
const setAudioplayer = document.querySelector('.setAudioplayer');
const checkbox = document.querySelectorAll('.checkbox-group');
const weatherContainer = document.querySelector('.weather');
const quotes = document.querySelector('.quotes');
const player = document.querySelector('.player');

setLang.textContent = translate[lang].setLang;
setTime.textContent = translate[lang].setTime;
setDate.textContent = translate[lang].setDate;
setGreeting.textContent = translate[lang].setGreeting;
setWeather.textContent = translate[lang].setWeather;
setQuotes.textContent = translate[lang].setQuotes;
setAudioplayer.textContent = translate[lang].setAudioplayer;

function innerSettings() {
    setLang.textContent = translate[lang].setLang;
    setTime.textContent = translate[lang].setTime;
    setDate.textContent = translate[lang].setDate;
    setGreeting.textContent = translate[lang].setGreeting;
    setWeather.textContent = translate[lang].setWeather;
    setQuotes.textContent = translate[lang].setQuotes;
    setAudioplayer.textContent = translate[lang].setAudioplayer;
}

function setting() {
    setContainer.classList.toggle('set-active')
    bgWrapper.classList.toggle('shadowed')
}

settingsBtn.addEventListener('click', setting)
bgWrapper.addEventListener("click", (event) => {
	if (event.target.classList.contains('shadowed')) {
		setContainer.classList.toggle('set-active')
        bgWrapper.classList.toggle('shadowed')
	}
});


function toggleSettings() {
    checkbox.forEach(item => {
        if (item.checked != settings[item.name]) {
            settings[`${item.name}`] = item.checked;
            document.querySelector(`.${item.name}`).classList.toggle('hidden');
        }
    })
}

setContainer.addEventListener("change", (e) => {
    toggleSettings();
})

function defaultSettings() {
    checkbox.forEach(item => {
      item.checked = settings[item.name];
      if (!item.checked) {
        document.querySelector(`.${item.name}`).classList.add('hidden');
      }
    });
}


defaultSettings()
