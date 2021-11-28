{

	// метод для пошуку кількох елементів
    String.prototype.searchItem = function(elements){
        let isElement = true;

        for (const element of elements) {
            if (!this.includes(element)) {
				isElement = false;
			}
        }

        return isElement;
	}
	
	// фільтруємо дані полів фільтра
	document.getElementById('aside').addEventListener('input', filter);

	// глобальна функція фільтрації
	function filter(){

		// маніпулятор
		const aside = document.querySelector('#aside');

		// дані
		const items = document.querySelectorAll('.item .button');

		// отримуємо усі ціни
		// const price = Array.from(items).map(item => item.dataset.price);
		const price = [...items].map(item => item.dataset.price);

		// поле з мінімальною ціною
		const filterMin = document.querySelector('#filter-min');

		// поле з максимальною ціною
		const filterMax = document.querySelector('#filter-max');

		// дефолтні значення у текстових полях
		filterMin.setAttribute('value', Math.min(...price));
		filterMax.setAttribute('value', Math.max(...price));

		// лівий повзунок
		const filterLeft = document.querySelector('#filter-left');

		// правий позвунок
		const filterRight = document.querySelector('#filter-right');

		// дефолтні значення у повзунків
		filterLeft.setAttribute('min', Math.min(...price));
		filterLeft.setAttribute('max', Math.max(...price));
		filterLeft.setAttribute('value', Math.min(...price));
		filterRight.setAttribute('min', Math.min(...price));
		filterRight.setAttribute('max', Math.max(...price));
		filterRight.setAttribute('value', Math.max(...price));

		// характеристики
		const filterFeatures = [...aside.querySelectorAll('#features input:checked')].map(element => element.value);

		// розміри
		const filterSizes = [...aside.querySelectorAll('#sizes input:checked')].map(element => element.value);

		// зміна бігунка міняє число в полі ціна
		filterMin.value = filterLeft.value;
		filterMax.value = filterRight.value;

		// виробники
		const filterBrands = aside.querySelector('#filter-brands').value;
		
		// кольори
		const filterColors = [...aside.querySelectorAll('#filter-colors input:checked')].map(element => element.value);
		
		for (const item of items) {

			// в товарів усі опції співпали
			if(
				(+filterMin.value <= item.dataset.price) 
					&& (+filterMax.value >= item.dataset.price)
					&& (!filterBrands || filterBrands === item.dataset.brand)
					&& (!filterColors || item.dataset.color.searchItem(filterColors))
					&& (!filterFeatures || item.dataset.features.searchItem(filterFeatures))
					&& (!filterSizes || item.dataset.sizes.searchItem(filterSizes))
			){
				item.parentElement.parentElement.style.display = 'block';
				
			// якщо якась опція не співпала -- ховаємо товар
			} else {
				item.parentElement.parentElement.style.display = 'none';

			}
		}

	}

	// init
	filter();

	// select 1 item
	document.querySelectorAll('#sizes input').forEach(item => {

		// option'и. 
		const options = document.querySelectorAll('.sizes option')

		item.addEventListener('change', function(){
			
			if(this.checked === true){
				document.querySelectorAll('#sizes input').forEach(item => item.checked = false);

				this.checked = true;
			}

			// назва
			const name = this.closest('label').textContent.trim()

			// чЕкаємо на наявність і підсвічуємо
			for(let i = 0; i<options.length; i++){

				// значення, з який порівнюємо
				const firstElem = JSON.parse(options[i].value)[0]

				// ціна, яка має бути показана
				const priceElem = JSON.parse(options[i].value)[1]

				// якщо значення співпало -- додати параментр для відображення
				if(firstElem === name){

					// робимо активним
					options[i].selected = 'selected'

					// міняємо ціну
					options[i].closest('.item').querySelector('.price b').innerText = priceElem;
				}
			}
		});
	});
}

// TODO: оптимізувати дата-атрибути (колись =) ). майже усі опції мають унікальний айді