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
const currencyContainer = document.querySelector('.currency-container');

const apiPromise = () =>
	new Promise((resolve, reject) => {
		if (newArray.length > 0) {
			resolve(addViewCurrency());
		} else reject(console.log('Waiting for specyfic data...'));
	});

connectApi = () => {
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

// const clearEverything = () => {
// 	(newArray = []), (odpowiedz.innerText = '');
// };

const addViewCurrency = () => {
	for (let index = 0; index < newArray.length; index++) {
		var p = document.createElement('p');
		p.className = 'row';
		var names = `WALUTA: ${newArray[index].currency} ${newArray[index].code} KURS: ${newArray[index].mid}`;
		p.innerText = names;
		currencyContainer.append(p);
	}
};

btnConfirm.addEventListener('click', () => {
	startDate = datePicker.value;
	URL = apiLink + startDate + '/';
	// clearEverything();
	connectApi();
});
