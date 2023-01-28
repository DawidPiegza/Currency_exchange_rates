'strict';

const apiLink = 'http://api.nbp.pl/api/exchangerates/tables/a/';
//Date Selector
const datePicker = document.getElementById('start');
let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
today = year + '-' + month + '-' + day;
datePicker.setAttribute('max', today);
datePicker.setAttribute('value', today);
let startDate = datePicker.value;
//
let URL = apiLink + startDate + '/';
let newArray = [];
const btnConfirm = document.querySelector('.confirm-button');
const odpowiedz = document.querySelector('.odp');

const apiPromise = () =>
	new Promise((resolve, reject) => {
		if (newArray.length > 0) {
			resolve((odpowiedz.innerText = newArray[3].currency));
		} else reject('Waiting for specyfic data...');
	});

connectApi = () => {
	fetch(URL)
		.then((res) => res.json())
		.then((data) =>
			data[0].rates.forEach((element) => {
				console.log(element);
				newArray.push(element);
			})
		)
		.then(() => {
			apiPromise();
		});
};

btnConfirm.addEventListener('click', connectApi);
