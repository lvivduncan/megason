// basket.js 08-02-2020
// переписав, щоб усі параметри лежали в окремих рядках localStorage
// це дозволе нормально розширяти кошик, а не переписувати його постійно
{

	// перебираємо усі товари зі сторінки
	if (document.querySelectorAll('.item') !== null) {
		document.querySelectorAll('.item').forEach(item => {
			item.addEventListener('click', e => {
				// батон
				const btn = item.querySelector('.button');
				// клік на кнопці батона
				if (e.target === btn) {
					// надсилаємо дані
					add(
						btn.dataset.name,                                         // назва товару
						JSON.parse(item.querySelector('.sizes select').value)[1], // загальна ціна
						1,                                                        // кількість
						JSON.parse(item.querySelector('.sizes select').value)[0], // 0 - розмір
						JSON.parse(item.querySelector('.sizes select').value)[1]  // 1 - ціна
					);
					// оновлюємо кошик
					view();
					issue();
					msg(btn);
				}
			});
		});		
	}

	// клік на кнопці "купить" на сторінці товару 
	if (document.querySelector('#button') !== null) {
		document.querySelector('#button').addEventListener('click', function () {
			add(
				button.dataset.name,        // назва товару
				button.dataset.price,       // загальна ціна
				button.dataset.result,      // кількість
				button.dataset.sizename,    // розмір
				button.dataset.sizeprice,   // розмір (ціна)
				button.dataset.optionname,  // додаткові опції (назви)
				button.dataset.optionprice, // додаткові опції (суми)
				button.dataset.colorname,   // колір
				button.dataset.colorprice   // колір
			);
			msg(this);
		});
	}

	// клік на кнопці очистки локалСтореджа у кошикові
	document.querySelector('#del-goods').addEventListener('click', clear);

	// видаляємо товари з кошика
	document.querySelector('#goods').addEventListener('click', remove);

	// кнопка очистки локалСтореджа
	const delGoods = document.querySelector('#del-goods');
	delGoods.addEventListener('click', clear);

	// лінк "Оформить"
	const getIssue = document.querySelector('#get-issue');
	getIssue.addEventListener('click', order);

	/**
	 * клік на кнопці "#button" додає в кошик дані:
	 * @name - назва товару
	 * @price - загальна ціна
	 * @result - кількість
	 * @sizes - розміри
	 * @options - додаткові опції
	 * @colors - колір
	 */
	function add(name = '', price = '', result = 1, sizeName = '', sizePrice = '', optionName = '', optionPrice = '', colorName = '', colorPrice = '') {
		
		// якщо кількість не більше 1
		if (result === 1) {

			// назва
			if (localStorage.getItem('name') !== null) {
				localStorage.name += `~${name}`;
			} else {
				localStorage.name = `${name}`;
			}

			// ціна
			if (localStorage.getItem('price') !== null) {
				localStorage.price += `~${price}`
			} else {
				localStorage.price = `${price}`
			}

			// кількість
			if (localStorage.getItem('result') !== null) {
				localStorage.result = +`${result}` + +localStorage.result
			} else {
				localStorage.result = `${result}`
			}

			// розміри
			if (localStorage.getItem('sizeName') !== null) {
				localStorage.sizeName += `~${sizeName}`
			} else {
				localStorage.sizeName = `${sizeName}`
			}


			if (localStorage.getItem('sizePrice') !== null) {
				localStorage.sizePrice += `~${sizePrice}`
			} else {
				localStorage.sizePrice = `${sizePrice}`
			}

			// опції
			if (localStorage.getItem('optionName') !== null) {
				localStorage.optionName += `~${optionName}`
			} else {
				localStorage.optionName = `${optionName}`
			}

			
			if (localStorage.getItem('optionPrice') !== null) {
				localStorage.optionPrice += `~${optionPrice}`
			} else {
				localStorage.optionPrice = `${optionPrice}`
			}

			// колір
			if (localStorage.getItem('colorName') !== null) {
				localStorage.colorName += `~${colorName}`
			} else {
				localStorage.colorName = `${colorName}`
			}

			
			if (localStorage.getItem('colorPrice') !== null) {
				localStorage.colorPrice += `~${colorPrice}`
			} else {
				localStorage.colorPrice = `${colorPrice}`
			}

		} else {

			// назва (true)
			if (localStorage.getItem('name') !== null) {
				localStorage.name += `~${name}`.repeat(`${result}`);
			} else {
				localStorage.name = `${name}` + `~${name}`.repeat(`${result}`-1);
			}

			// ціна (true)
			if (localStorage.getItem('price') !== null) {
				localStorage.price += `~${price/result}`.repeat(`${result}`); 
			} else {
				localStorage.price = `${price/result}` + `~${price/result}`.repeat(`${result}`-1);
			}

			// кількість
			if (localStorage.getItem('result') !== null) {
				localStorage.result = `${result}`*1 + localStorage.result*1;
			} else {
				localStorage.result = `${result}`;
			}

			// розміри
			if (localStorage.getItem('sizeName') !== null) {
				localStorage.sizeName += `~${sizeName}`.repeat(`${result}`);
			} else if(`${sizeName}` !== null){
				localStorage.sizeName = `${sizeName}` + `~${sizeName}`.repeat(`${result}`-1); 
			} else {
				localStorage.sizeName = '';
			}

			if (localStorage.getItem('sizePrice') !== null) {
				localStorage.sizePrice += `~${sizePrice}`.repeat(`${result}`); 
			} else if(`~${sizePrice}` !== null){
				localStorage.sizePrice = `${sizePrice}` + `~${sizePrice}`.repeat(`${result}`-1);
			} else {
				localStorage.sizePrice = '';
			}

			// опції
			if (localStorage.getItem('optionName') !== null) {
				localStorage.optionName += `~${optionName}`.repeat(`${result}`); 
			} else if(`${optionName}` !== null){
				localStorage.optionName = `${optionName}` + `~${optionName}`.repeat(`${result}`-1);
			} else {
				localStorage.optionName = '';
			}

			if (localStorage.getItem('optionPrice') !== null) {
				localStorage.optionPrice += `~${optionPrice}`.repeat(`${result}`); 
			} else if(`${optionPrice}` !== null){
				localStorage.optionPrice = `${optionPrice}` + `~${optionPrice}`.repeat(`${result}`-1);
			} else {
				localStorage.optionPrice = '';
			}

			// колір
			if (localStorage.getItem('colorName') !== null) {
				localStorage.colorName += `~${colorName}`.repeat(`${result}`);
			} else if(`${colorName}` !== null){
				localStorage.colorName = `${colorName}` + `~${colorName}`.repeat(`${result}`-1);
			} else {
				localStorage.colorName = '';
			}

			if (localStorage.getItem('colorPrice') !== null) {
				localStorage.colorPrice += `~${colorPrice}`.repeat(`${result}`);
			} else if(`${colorPrice}` !== null){
				localStorage.colorPrice = `${colorPrice}` + `~${colorPrice}`.repeat(`${result}`-1);
			} else {
				localStorage.colorPrice = '';
			}
		}

		view();
	}

	/**
	 * очистка локалСторедж
	 */
	function clear() {
		localStorage.clear();

		// опрацьовуємо кошик
		view();
	}

	/**
	 * вивід даних у кошик
	 */
	function view() {
		// дані зі сховища
		let
			name =           // назва
			price =          // ціна
			result =         // кількість
			sizeName =       // розміри
			sizePrice =      // розміри
			optionName =     // опції
			optionPrice =    // опції
			colorName =      // колір
			colorPrice = []; // колір

		// складаємо у масиви дані з локалСтореджа

		// назви товарів
		localStorage.getItem('name') !== null ? name = localStorage.name.split('~') : name.length = 0;

		// кількість грошей
		localStorage.getItem('price') !== null ? price = localStorage.price.split('~') : price.length = 0;

		// кількість товарів
		localStorage.getItem('result') !== null ? result = localStorage.result : result = 0;

		// кількість розмірів
		localStorage.getItem('sizeName') !== null ? sizeName = localStorage.sizeName.split('~') : sizeName.length = 0;
		localStorage.getItem('sizePrice') !== null ? sizePrice = localStorage.sizePrice.split('~') : sizePrice.length = 0;

		// кількість додаткових опцій
		localStorage.getItem('optionName') !== null ? optionName = localStorage.optionName.split('~') : optionName.length = 0;
		localStorage.getItem('optionPrice') !== null ? optionPrice = localStorage.optionPrice.split('~') : optionPrice.length = 0;

		// кількість кольорів
		localStorage.getItem('colorName') !== null ? colorName = localStorage.colorName.split('~') : colorName.length = 0;
		localStorage.getItem('colorPrice') !== null ? colorPrice = localStorage.colorPrice.split('~') : colorPrice.length = 0;

		// масив, в який складаємо всі товари
		const goods = [];

		// перебираємо циклом всі елементи
		name.forEach((item, i) => {

			goods.push(
				`<p>
					<b>${name[i]}</b>
					${price[i]} грн.
					${(sizeName[i]) ? `размер: ${sizeName[i]}` : ``}
					${optionName[i]}
					${colorName[i]}
				</p>`
			);
		});

		// виводимо дані у кошик

		// перевіряємо за кількістю товарів
		if (result > 0) {
			document.querySelector('.result').innerHTML = result;

			document.querySelectorAll('.sum')[0].innerHTML =
				document.querySelectorAll('.sum')[1].innerHTML =
				price.reduce((total, item) => total + +item, 0);

			document.querySelector('#goods').innerHTML = goods.join('');
		} else {
			document.querySelector('.result').innerHTML =
				document.querySelectorAll('.sum')[0].innerHTML =
				document.querySelectorAll('.sum')[1].innerHTML = 0;

			document.querySelector('#goods').innerHTML = '';
		}

		issue();
	}

	/**
	 * видаляємо по 1 товару з кошика
	 */
	function remove(e) {
		// усі товари у кошикові
		const goods = [...document.querySelector('#goods').childNodes];

		// якщо у локалСтореджі всього 1 товар, просто очистити кошик і видалити дані з локалСтореджа
		if (localStorage.getItem('result') == 1) {

			clear();

		} else {

			if (e.target.nodeName === 'P') {

				// якщо клікнули на "p" -- повертає індекс елемента масива, за яким і видаляємо з локалСтореджа
				const index = goods.indexOf(e.target);

				// назви товарів
				const name = localStorage.getItem('name').split('~');
				name.splice(index, 1);
				localStorage.setItem('name', name.join('~'));

				// кількість грошей
				const price = localStorage.getItem('price').split('~');
				price.splice(index, 1);
				localStorage.setItem('price', price.join('~'));

				// кількість товарів
				const result = localStorage.getItem('result');
				localStorage.setItem('result', result - 1);

				// кількість розмірів
				const sizeName = localStorage.getItem('sizeName').split('~');
				sizeName.splice(index, 1);
				localStorage.setItem('sizeName', sizeName.join('~'));
				const sizePrice = localStorage.getItem('sizePrice').split('~');
				sizePrice.splice(index, 1);
				localStorage.setItem('sizePrice', sizePrice.join('~'));

				// кількість додаткових опцій
				const optionName = localStorage.getItem('optionName').split('~');
				optionName.splice(index, 1);
				localStorage.setItem('optionName', optionName.join('~'));
				const optionPrice = localStorage.getItem('optionPrice').split('~');
				optionPrice.splice(index, 1);
				localStorage.setItem('optionPrice', optionPrice.join('~'));

				// кількість кольорів
				const colorName = localStorage.getItem('colorName').split('~');
				colorName.splice(index, 1);
				localStorage.setItem('colorName', colorName.join('~'));
				const colorPrice = localStorage.getItem('colorPrice').split('~');
				colorPrice.splice(index, 1);
				localStorage.setItem('colorPrice', colorPrice.join('~'));

				view();

			} else if (e.target.nodeName === 'B') {

				// якщо клікнули на вкладений у "p" тег "<b>" -- повертає індекс елемента масива, за яким і видаляємо з локалСтореджа
				const index = goods.indexOf(e.target.parentElement);

				// назви товарів
				const name = localStorage.getItem('name').split('~');
				name.splice(index, 1);
				localStorage.setItem('name', name.join('~'));

				// кількість грошей
				const price = localStorage.getItem('price').split('~');
				price.splice(index, 1);
				localStorage.setItem('price', price.join('~'));

				// кількість товарів
				const result = localStorage.getItem('result');
				localStorage.setItem('result', result - 1);

				// кількість розмірів
				const sizeName = localStorage.getItem('sizeName').split('~');
				sizeName.splice(index, 1);
				localStorage.setItem('sizeName', sizeName.join('~'));
				const sizePrice = localStorage.getItem('sizePrice').split('~');
				sizePrice.splice(index, 1);
				localStorage.setItem('sizePrice', sizePrice.join('~'));

				// кількість додаткових опцій
				const optionName = localStorage.getItem('optionName').split('~');
				optionName.splice(index, 1);
				localStorage.setItem('optionName', optionName.join('~'));
				const optionPrice = localStorage.getItem('optionPrice').split('~');
				optionPrice.splice(index, 1);
				localStorage.setItem('optionPrice', optionPrice.join('~'));

				// кількість кольорів
				const colorName = localStorage.getItem('colorName').split('~');
				colorName.splice(index, 1);
				localStorage.setItem('colorName', colorName.join('~'));
				const colorPrice = localStorage.getItem('colorPrice').split('~');
				colorPrice.splice(index, 1);
				localStorage.setItem('colorPrice', colorPrice.join('~'));

				view();
			}
		}
	}

	/**
	 * кнопки очистки та оформлення замовлення
	 */
	function issue(){

		// якщо у кошикові щось є, тоді показуємо лінки
		if (localStorage.getItem('result') !== null) {
			getIssue.style.display = 'inline-block';
			delGoods.style.display = 'block';
		} else {
			getIssue.style.display = 'none';
			delGoods.style.display = 'none';
		}    
	}

	/**
	 * відкриває фенсібокс-вікно для оформлення замовлення
	 */
    function order(){

		// дані зі сховища
		let
			name =           // назва
			price =          // ціна
			result =         // кількість
			sizeName =       // розміри
			sizePrice =      // розміри
			optionName =     // опції
			optionPrice =    // опції
			colorName =      // колір
			colorPrice = []; // колір

		// назви товарів
		localStorage.getItem('name') !== null ? name = localStorage.name.split('~') : name.length = 0;

		// кількість грошей
		localStorage.getItem('price') !== null ? price = localStorage.price.split('~') : price.length = 0;

		// кількість товарів
		localStorage.getItem('result') !== null ? result = localStorage.result : result = 0;

		// кількість розмірів
		localStorage.getItem('sizeName') !== null ? sizeName = localStorage.sizeName.split('~') : sizeName.length = 0;
		localStorage.getItem('sizePrice') !== null ? sizePrice = localStorage.sizePrice.split('~') : sizePrice.length = 0;

		// кількість додаткових опцій
		localStorage.getItem('optionName') !== null ? optionName = localStorage.optionName.split('~') : optionName.length = 0;
		localStorage.getItem('optionPrice') !== null ? optionPrice = localStorage.optionPrice.split('~') : optionPrice.length = 0;

		// кількість кольорів
		localStorage.getItem('colorName') !== null ? colorName = localStorage.colorName.split('~') : colorName.length = 0;
		localStorage.getItem('colorPrice') !== null ? colorPrice = localStorage.colorPrice.split('~') : colorPrice.length = 0;

		// масив, в який складаємо всі товари
		const goods = [];

		// перебираємо циклом всі елементи
		name.forEach((item, i) => {
			goods.push(
				`<br><b>${name[i]}</b> ${price[i]} грн. ${(sizeName[i]) ? `размер: ${sizeName[i]}` : ``} ${optionName[i]} ${colorName[i]}`
			);
		});

		$.fancybox.open(`
			<form>
				<div id="issue-goods">
					<h4>Оформить заказ?</h4>
					${goods}
				</div>
				<div id="issue-form">
					<p><input type="text" placeholder="ФИО" required><input type="text" placeholder="Телефон" required></p>
					<p><input type="text" placeholder="Имейл" required><input type="text" placeholder="Адрес" required></p>
					<p><textarea placeholder="Примечание"></textarea></p>
					<p><input type="submit"></p>
					<p>Доставка в пределах Киева 100 гривень. Доставка (в пределах Киева) бесплатная, если заказ более 2000 гривень.</p>
				</div>
				<!-- #issue-form -->
			</form>
        `);
	}
	
	/**
	 * фенсібокс-алерт про додавання товару у кошик
	 */
	function msg(el){
		$.fancybox.open(`<div id="issue"> Товар <b>${el.dataset.name}</b> добавлен в корзину </div>`);
		setTimeout(() => $.fancybox.close(), 1000);
	}

	// опрацьовуємо кошик
	view();

	// виводимо кнопки очистки кошика і оформлення, якщо локалСторедж не пустий
	issue();

}

// 13-02-2020
// зміна ціни при зміні розміру
if (document.querySelectorAll('article.item') !== null) {
	const values = document.querySelectorAll('article.item');

	values.forEach(item => {
		
		// розбираємо значення у розмірах
		const select = item.querySelector('.sizes select');
				
		select.addEventListener('change', function(){
			const size = JSON.parse(select.value);

			// нова ціна
			item.querySelector('.price b').textContent = size[1];
			
			if (item.querySelector('.price span') !== null) {

				// нова ціна без знижки
				item.querySelector('.price span').textContent = size[2];
			}
		});
	});
}