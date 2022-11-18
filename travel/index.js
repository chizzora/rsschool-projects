const burger = document.querySelector('.burger-icon');
const navMenu = document.querySelector('.nav-nav');
const begr = document.querySelector('.beg');
const cross = document.querySelector('#link0');
const account = document.querySelector('#link5');
const linke = document.querySelector('.header-list');

let items = document.querySelectorAll('.three-destinations .item');
let itemes = document.querySelectorAll('.pagination-button-op');
const mvleft = document.querySelector('.arrow.left');

const logBtn = document.querySelector('.login-text');
const popUp = document.querySelector('.pop-up');
const popUpBG = document.querySelector('.pop-up__background');
let email = document.querySelector('#email');
let password = document.querySelector('#password');
let signIn = document.querySelector('.sign-in-button');
const stick = document.querySelector('.sticky');
const register = document.querySelector('.pop-up__register');

signIn.addEventListener("click", function () {
	let result = 'Имя Пользователя: ' + email.value + ';\n' + 'Пароль: ' + password.value;
	alert(result);
});

logBtn.addEventListener("click", () => {
	popUp.classList.toggle('disappear');
	popUp.classList.toggle('sticky');
	popUpBG.classList.toggle('hidden');
});

popUp.addEventListener("click", (event) => {
	if (event.target.classList.contains('pop-up')) {
		popUp.classList.toggle('disappear');
		popUpBG.classList.toggle('hidden');
		popUp.classList.toggle('sticky');
	}
});

const ChangeText = (eve, currentText, NextText) => {
	eve.innerHTML = (eve.innerHTML === currentText) ? eve.innerHTML = NextText : register.innerHTML = currentText;
}

const logIn = document.querySelector('.pop-up__log-in-text');
const bottomText = document.querySelector('.pop-up__bottom-text');

register.addEventListener("click", function() {
	document.querySelector('.pop-up__facebook').classList.toggle('hide');
	document.querySelector('.pop-up__google').classList.toggle('hide');
	document.querySelector('.pop-up__lines').classList.toggle('hide');
	document.querySelector('.pop-up__forgot-pass').classList.toggle('hide');
	document.querySelector('.pop-up__content').classList.toggle('sign-up');
	signIn.innerHTML = (signIn.innerHTML === 'Sign In') ? signIn.innerHTML = 'Sign Up' : signIn.innerHTML = 'Sign In';
	ChangeText(logIn, "Log in to your account", 'Create account');
	bottomText.innerHTML = (bottomText.innerHTML === "Already have an account?&nbsp;") ? bottomText.innerHTML = "Don’t have an account?&nbsp;" : bottomText.innerHTML = "Already have an account?&nbsp;";
	register.innerHTML = (register.innerHTML === 'Register') ? register.innerHTML = 'Log In' : register.innerHTML = 'Register';
})

if (burger) {
        burger.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        burger.classList.toggle('_active');
        navMenu.classList.toggle('_active');
        begr.classList.toggle('_active');
    });
}

cross.addEventListener("click", function (e) {
    document.body.classList.toggle('_lock');
    burger.classList.toggle('_active');
    navMenu.classList.toggle('_active');
    begr.classList.toggle('_active');
});

account.addEventListener("click", function (e) {
	popUp.classList.toggle('disappear');
	popUpBG.classList.toggle('hidden');
});

linke.addEventListener("click", function (e) {
    document.body.classList.toggle('_lock');
    burger.classList.toggle('_active');
    navMenu.classList.toggle('_active');
    begr.classList.toggle('_active');
});

begr.addEventListener("click", function (e) {
    document.body.classList.toggle('_lock');
    burger.classList.toggle('_active');
    navMenu.classList.toggle('_active');
    begr.classList.toggle('_active');
});

let currentItem = 0;
let currentIteme = 0; // dot
let isEnabled = true;

function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
}

function changeCurrentIteme(n) {
	currentIteme = (n + itemes.length) % itemes.length;
} //dot

console.log(changeCurrentItem);
console.log(changeCurrentIteme);  //dot

function hideItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('active', direction);
	});

}

function showItem(direction) {
	items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('active');
		isEnabled = true;
	});
}

// dot
function hideIteme(direction) {
	isEnabled = false;
	itemes[currentIteme].classList.add(direction);
	itemes[currentIteme].addEventListener('animationend', function() {
		this.classList.remove('activated', direction);
	});
}

function showIteme(direction) {
	itemes[currentIteme].classList.add('next', direction);
	itemes[currentIteme].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('activated');
		isEnabled = true;
	});
}

function nextIteme(n) {
	hideIteme('to-left');
	changeCurrentIteme(n + 1);
	showIteme('from-right');
}

function previousIteme(n) {
	hideIteme('to-right');
	changeCurrentIteme(n - 1);
	showIteme('from-left');
}
// dot

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

let arrLeft = () => {
	if (isEnabled) {
		previousItem(currentItem);
		previousIteme(currentIteme);
		}
}

mvleft.addEventListener('click', arrLeft);

document.querySelector('.arrow.right').addEventListener('click', function() {
	if (isEnabled) {
		nextItem(currentItem);
		nextIteme(currentIteme);
		}
});


console.log('1. Слайдер изображений в секции destinations +50\n на десктоп варианте при клике на урезанную картинку слева или справа изображение меняется по принципу карусели (например если нажать правую картинку та что была в центре на уезжает налево, а та что была видна наполовину оказывается справа). Слайдер может быть как конечным так и бесконечным - данный критерий не должен влиять на оценку + 20\n Три точки внизу отображают "номер слайда", то есть каждому слайду соответствует свой кружочек, который становится активным при нахождении соответствующего ему слайда в центре. На мобильном варианте картинка одна, но поверх нее появляются стрелочки навигации (можно сделать как карусель или же затемнять кнопку если слайдер достиг края) +20\n Анимации плавного перемещения для слайдера +10\n2. Нажатие на кнопку Login (кнопка Account в мобильной версии) показывает сверстанный логин попап + 50\n логин попап соответствует верстке его закрытие происходит при клике вне попапа +25\n логин попап имеет 2 инпута при нажатии на кнопку Sign In показывается браузерный алерт с введенными данными (для реализации можно использовать тег ) +25\n3. Нажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету (То есть нажатие не закрывает модал а просто меняет его наполнение). +25\nИтого: 100 / 100')