// upgrade 19-01-2020 - 16-03-2020
{
	// поле, куди виводиться ціна товару
	const price = document.querySelector('#price');

	const
		size = document.querySelector('#size'),
		plusMinus = document.querySelectorAll('#plus-minus input'),
		addOptions = document.querySelectorAll('#add-options input'),
		colors = document.querySelectorAll('#colors input'),

		// проміжний об'єкт, в який кладуться значення полів після зміни
		calc = {
			price: JSON.parse(size.value)[1],
			sizePrice: 0,
			plusMinus: 1,
			optionPrice: 0,
			colorPrice: 0,
			sizeName: '',
			optionName: '',
			colorName: ''
		},

		// Нестандартний розмір, вивід на екран ціни
		customSize = document.querySelectorAll('#custom-size input'),
		customSizeResult = document.querySelector('#custom-size-result');

	// - click
	plusMinus[0].addEventListener('click', () => {
		calc.plusMinus--;
		plusMinus[1].value--;
		if(plusMinus[1].value < 1){
			plusMinus[1].value = calc.plusMinus = 1;
		}
		getCalculate();
	});

	// + click
	plusMinus[2].addEventListener('click', () => {
		plusMinus[1].value++;
		calc.plusMinus++;
		getCalculate();
	});

	// після завантаження сторінки має брати дані 1 поля "Размер спального места" і прописувати в дата-атрибут кнопки батон
	document.addEventListener('DOMContentLoaded', () => {
		const button = document.getElementById('button');

		// непотрібна перевірка, бо кнопка є завжди
		if (button !== null) {
			button.dataset.sizename = JSON.parse(size.value)[0];
			button.dataset.sizprice = JSON.parse(size.value)[1];
		}
	});

	// select (Размер спального места)
	size.addEventListener('change', () => {
		// calc.sizePrice = size.value; // number
		calc.sizePrice = JSON.parse(size.value)[1]; // number
		// calc.price = size.value;
		calc.price = JSON.parse(size.value)[1];
		
		// поле зі старою ціною, де вона має мінятися, коли вибирають розміри акційного товару
		if (document.querySelector('#old-price') !== null) {
			const oldPrice = document.querySelector('#old-price');

			// оновлюємо поле зі старою ціною
			oldPrice.textContent = JSON.parse(size.value)[2];
		}

		calc.sizeName = JSON.parse(size.value)[0]; // text

		getCalculate();
	});

	// checkbox (Дополнительные опции)
	const options = new Array(addOptions.length);

	addOptions.forEach((item, i) => {	
		item.addEventListener('click', () => {
			if (item.checked) {
				calc.optionPrice += +item.value;
				options.splice(i, 1, item.dataset.name);
			} else {
				calc.optionPrice -= +item.value;
				options.splice(i, 1, '');
			}
			calc.optionName = options.join(' ').trim();
			getCalculate();
		});
	});

	// radio (Цвета)
	colors.forEach(item => {
		item.addEventListener('click', () => {
			if(item.checked){
				calc.colorPrice = +item.value; // number
				calc.colorName = item.dataset.name; // text
				getCalculate();
			}
		});
	});

	// Нестандартный размер:
	for(let input of customSize){
		input.addEventListener('input', () => {
			if(+customSize[0].value > 0 && +customSize[1].value > 0){
				customSizeResult.textContent = customSize[0].value * customSize[1].value * customSize[2].value;

				// виводимо кнопку замовлення нестандартного розміру:
				document.getElementById('quick-buy').style.display = 'block';
			} else {
				customSizeResult.textContent = '';

				// ховаємо кнопку замовлення
				document.getElementById('quick-buy').style.display = 'none';
			}		
		});
	}

	// обробляє дані в масиві data і записує результат в price.textContent
	function getCalculate(){
		let 
			firstPrice = 0,
			select = 0,
			addOptions = 0,
			color = 0;

		if(+calc.plusMinus > 1){
			firstPrice = calc.price * calc.plusMinus;
			select = calc.sizePrice * calc.plusMinus;
			addOptions = calc.optionPrice * calc.plusMinus;
			color = calc.colorPrice * calc.plusMinus;
		} else {
			firstPrice = calc.price;
			addOptions = +calc.optionPrice;
			color = +calc.colorPrice;
		}

		// оновлюємо загальну ціну // пишему в дата-атрибут
		price.textContent = 
		document.querySelector('#button').dataset.price = 
			Math.ceil(+firstPrice + +select + +addOptions + +color); // 23-11-2020 add Math.ceil()
			// +firstPrice + +select + +addOptions + +color; // 23-11-2020 add Math.ceil()
		
		getDataSet(calc.plusMinus, calc.sizeName, calc.sizePrice, calc.colorName, calc.colorPrice, calc.optionName, calc.optionPrice);
	}

	// обробляє і записує дані в дата-атрибути (для кошика)
	function getDataSet(result, sizename, sizeprice, colorname, colorprice, optionname, optionprice){
		const button = document.getElementById('button');

		button.dataset.result = result; // кількість
		button.dataset.sizename = sizename; // 1 розмір назва
		button.dataset.sizeprice = sizeprice; // 1 розмір ціна
		button.dataset.colorname = colorname; // 1 колір назва
		button.dataset.colorprice = colorprice; // 1 колір ціна
		button.dataset.optionname = optionname; // додаткові опції
		button.dataset.optionprice = optionprice; // додаткові опції

	}

}
// end