'use strict';

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
const currencyContainer = document.querySelector('.currency-container');
let arajka;

const apiPromise = () =>
	new Promise((resolve, reject) => {
		if (newArray.length > 0) {
			resolve(addViewCurrency());
		} else reject(console.log('Waiting for specyfic data...'));
	});

const connectApi = () => {
	fetch(URL)
		.then((res) => res.json())
		.then((data) =>
			data[0].rates.forEach((element) => {
				newArray.push(element);
			})
		)
		.then(() => {
			apiPromise();
		});
};

const clearEverything = () => {
	clearPage();
	newArray = [];
};

const clearPage = () => {
	const myNode = document.querySelector('.currency-container');
	while (myNode.lastElementChild) {
		myNode.removeChild(myNode.lastElementChild);
	}
};

const addViewCurrency = () => {
	for (let index = 0; index < newArray.length; index++) {
		let div = document.createElement('div');
		div.className = 'currency-div';
		let p1 = document.createElement('p');
		p1.className = 'first-row';
		let p2 = document.createElement('p');
		p2.className = 'second-row';
		let currency = `WALUTA: ${newArray[index].currency} (${newArray[index].code}) `;
		let value = `KURS: ${newArray[index].mid}`;
		p1.innerText = currency;
		p2.innerText = value;
		currencyContainer.append(div);
		div.append(p1, p2);
	}
	divClassAdd();
};

const divClassAdd = () => {
	let currencyDivs = document.getElementsByClassName('currency-div');
	arajka = Array.from(currencyDivs);
};

btnConfirm.addEventListener('click', () => {
	startDate = datePicker.value;
	URL = apiLink + startDate + '/';
	clearEverything();
	connectApi();
});
