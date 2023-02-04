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
const btnCount = document.querySelector('.count-button');
const currencyContainer = document.querySelector('.currency-container');
const calculatorDropdown1 = document.querySelector('#curr1');
const calculatorDropdown2 = document.querySelector('#curr2');
const moneySum = document.querySelector('.resault');
let moneyQuantity = document.querySelector('#qtyMoney');
let arrayOfCurrencyDivs;

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
	arrayOfCurrencyDivs = [];
};

const clearPage = () => {
	const myNode = document.querySelector('.currency-container');
	while (myNode.lastElementChild) {
		myNode.removeChild(myNode.lastElementChild);
	}
};

const addViewCurrency = () => {
	let tittle = document.createElement('div');
	tittle.className = 'tittle-div';
	let p01 = document.createElement('p');
	p01.className = 'first-row';
	let p02 = document.createElement('p');
	p02.className = 'second-row';
	p01.innerText = 'WALUTA:';
	p02.innerText = 'KURS:';
	currencyContainer.append(tittle);
	tittle.append(p01, p02);
	for (let index = 0; index < newArray.length; index++) {
		let div = document.createElement('div');
		div.className = 'currency-div';
		let p1 = document.createElement('p');
		p1.className = 'first-row';
		let p2 = document.createElement('p');
		p2.className = 'second-row';
		let currency = `${newArray[index].currency} (${newArray[index].code}) `;
		let value = `${newArray[index].mid}`;
		p1.innerText = currency;
		p2.innerText = value;
		currencyContainer.append(div);
		div.append(p1, p2);
	}
	divClassAdd();
};

const divClassAdd = () => {
	let currencyDivs = document.getElementsByClassName('currency-div');
	arrayOfCurrencyDivs = Array.from(currencyDivs);
	calculatorDropdown2.replaceChildren();
	for (let index = 0; index < arrayOfCurrencyDivs.length; index++) {
		let newOption = document.createElement('Option');
		let textValue = arrayOfCurrencyDivs[index].innerText;
		let newOptionValue = document.createTextNode(textValue);
		newOption.appendChild(newOptionValue);
		calculatorDropdown2.appendChild(newOption);
	}
};

const calculateMoney = () => {
	let box2Value = document.getElementById('curr2').value;
	let Value2Replaced = parseFloat(box2Value.replace(/[^\d\.]*/g, ''));
	console.log(Value2Replaced);
	let sum = moneyQuantity.value / Value2Replaced;
	console.log(sum);
	moneySum.innerText = 'Otrzymasz:';
	moneySum.innerText += ` ${sum.toFixed(2)} `;
};

btnConfirm.addEventListener('click', () => {
	startDate = datePicker.value;
	URL = apiLink + startDate + '/';
	clearEverything();
	connectApi();
});
btnCount.addEventListener('click', calculateMoney);
