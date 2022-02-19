let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));


window.addEventListener('load', function () {

	document.body.classList.add('is-load');

	// ==== ADD PADDING-TOP ================================
	{
		let wrapper = document.querySelector('._padding-top');
		if (wrapper) {
			let header = document.querySelector('.header');
			if (header) {
				const setPedding = () => wrapper.style.paddingTop = header.clientHeight + 'px';
				setPedding();
				let id = setInterval(setPedding, 200);
				setTimeout(() => {
					clearInterval(id);
				}, 1000)
				window.addEventListener('resize', setPedding);
			}

		}
	}
	// ==== AND ADD PADDING-TOP ================================

	//SlideToggle
function _slideUp(target, duration = 500) {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
function _slideDown (target, duration = 500) {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
function _slideToggle (target, duration = 500) {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//========================================







//Spollers
function spollerInit() {
	let spollers = document.querySelectorAll("._spoller");
	if (spollers.length > 0) {
		for (let index = 0; index < spollers.length; index++) {
			const spoller = spollers[index];

			if(spoller.classList.contains('_active')) {
				_slideDown(spoller.nextElementSibling);
			}

			spoller.addEventListener("click", function (e) {
				e.preventDefault();
				if (spoller.classList.contains('_spoller-992') && window.innerWidth > 992) {
					return false;
				}
				if (spoller.classList.contains('_spoller-768') && window.innerWidth > 768) {
					return false;
				}
				if (spoller.closest('._spollers').classList.contains('_one')) {
					let curent_spollers = spoller.closest('._spollers').querySelectorAll('._spoller');
					for (let i = 0; i < curent_spollers.length; i++) {
						let el = curent_spollers[i];
						if (el != spoller) {
							el.classList.remove('_active');
							el.parentElement.classList.remove('_active');
							_slideUp(el.nextElementSibling);
						}
					}
				}
				spoller.classList.toggle('_active');
				if(spoller.classList.contains('_active')) {
					spoller.parentElement.classList.add('_active');
				} else {
					spoller.parentElement.classList.remove('_active');
				}
				_slideToggle(spoller.nextElementSibling);
			});
		}
	}
}
spollerInit()
// === // Spollers ==================================================================






function createTabs(containerName = false, triggersName = false, tabsName = false) {
	let container = document.querySelector(`${containerName}`);
	if (container) {
		let allTriggers = container.querySelectorAll(`${triggersName}`);
		let allTabs = container.querySelectorAll(`${tabsName}`);

		if (allTriggers.length) {
			allTriggers.forEach(trigger => {
				trigger.addEventListener('click', (e) => {
					e.preventDefault();
					const id = trigger.getAttribute('href').replace('#', '');

					trigger.classList.add('active');

					allTriggers.forEach(i => {
						if (i == trigger) {
							return
						}
						i.classList.remove('active');
					});

					allTabs.forEach(tab => {
						if (tab.id == id) {
							tab.classList.add('active')
						} else {
							tab.classList.remove('active');
						}
					})

				})
			})
		}

	}
}

//createTabs('.tabs', '.tab-trigger', '.tab-content')


function setSameHeight(items) {
    if(!items.length) return;

    let maxHeight = Math.max(...Array.from(items).map(i => i.clientHeight));
    items.forEach(i => i.style.minHeight = maxHeight + 'px');
}

function setCounterAnim() {
	let couterItems = document.querySelectorAll('[data-counter]');
    if (couterItems) {
        couterItems.forEach(item => {
            let animation = anime({
                targets: item,
                textContent: [0, item.dataset.counter || 0],
                round: 1,
                easing: 'linear',
                autoplay: false,
                duration: 1000
            });
            const observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.intersectionRatio >= 0.7) {
                            animation.play();
                            observer.disconnect();
                        }
                    });
                },
                {
                    threshold: 0.7
                }
            );

            observer.observe(item);
        })
    }
}

setCounterAnim();

let anchors = document.querySelectorAll('.anchor');
if(anchors.length) {
	anchors.forEach(anchor => {
		if(!anchor.getAttribute('href').match(/#\w+$/gi)) return;
		
		let id = anchor.getAttribute('href').match(/#\w+$/gi).join('').replace('#', '');
		anchor.addEventListener('click', (e) => {

			let el = document.getElementById(id);
			if(el) {
				e.preventDefault();
				window.scrollTo({
					top: el.offsetTop - 100,
					behavior: 'smooth',
				})
			}

		})
	})
}

function trimString(el, stringLength = 0) {
	let str = el.innerText;
	if(str.length <= stringLength) return;
	el.innerText = [...str].slice(0, stringLength).join('') + '...';
}

;
	// //let btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');
// let forms = document.querySelectorAll('form');
// if (forms.length > 0) {
// 	for (let index = 0; index < forms.length; index++) {
// 		const el = forms[index];
// 		el.addEventListener('submit', form_submit);
// 	}
// }
// function form_submit(e) {
// 	let btn = event.target;
// 	let form = btn.closest('form');
// 	let message = form.getAttribute('data-message');
// 	let error = form_validate(form);
// 	if (error == 0) {
// 		//SendForm
// 		form_clean(form);
// 		if (message) {
// 			popup_open('message-' + message);
// 			e.preventDefault();
// 		}
// 	} else {
// 		let form_error = form.querySelectorAll('._error');
// 		if (form_error && form.classList.contains('_goto-error')) {
// 			_goto(form_error[0], 1000, 50);
// 		}
// 		event.preventDefault();
// 	}
// }
// function form_validate(form) {
// 	let error = 0;
// 	let form_req = form.querySelectorAll('._req');
// 	if (form_req.length > 0) {
// 		for (let index = 0; index < form_req.length; index++) {
// 			const el = form_req[index];
// 			if (!_is_hidden(el)) {
// 				error += form_validate_input(el);
// 			}
// 		}
// 	}
// 	return error;
// }
// function form_validate_input(input) {
// 	let error = 0;
// 	let input_g_value = input.getAttribute('data-value');

// 	if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
// 		if (input.value != input_g_value) {
// 			let em = input.value.replace(" ", "");
// 			input.value = em;
// 		}
// 		if (email_test(input) || input.value == input_g_value) {
// 			form_add_error(input);
// 			error++;
// 		} else {
// 			form_remove_error(input);
// 		}
// 	} else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
// 		form_add_error(input);
// 		error++;
// 	} else {
// 		if (input.value == '' || input.value == input_g_value) {
// 			form_add_error(input);
// 			error++;
// 		} else {
// 			form_remove_error(input);
// 		}
// 	}
// 	return error;
// }
// function form_add_error(input) {
// 	input.classList.add('_error');
// 	input.parentElement.classList.add('_error');

// 	let input_error = input.parentElement.querySelector('.form__error');
// 	if (input_error) {
// 		input.parentElement.removeChild(input_error);
// 	}
// 	let input_error_text = input.getAttribute('data-error');
// 	if (input_error_text && input_error_text != '') {
// 		input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
// 	}
// }
// function form_remove_error(input) {
// 	input.classList.remove('_error');
// 	input.parentElement.classList.remove('_error');

// 	let input_error = input.parentElement.querySelector('.form__error');
// 	if (input_error) {
// 		input.parentElement.removeChild(input_error);
// 	}
// }
// function form_clean(form) {
// 	let inputs = form.querySelectorAll('input,textarea');
// 	for (let index = 0; index < inputs.length; index++) {
// 		const el = inputs[index];
// 		el.parentElement.classList.remove('_focus');
// 		el.classList.remove('_focus');
// 		el.value = el.getAttribute('data-value');
// 	}
// 	let checkboxes = form.querySelectorAll('.checkbox__input');
// 	if (checkboxes.length > 0) {
// 		for (let index = 0; index < checkboxes.length; index++) {
// 			const checkbox = checkboxes[index];
// 			checkbox.checked = false;
// 		}
// 	}
// 	let selects = form.querySelectorAll('select');
// 	if (selects.length > 0) {
// 		for (let index = 0; index < selects.length; index++) {
// 			const select = selects[index];
// 			const select_default_value = select.getAttribute('data-default');
// 			select.value = select_default_value;
// 			select_item(select);
// 		}
// 	}
// }

// let viewPass = document.querySelectorAll('.form__viewpass');
// for (let index = 0; index < viewPass.length; index++) {
// 	const element = viewPass[index];
// 	element.addEventListener("click", function (e) {
// 		if (element.classList.contains('_active')) {
// 			element.parentElement.querySelector('input').setAttribute("type", "password");
// 		} else {
// 			element.parentElement.querySelector('input').setAttribute("type", "text");
// 		}
// 		element.classList.toggle('_active');
// 	});
// }


//Select
let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
	selects_init();
}
function selects_init() {
	for (let index = 0; index < selects.length; index++) {
		const select = selects[index];
		select_init(select);
	}
	//select_callback();
	document.addEventListener('click', function (e) {
		selects_close(e);
	});
	document.addEventListener('keydown', function (e) {
		if (e.which == 27) {
			selects_close(e);
		}
	});
}
function selects_close(e) {
	const selects = document.querySelectorAll('.select');
	if (!e.target.closest('.select')) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			select.classList.remove('_active');
			_slideUp(select_body_options, 100);
		}
	}
}
function select_init(select) {
	const select_parent = select.parentElement;
	const select_modifikator = select.getAttribute('class');
	const select_selected_option = select.querySelector('option:checked');
	select.setAttribute('data-default', select_selected_option.value);
	select.style.display = 'none';

	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

	let new_select = select.parentElement.querySelector('.select');
	new_select.appendChild(select);
	select_item(select);
}
function select_item(select) {
	const select_parent = select.parentElement;
	const select_items = select_parent.querySelector('.select__item');
	const select_options = select.querySelectorAll('option');
	const select_selected_option = select.querySelector('option:checked');
	const select_selected_text = select_selected_option.text;
	const select_type = select.getAttribute('data-type');

	if (select_items) {
		select_items.remove();
	}

	let select_type_content = '';
	if (select_type == 'input') {
		select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
	} else {
		select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';
	}

	select_parent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + select_type_content + '</div>' +
		'<div class="select__options">' + select_get_options(select_options) + '</div>' +
		'</div></div>');

	select_actions(select, select_parent);
}
function select_actions(original, select) {
	const select_item = select.querySelector('.select__item');
	const select_body_options = select.querySelector('.select__options');
	const select_options = select.querySelectorAll('.select__option');
	const select_type = original.getAttribute('data-type');
	const select_input = select.querySelector('.select__input');

	select_item.addEventListener('click', function () {
		let selects = document.querySelectorAll('.select');
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			if (select != select_item.closest('.select')) {
				select.classList.remove('_active');
				_slideUp(select_body_options, 100);
			}
		}
		_slideToggle(select_body_options, 100);
		select.classList.toggle('_active');
	});

	for (let index = 0; index < select_options.length; index++) {
		const select_option = select_options[index];
		const select_option_value = select_option.getAttribute('data-value');
		const select_option_text = select_option.innerHTML;

		if (select_type == 'input') {
			select_input.addEventListener('keyup', select_search);
		} else {
			if (select_option.getAttribute('data-value') == original.value) {
				select_option.style.display = 'none';
			}
		}
		select_option.addEventListener('click', function () {
			for (let index = 0; index < select_options.length; index++) {
				const el = select_options[index];
				el.style.display = 'block';
			}
			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
			} else {
				select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
				original.value = select_option_value;
				select_option.style.display = 'none';

				let event = new Event("change", {bubbles: true}); 
				original.dispatchEvent(event);
			}
		});
	}
}
function select_get_options(select_options) {
	if (select_options) {
		let select_options_content = '';
		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.value;
			if (select_option_value != '') {
				const select_option_text = select_option.text;
				select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
			}
		}
		return select_options_content;
	}
}
function select_search(e) {
	let select_block = e.target.closest('.select ').querySelector('.select__options');
	let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
	let select_search_text = e.target.value.toUpperCase();

	for (let i = 0; i < select_options.length; i++) {
		let select_option = select_options[i];
		let select_txt_value = select_option.textContent || select_option.innerText;
		if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
			select_option.style.display = "";
		} else {
			select_option.style.display = "none";
		}
	}
}
function selects_update_all() {
	let selects = document.querySelectorAll('select');
	if (selects) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_item(select);
		}
	}
}

//Placeholers
let inputs = document.querySelectorAll('input');
inputs_init(inputs);


function inputs_init(inputs) {
	if (inputs.length > 0) {
		for (let index = 0; index < inputs.length; index++) {
			const input = inputs[index];
			
			if (input.classList.contains('_mask')) {
				//'+7(999) 999 9999'
				//'+38(999) 999 9999'
				//'+375(99)999-99-99'
				let maskValue = input.dataset.mask;
				input.classList.add('_mask');
				Inputmask('+1(999) 999 9999', {
					//"placeholder": '',
					clearIncomplete: true,
					clearMaskOnLostFocus: true,
					onincomplete: function () {
						//input_clear_mask(input, input_g_value);
					}
				}).mask(input);
			}
			if (input.classList.contains('_digital')) {
				console.log('test');

				Inputmask('9{*}', {
					//"placeholder": '',
					clearIncomplete: true,
					clearMaskOnLostFocus: true,
					onincomplete: function () {
						//input_clear_mask(input, input_g_value);
					}
				}).mask(input);
			}
			if (input.classList.contains('_date')) {
				datepicker(input, {
					formatter: (input, date, instance) => {
						const value = date.toLocaleDateString()
						input.value = value
					},
					onSelect: function (input, instance, date) {
						input_focus_add(input.el);
					}
				});
			}

			//const input_g_value = input.getAttribute('data-value');
			//input_placeholder_add(input);
			// if (input.value != '' && input.value != input_g_value) {
			// 	input_focus_add(input);
			// }
			// input.addEventListener('focus', function (e) {
			// 	if (input.value == input_g_value) {
			// 		input_focus_add(input);
			// 		input.value = '';
			// 	}
			// 	if (input.getAttribute('data-type') === "pass") {
			// 		input.setAttribute('type', 'password');
			// 	}
			// 	if (input.classList.contains('_date')) {
			// 		/*
			// 		input.classList.add('_mask');
			// 		Inputmask("99.99.9999", {
			// 			//"placeholder": '',
			// 			clearIncomplete: true,
			// 			clearMaskOnLostFocus: true,
			// 			onincomplete: function () {
			// 				input_clear_mask(input, input_g_value);
			// 			}
			// 		}).mask(input);
			// 		*/
			// 	}
			// 	if (input.classList.contains('_phone')) {
			// 		//'+7(999) 999 9999'
			// 		//'+38(999) 999 9999'
			// 		//'+375(99)999-99-99'
			// 		input.classList.add('_mask');
			// 		Inputmask("+375 (99) 9999999", {
			// 			//"placeholder": '',
			// 			clearIncomplete: true,
			// 			clearMaskOnLostFocus: true,
			// 			onincomplete: function () {
			// 				input_clear_mask(input, input_g_value);
			// 			}
			// 		}).mask(input);
			// 	}
			// 	if (input.classList.contains('_digital')) {
			// 		input.classList.add('_mask');
			// 		Inputmask("9{1,}", {
			// 			"placeholder": '',
			// 			clearIncomplete: true,
			// 			clearMaskOnLostFocus: true,
			// 			onincomplete: function () {
			// 				input_clear_mask(input, input_g_value);
			// 			}
			// 		}).mask(input);
			// 	}
			// 	form_remove_error(input);
			// });
			// input.addEventListener('blur', function (e) {
			// 	if (input.value == '') {
			// 		input.value = input_g_value;
			// 		input_focus_remove(input);
			// 		if (input.classList.contains('_mask')) {
			// 			input_clear_mask(input, input_g_value);
			// 		}
			// 		if (input.getAttribute('data-type') === "pass") {
			// 			input.setAttribute('type', 'text');
			// 		}
			// 	}
			// });
			// if (input.classList.contains('_date')) {
			// 	datepicker(input, {
			// 		customDays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
			// 		customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
			// 		formatter: (input, date, instance) => {
			// 			const value = date.toLocaleDateString()
			// 			input.value = value
			// 		},
			// 		onSelect: function (input, instance, date) {
			// 			input_focus_add(input.el);
			// 		}
			// 	});
			// }
		}
	}
}
// function input_placeholder_add(input) {
// 	const input_g_value = input.getAttribute('data-value');
// 	if (input.value == '' && input_g_value != '') {
// 		input.value = input_g_value;
// 	}
// }
// function input_focus_add(input) {
// 	input.classList.add('_focus');
// 	input.parentElement.classList.add('_focus');
// }
// function input_focus_remove(input) {
// 	input.classList.remove('_focus');
// 	input.parentElement.classList.remove('_focus');
// }
// function input_clear_mask(input, input_g_value) {
// 	input.inputmask.remove();
// 	input.value = input_g_value;
// 	input_focus_remove(input);
// }

// ==  QUANTITY =====================================================
let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
	for (let index = 0; index < quantityButtons.length; index++) {
		const quantityButton = quantityButtons[index];
		quantityButton.addEventListener("click", function (e) {
			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
			if (quantityButton.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1
				}
			}
			quantityButton.closest('.quantity').querySelector('input').value = value;
		});
	}
}
// == // QUANTITY =====================================================

// == PRICE SLIDER =====================================================
let priceSlider = document.querySelector('.price-filter');

if(priceSlider) {
	let inputNumFrom = document.getElementById('priceStart');
	let inputNumTo = document.getElementById('priceEnd');
	let value = document.querySelector('.values-price-filter');

	let min = value.dataset.min;
	let max = value.dataset.max;
	let numStart = value.dataset.start;
	let numEnd = value.dataset.end;
	noUiSlider.create(priceSlider, {
		start: [+numStart, +numEnd],  
		connect: true,
		tooltips:[wNumb({decimals: 0, thousand: ','}) , wNumb({decimals: 0, thousand: ','})], 
		range: {
			'min': [+min],
			'1%': [100,100],
			'max': [+max],
		}
	});

	priceSlider.noUiSlider.on('update', function (values, handle) {

	    var value = values[handle];

	    if (handle) {
	        inputNumTo.value = Math.round(value);
	    } else {
	        inputNumFrom.value = Math.round(value);
	    }
	});

	inputNumTo.onchange = function() {
		setPriceValues()
	}

	inputNumFrom.onchange = function() {
		setPriceValues()
	}

	function setPriceValues() {
		let priceStartValue;
		let priceEndValue;
		if(inputNumFrom.value != '') {
			priceStartValue = inputNumFrom.value;
		}

		if(inputNumTo.value != '') {
			priceEndValue = inputNumTo.value;
		}

		  priceSlider.noUiSlider.set([priceStartValue, priceEndValue])
	}
}

// == // PRICE SLIDER =====================================================;
	
function burgerBtnAnimationToggle(burger) {
	burger.children[0].classList.toggle('first')
	burger.children[1].classList.toggle('second')
	burger.children[2].classList.toggle('third')
	burger.children[3].classList.toggle('fourth')
}
;
	{
    let header = document.querySelector('.header');
    let mobileMenu = document.querySelector('.mobile-menu');
    let btnBurger = document.querySelector('.burger');
    let subMenuAnchorLinks = document.querySelectorAll('.mobile-menu .sub-menu__link.anchor');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('is-scroll', window.pageYOffset > 100);
        });

        
        if (btnBurger) {
            btnBurger.addEventListener('click', () => {
                burgerBtnAnimationToggle(btnBurger);
                header.classList.toggle('menu-is-open');
                if (mobileMenu) mobileMenu.classList.toggle('open');
                document.body.classList.toggle('lock');
            })
        }

        // let subMenuAll = header.querySelectorAll('.sub-menu');
        // if (subMenuAll.length) {
        //     subMenuAll.forEach(subMenu => {
        //         if (subMenu.children.length == 2) {
        //             Array.from(subMenu.children).forEach(el => {
        //                 el.style.flexBasis = '50%';
        //                 el.style.width = '50%';
        //             })
        //         }
        //         if (subMenu.children.length == 3) {
        //             Array.from(subMenu.children).forEach(el => {
        //                 el.style.flexBasis = '33.33333%';
        //                 el.style.width = '33.33333%';
        //             })
        //         }
        //         if (subMenu.children.length >= 4) {
        //             Array.from(subMenu.children).forEach(el => {
        //                 el.style.flexBasis = '25%';
        //                 el.style.width = '25%';
        //             })
        //         }
        //     })
        // }
    }

    if (mobileMenu) {
        let hasSubMenuItems = mobileMenu.querySelectorAll('.menu-item-has-children');
        if (hasSubMenuItems.length) {
            hasSubMenuItems.forEach(item => {
                let link = item.querySelector('.menu__link');
                let subMenu = item.querySelector('.sub-menu');

                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    link.classList.toggle('sub-menu-is-open');
                    _slideToggle(subMenu);

                    hasSubMenuItems.forEach(i => {
                        if (i === item) return;

                        let link = i.querySelector('.menu__link');
                        let subMenu = i.querySelector('.sub-menu');
                        link.classList.remove('sub-menu-is-open');
                        _slideUp(subMenu);
                    })
                })
            })
        }
    }

    if(subMenuAnchorLinks.length) {
        subMenuAnchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                burgerBtnAnimationToggle(btnBurger);
                header.classList.toggle('menu-is-open');
                if (mobileMenu) mobileMenu.classList.toggle('open');
                document.body.classList.toggle('lock');
            })
        })
    }
}
;
	let heroSlider = document.querySelector('.hero-slider');
if(heroSlider) {
    let dataSlider = new Swiper(heroSlider.querySelector('.swiper-container'), {
        effect: 'fade',
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        watchOverflow: true,
        loop: true,
        pagination: {
        	el: heroSlider.querySelector('.swiper-pagination'),
        	clickable: true,
        },
        navigation: {
            nextEl: heroSlider.querySelector('.slider-button.next'),
            prevEl: heroSlider.querySelector('.slider-button.prev'),
        },
    });

    let bodyAll = heroSlider.querySelectorAll('.promo-header__body');
    const setHeight = () => {
        if(bodyAll.length) {
            bodyAll.forEach(body => {
                if(document.documentElement.clientWidth < 768) {
                    body.style.minHeight = document.documentElement.clientHeight - 69 + 'px';
                }
            })
        }
    }

    setHeight();

    window.addEventListener('resize', setHeight);
};
	{
    let coreValues = document.querySelector('.core-values');
    if(coreValues) {
        let dataSlider = new Swiper(coreValues.querySelector('.swiper-container'), {
            speed: 800,
            loop: true,
            navigation: {
                nextEl: coreValues.querySelector('.slider-button.next'),
                prevEl: coreValues.querySelector('.slider-button.prev'),
            },
            
            breakpoints: {
                320: {
                    slidesPerView: 'auto',
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                }
            }
        });

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.intersectionRatio >= 0.7) {
                        dataSlider.params = {
                            ...dataSlider.params,
                            autoplay: {
                                ...dataSlider.params.autoplay,
                                delay: 5000,
                                disableOnInteraction: false,
                                enabled: true,
                                reverseDirection: false,
                                stopOnLastSlide: false,
                                waitForTransition: true
                            }
                           
                        }
                        dataSlider.update();
                        observer.disconnect();
                    }
                });
            },
            {
                threshold: 0.7
            }
        );

        observer.observe(coreValues);
        
    }
};
	let servicesList = document.querySelector('.services__list');
if(servicesList) {
    let items = servicesList.querySelectorAll('.services__item');
    if(items.length) {
        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                if(document.documentElement.clientWidth >= 992) {
                    item.classList.add('active');
                }
            })
            item.addEventListener('mouseleave', () => {
                if(document.documentElement.clientWidth >= 992) {
                    item.classList.remove('active');
                }
                
            })
        })
    }
};
	let team = document.querySelector('.team');
if (team) {
    const slider = team.querySelector('.team__slider');
    if (slider) {
        let wrapper = slider.querySelector('.swiper-wrapper');

        let options = {
            speed: 800,
            navigation: {
                nextEl: team.querySelector('.slider-button.next'),
                prevEl: team.querySelector('.slider-button.prev'),
            },
            watchSlidesVisibility: true,
            watchOverflow: true,
            loop: true,
            breakpoints: {
                320: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },

                992: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                }
            },
        }

        if (wrapper.children.length <= 4) {
            team.classList.add('slider-is-empty');
            options = { ...options, touchRatio: 0, loop: false };
        }

        let mySwiper;


        function mobileSlider() {
            if (document.documentElement.clientWidth > 991.98 && slider.dataset.mobile == 'false') {
                mySwiper = new Swiper(slider, options);

                slider.dataset.mobile = 'true';

                //mySwiper.slideNext(0);
            }


            if (document.documentElement.clientWidth <= 992) {
                slider.dataset.mobile = 'false';

                if (slider.classList.contains('swiper-container-initialized')) {
                    mySwiper.destroy();
                }
            }
        }

        mobileSlider();


        let cards = slider.querySelectorAll('.team-card');
        if (cards.length && document.documentElement.clientWidth > 991.98) {
            let delay = 0;
            cards.forEach(card => {
                card.setAttribute('data-delay', delay += 100);
            })
        }
        if (cards.length) {
            cards.forEach(card => {
                card.classList.add('fadeIn');
            })
        }


        window.addEventListener('resize', () => {
            mobileSlider();
        })
    }

    let teamList = team.querySelector('.team__list');
    if (teamList) {
        let cards = team.querySelectorAll('.team-card');
        if (cards.length) {
            const splitArray = (arr, length) => {
                let arr2 = []
                let step = Math.floor(arr.length / length);
                let count = 0;
                for (let i = 0; i <= step; i++) {
                    arr2.push([arr[count], arr[count + 1], arr[count + 2], arr[count + 3]]);
                    count += length;
                }

                return arr2
            }

            let arrayEl = splitArray(cards, 4);
            arrayEl.forEach(innerArr => {
                innerArr[0] && innerArr[0].setAttribute('data-delay', '100');
                innerArr[1] && innerArr[1].setAttribute('data-delay', '200');
                innerArr[2] && innerArr[2].setAttribute('data-delay', '300');
                innerArr[3] && innerArr[3].setAttribute('data-delay', '400');
            })
        }

        let observer = new MutationObserver(mutationRecords => {
            let cards = team.querySelectorAll('.team-card');
            if (cards.length) {
                const splitArray = (arr, length) => {
                    let arr2 = []
                    let step = Math.floor(arr.length / length);
                    let count = 0;
                    for (let i = 0; i <= step; i++) {
                        arr2.push([arr[count], arr[count + 1], arr[count + 2], arr[count + 3]]);
                        count += length;
                    }
    
                    return arr2
                }
    
                let arrayEl = splitArray(cards, 4);
                arrayEl.forEach(innerArr => {
                    innerArr[0] && innerArr[0].setAttribute('data-delay', '100');
                    innerArr[1] && innerArr[1].setAttribute('data-delay', '200');
                    innerArr[2] && innerArr[2].setAttribute('data-delay', '300');
                    innerArr[3] && innerArr[3].setAttribute('data-delay', '400');
                })
            }

            localAnimationfadeIn();
        });

        observer.observe(teamList, {
            childList: true,
        });
    }


    let teamFilter = team.querySelector('#filter');
    if (teamFilter) {
        let inputCheckboxAll = teamFilter.querySelectorAll('input[type="checkbox"]');
        if (inputCheckboxAll.length) {
            let inputAllTeam = Array.from(inputCheckboxAll).filter(input => input.id === 'show-all-team' ? input : false)[0];
            let otherInputs = Array.from(inputCheckboxAll).filter(input => input.id === 'show-all-team' ? false : input);

            inputAllTeam.addEventListener('change', (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (inputAllTeam.checked) {
                    otherInputs.forEach(input => {
                        input.checked = true;
                    })
                } else {
                    otherInputs.forEach(input => {
                        input.checked = false;
                    })
                }
            })
        }
    }
}
;
	let capitalMarketsValuesSlider = document.querySelector('.capital-markets-values__slider');
if(capitalMarketsValuesSlider) {
    let dataSlider = new Swiper(capitalMarketsValuesSlider.querySelector('.swiper-container'), {
        autoplay: {
            delay: 1,
            disableOnInteraction: false,
        },
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        spaceBetween: 13,
        speed: 5000,
        watchOverflow: true,
        centeredSlides: true,
        loop: true,
        watchSlidesVisibility: true,
        navigation: {
            nextEl: capitalMarketsValuesSlider.querySelector('.capital-markets-values__arrow.next'),
            prevEl: capitalMarketsValuesSlider.querySelector('.capital-markets-values__arrow.prev'),
        },
        freeMode: true,
    });
    
};
	let teamDetail = document.querySelector('.team-detail');
if(teamDetail) {
    let bg = teamDetail.querySelector('.team-detail__bg');
    let position = teamDetail.querySelector('.team-detail__position');

    if(bg && position) {
        const setBgHeight = () => {
            bg.style.height = position.getBoundingClientRect().bottom  + 'px';
        }

        setBgHeight();

        window.addEventListener('resize', setBgHeight);
    }
};
	let news = document.querySelector('.news');
if (news) {
    function scrollTrigger(el, value, callback) {
        let triggerPoint = document.documentElement.clientHeight / 100 * (100 - value);
        const trigger = () => {
            if (el.getBoundingClientRect().top <= triggerPoint && !el.classList.contains('is-show')) {
                if (typeof callback === 'function') {
                    callback();
                    el.classList.add('is-show')
                }
            }
        }

        trigger();

        window.addEventListener('scroll', trigger);
    }



    let triggers = news.querySelectorAll('.news__head-item');
    let contentAll = news.querySelectorAll('.news__list');

    if (triggers.length && contentAll.length) {
        const startAnimation = (box) => {
            let c = 0;
            Array.from(box.children).forEach(li => {
                setTimeout(() => {
                    li.firstElementChild.classList.add('show');
                }, c += 100)
            })
        }

        const removeClasses = (box) => {
            Array.from(box.children).forEach(li => {
                li.firstElementChild.classList.remove('show');
            })
        }

        scrollTrigger(news, 15, () => { startAnimation(news.querySelector('.news__list.active'))});



        let heroTitle = document.querySelector('.hero__title');

        triggers.forEach(item => {
            let tabId = item.dataset.tab;

            item.addEventListener('click', () => {
                item.classList.add('active');

                if(heroTitle) {
                    heroTitle.innerText = item.dataset.titleName;
                }

                triggers.forEach(i => {
                    if (i === item) return;

                    i.classList.remove('active');
                })

                contentAll.forEach(box => {
                    if (box.dataset.tab === tabId) {
                        box.classList.add('active');
                        startAnimation(box);
                    } else {
                        box.classList.remove('active');
                        removeClasses(box);
                    }
                })
            })
        })

        let select = news.querySelector('.news__head-mob select');
        if (select) {
            select.addEventListener('change', (e) => {
                let tabId = e.target.value;

                if(heroTitle) {
                    heroTitle.innerText = e.target.selectedOptions[0].dataset.titleName;
                }

                contentAll.forEach(box => {
                    if (box.dataset.tab === tabId) {
                        box.classList.add('active');
                        startAnimation(box);
                    } else {
                        box.classList.remove('active');
                        removeClasses(box);
                    }
                })
            })
        }
    }

};
	{
    let rangeAll = document.querySelectorAll('.range');
    if (rangeAll.length) {
        rangeAll.forEach(range => {
            let min = range.dataset.min;
            let max = range.dataset.max;
            let numStart = range.dataset.start;
            let numEnd = range.dataset.end;
            let step = range.dataset.step;
            let slider = range.querySelector('.range__slider');
            let inputStart = range.querySelector('.range__start');
            let inputEnd = range.querySelector('.range__end');
            let fielpStart = range.querySelector('.range__values-start');
            let fielpEnd = range.querySelector('.range__values-end');

            noUiSlider.create(slider, {
                start: [+numStart, +numEnd],
                connect: true,
                range: {
                    'min': [+min],
                    'max': [+max],
                },
                step: +step,
            });

            let numFormat = wNumb({ decimals: 0, thousand: ',' });

            slider.noUiSlider.on('update', function (values, handle) {
                let value = values[handle];
                if (handle) {
                    inputEnd.value = Math.round(value);
                    fielpEnd.innerText = numFormat.to(Math.round(value));
                } else {
                    inputStart.value = Math.round(value);
                    fielpStart.innerText = numFormat.to(Math.round(value));
                }
            });

            slider.noUiSlider.on('change', (values, handle) => {
                let value = values[handle];
                if (handle) {
                    let event = new Event("change", { bubbles: true });
                    inputEnd.dispatchEvent(event);
                } else {
                    let event = new Event("change", { bubbles: true });
                    inputStart.dispatchEvent(event);
                }

            })
        })
    }

}

// {
//     let formFilter = document.querySelector('#filter');
//     if (formFilter) {
//         formFilter.addEventListener('submit', (e) => {
//             e.preventDefault();
//             console.dir(e.target);
//         });
//     }
// };
	let otherListings = document.querySelector('.other-listings');
if(otherListings) {
    const slider = otherListings.querySelector('.other-listings__slider');
    if (slider) {
        let wrapper = slider.querySelector('.swiper-wrapper');
        let cards = slider.querySelectorAll('.card');

        let options = {
            speed: 800,
            navigation: {
                nextEl: otherListings.querySelector('.slider-button.next'),
                prevEl: otherListings.querySelector('.slider-button.prev'),
            },
            watchSlidesVisibility: true,
            watchOverflow: true,
            loop: true,
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    spaceBetween:30,
                },

                992: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                }
            },
        }

        if(wrapper.children.length <= 3) {
            otherListings.classList.add('slider-is-empty');
            options = { ...options, touchRatio: 0, loop: false};
        }

        let mySwiper;


        function mobileSlider() {
            if (document.documentElement.clientWidth > 991.98 && slider.dataset.mobile == 'false') {
                mySwiper = new Swiper(slider, options);

                slider.dataset.mobile = 'true';

                //mySwiper.slideNext(0);
            }

            if (document.documentElement.clientWidth <= 992) {
                slider.dataset.mobile = 'false';

                if (slider.classList.contains('swiper-container-initialized')) {
                    mySwiper.destroy();
                }
            }
        }

        mobileSlider();

        if(cards.length && document.documentElement.clientWidth > 991.98) {
            let delay = 0;
            cards.forEach(card => {
                card.setAttribute('data-delay', delay+=100);
            })
        }

        if(cards.length) {
            cards.forEach(card => {
                card.classList.add('fadeIn');
            })
        }

        window.addEventListener('resize', () => {
            mobileSlider();
        })
    }
};
	let formFilter = document.querySelector('#filter');
if (formFilter) {
    let checkboxInputs = formFilter.querySelectorAll('input[type="checkbox"]');
    if (checkboxInputs.length) {
        checkboxInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                let event = new Event("submit", { bubbles: true }); 
                formFilter.dispatchEvent(event);
            })
        })
    }

    let rangeInputs = formFilter.querySelectorAll('input[type="hidden"]');
    if (rangeInputs.length) {
        rangeInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                let event = new Event("submit", { bubbles: true }); 
                formFilter.dispatchEvent(event);
            })
        })
    }
};
	let boxAll = document.querySelectorAll('.box');
if (boxAll.length) {
    boxAll.forEach(box => {
        let list = box.querySelector('.box__list');
        let textWrap = box.querySelector('.box__text-wrap');
        if (list.scrollHeight > 580) {
            textWrap.classList.add('is-scroll');

            list.addEventListener('scroll', () => {
                textWrap.classList.toggle('scroll-ended', (list.scrollTop + list.clientHeight) >= (list.scrollHeight - 15));
            })
        }
    })
};
	// ==== Popup form handler====

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if(popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function(e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}


const popupCloseIcon = document.querySelectorAll('.close-popup');
if(popupCloseIcon.length > 0) {
	for(let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function(e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if(curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener('click', function(e) {
			if(!e.target.closest('.popup_content')) {
				popupClose(e.target.closest('.popup'));
			}
		});

	}
}

function popupClose(popupActive, doUnlock = true) {
	if(unlock) {
		popupActive.classList.remove('open');
		if(doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
	let targetPadding = document.querySelectorAll('._lp');
	if(targetPadding.length) {
		for (let index = 0; index < targetPadding.length; index++) {
			const el = targetPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	if(lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	let targetPadding = document.querySelectorAll('._lp');

	setTimeout(function() {
		if(targetPadding.length) {
			for (let index = 0; index < targetPadding.length; index++) {
				const el = targetPadding[index];
				el.style.paddingRight = '0px';
			}
		}

		for( let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}

		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function() { 
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function(e) {
	if(e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

// === Polyfill ===
	(function() {
		if(!Element.prototype.closest) {
			Element.prototype.closest = function(css) {
				var node = this;
				while(node) {
					if(node.matches(css)) return node;
					else node == node.parentElement;
				}
				return null;
			};
		}
	})();

	(function() {
		if(!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.mozMatchesSelector;
		}
	})();
// === AND Polyfill ===;
	let otherNews = document.querySelector('.other-news');
if (otherNews) {
    const slider = otherNews.querySelector('.other-news__slider');
    if (slider) {
        let wrapper = slider.querySelector('.swiper-wrapper');
        let cards = slider.querySelectorAll('.post-card');


        let options = {
            speed: 800,
            navigation: {
                nextEl: otherNews.querySelector('.slider-button.next'),
                prevEl: otherNews.querySelector('.slider-button.prev'),
            },
            watchSlidesVisibility: true,
            watchOverflow: true,
            loop: true,
            breakpoints: {
                320: {
                    slidesPerView: 3,
                    spaceBetween:30,
                },

                992: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                }
            },
        }

        if(wrapper.children.length <= 3) {
            otherNews.classList.add('slider-is-empty');
            options = { ...options, touchRatio: 0,};
        }

        let mySwiper;


        function mobileSlider() {
            if (document.documentElement.clientWidth > 991.98 && slider.dataset.mobile == 'false') {
                mySwiper = new Swiper(slider, options);

                slider.dataset.mobile = 'true';

                //mySwiper.slideNext(0);
            }

            if (document.documentElement.clientWidth <= 992) {
                slider.dataset.mobile = 'false';

                if (slider.classList.contains('swiper-container-initialized')) {
                    mySwiper.destroy();
                }
            }
        }

        mobileSlider();

        if(cards.length && document.documentElement.clientWidth > 991.98) {
            let delay = 0;
            cards.forEach(card => {
                card.setAttribute('data-delay', delay+=100);
            })
        }

        if(cards.length) {
            cards.forEach(card => {
                card.classList.add('fadeIn');
            })
        }

        window.addEventListener('resize', () => {
            mobileSlider();
        })
    }

}
;
	let labelsCarousel = document.querySelectorAll('.labels-carousel');
if(labelsCarousel.length) {
    labelsCarousel.forEach(labelCarousel => {
        labelCarousel.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
        })

        let swiperLabelsCarousel = new Swiper(labelCarousel.querySelector('.swiper-container'), {
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 7,
            freeMode: true,
            speed: 100,
            grabCursor: true,
            watchSlidesVisibility: true,
            navigation: {
                nextEl: labelCarousel.querySelector('.labels-carousel__btn--next'),
                prevEl: labelCarousel.querySelector('.labels-carousel__btn--prev'),
            },
        });
        
    })
};

	(function uploadFileHandler() {
    let files = []
    let inputWrapItems = document.querySelectorAll('.file-input');
    if (inputWrapItems.length) {
        inputWrapItems.forEach(inputWrap => {
            let input = inputWrap.querySelector('input[type="file"]');
            let text = inputWrap.querySelector('.file-input__text');
            let deleteBtn = inputWrap.querySelector('.file-input__delete');


            const changeHandler = (event) => {
                if (!event.target.files.length) {
                    return
                }

                files = Array.from(event.target.files);

                let result = files.map(item => item.name);
                text.innerText = result.join(', ');
                inputWrap.classList.add('_has-files')
            }

            deleteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                input.value = '';
                files = [];
                text.innerText = 'Upload a file or drag and drop here';
                inputWrap.classList.remove('_has-files')
            })

            input.addEventListener('change', changeHandler);

            ;['dragenter', 'dragover'].forEach(eventName => {
                input.addEventListener(eventName, (e) => {
                    inputWrap.classList.add('highlight');
                });
            })
            ;['dragleave', 'drop'].forEach(eventName => {
                input.addEventListener(eventName, (e) => {
                    inputWrap.classList.remove('highlight');
                });
            })

            input.addEventListener('mouseenter', () => {
                inputWrap.classList.add('_hover')
            })
            input.addEventListener('mouseleave', () => {
                inputWrap.classList.remove('_hover')
            })

        })
    }
})()

; 

	let heroSliderListngs = document.querySelector('.hero-slider-listing');
let listing = document.querySelector('#response');
let listingSearch = document.querySelector('#listingSearch');
if (heroSliderListngs) {
    let sliderWrapper = heroSliderListngs.querySelector('.swiper-container .swiper-wrapper');
    let addressSliderWrapper = heroSliderListngs.querySelector('.hero-slider__controll-box-col-3 .swiper-container .swiper-wrapper');
    let notFoundImgUrl = heroSliderListngs.dataset.noPostFoundImg;
    let dataSlider = new Swiper(heroSliderListngs.querySelector('.swiper-container'), {
        effect: 'fade',
        autoplay: {
            delay: 6000,
            disableOnInteraction: false, 
        },
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        preloadImages: false,
        loop: true,
        lazy: {
            loadPrevNext: true,
        },
        pagination: {
            el: heroSliderListngs.querySelector('.swiper-pagination'),
            clickable: true,
        },
        navigation: {
            nextEl: heroSliderListngs.querySelector('.slider-button.next'),
            prevEl: heroSliderListngs.querySelector('.slider-button.prev'),
        },
    });

    let addressSlider = new Swiper(heroSliderListngs.querySelector('.hero-slider__controll-box-col-3 .swiper-container'), {
        effect: 'fade',
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        watchOverflow: true,
        touchRatio: 0,
        loop: true,
        navigation: {
            nextEl: '.about__more .more__item_next',
            prevEl: '.about__more .more__item_prev',
        },
    });

    dataSlider.controller.control = addressSlider;


    const getDate = (card) => {
        return { ...card.dataset };
    }

    const updateLazy = (el) => {
        let picture = el.querySelector('picture');
        let preloader = el.querySelector('.swiper-lazy-preloader');
        Array.from(picture.children).forEach(img => {
            if (img.dataset.srcset) {
                img.setAttribute('srcset', img.dataset.srcset);
                img.removeAttribute('data-srcset');

            } else if (img.dataset.src) {
                img.setAttribute('src', img.dataset.src);
                img.removeAttribute('data-src');
            }

            img.classList.add('swiper-lazy-loaded');
        })
        preloader.remove();
    }

    const createEmptyAddressSliderItem = () => {
        return `
        <div class="swiper-slide local">

        </div>
        `
    }

    const createEmptySliderItem = () => {
        return `
        <div class="swiper-slide">
            <div class="hero-slider__bg ibg">
                    <img src="${notFoundImgUrl}" alt="img">
            </div>
            <div class="promo-header__body container">
                <h1 class="promo-header__title" >
                    No Post Found
                </h1>
            </div>
        </div>`
    }

    const createSliderItem = (data) => {
        return `
        <div class="swiper-slide">
            <div class="hero-slider__bg ibg">
                <picture>
                    <source class="swiper-lazy" data-srcset="${data.deskImg}"
                        media="(min-width: 992px)">
                    <source class="swiper-lazy" data-srcset="${data.tabletImg}"
                        media="(min-width: 576px)">
                    <img class="swiper-lazy" data-src="${data.img}" alt="img">
                </picture>
                <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            </div>
            <div class="promo-header__body container">
                <h1 class="promo-header__title" >
                    ${data.title}
                </h1>
                <a href="${data.url}" class="btn-arrow">
                    View Listing
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="11.25" stroke="white" stroke-width="1.5"></circle>
                    <path d="M8.83984 6.9697L9.8095 6L15.7799 11.9704L9.8095 17.9408L8.83984 16.9711L13.1548 12.6561L14.0004 11.9704L13.1548 11.2847L8.83984 6.9697Z" fill="white"></path>
                    </svg>
                </a>
            </div>
        </div>`
    }

    const createAddressSliderItem = ({ address }) => {
        return `
        <div class="swiper-slide local">
            <div class="local__icon">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkuMDAwMDEgMEM1LjY5MTY3IDAgMyAyLjY5MTY3IDMgNi4wMDAwMUMzIDYuOTkzMTggMy4yNDgzMSA3Ljk3NzkgMy43MjAzNSA4Ljg1MTMyTDguNjcxOSAxNy44MDY2QzguNzM3ODIgMTcuOTI2IDguODYzNDMgMTggOS4wMDAwMSAxOEM5LjEzNjU5IDE4IDkuMjYyMjEgMTcuOTI2IDkuMzI4MTIgMTcuODA2NkwxNC4yODE1IDguODQ4MzdDMTQuNzUxNyA3Ljk3NzkgMTUgNi45OTMxNCAxNSA1Ljk5OTk4QzE1IDIuNjkxNjcgMTIuMzA4NCAwIDkuMDAwMDEgMFpNMTMuNjIzNCA4LjQ4ODQxTDkuMDAwMDEgMTYuODUwMUw0LjM3ODQ0IDguNDkxNzFDMy45NjcxOCA3LjczMDcyIDMuNzUwMDIgNi44NjkwNCAzLjc1MDAyIDYuMDAwMDFDMy43NTAwMiAzLjEwNTExIDYuMTA1MTQgMC43NTAwMjMgOS4wMDAwMSAwLjc1MDAyM0MxMS44OTQ5IDAuNzUwMDIzIDE0LjI1IDMuMTA1MTQgMTQuMjUgNi4wMDAwMUMxNC4yNSA2Ljg2OSAxNC4wMzI4IDcuNzMwNzIgMTMuNjIzNCA4LjQ4ODQxWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTguOTk5OTggM0M3LjM0NTgxIDMgNiA0LjM0NTgyIDYgNS45OTk5OUM2IDcuNjU0MTkgNy4zNDU4MSA5LjAwMDAxIDguOTk5OTggOS4wMDAwMUMxMC42NTQyIDkuMDAwMDEgMTIgNy42NTQxOSAxMiA2LjAwMDAyQzEyIDQuMzQ1ODUgMTAuNjU0MiAzIDguOTk5OTggM1pNOC45OTk5OCA4LjI1MDAyQzcuNzU5MjUgOC4yNTAwMiA2Ljc0OTk5IDcuMjQwNzYgNi43NDk5OSA2LjAwMDAyQzYuNzQ5OTkgNC43NTkyOSA3Ljc1OTI1IDMuNzUwMDIgOC45OTk5OCAzLjc1MDAyQzEwLjI0MDcgMy43NTAwMiAxMS4yNSA0Ljc1OTI5IDExLjI1IDYuMDAwMDJDMTEuMjUgNy4yNDA3MiAxMC4yNDA3IDguMjUwMDIgOC45OTk5OCA4LjI1MDAyWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==" alt="">
            </div>
            <div class="local__text">
                ${address}
            </div>
        </div>
        `
    }

    const updateSlider = (swiper) => {
        let id = setInterval(() => {
            swiper.update()
        }, 200);
        setTimeout(() => {
            clearInterval(id);
        }, 1000);
    }

    const listingHandler = () => {
        let sliderItems = [];
        let sliderAddressItems = [];

        if (listing.children.length) {
            Array.from(listing.children).forEach((li, index) => {
                let card = li.firstElementChild;
                let data = getDate(card);
                sliderItems.push(createSliderItem(data));
                sliderAddressItems.push(createAddressSliderItem(data));

                card.addEventListener('click', () => {
                    dataSlider.slideTo(index);
                })
                card.classList.add('has-event');
            })

            sliderWrapper.innerHTML = sliderItems.join('');
            addressSliderWrapper.innerHTML = sliderAddressItems.join('');

            updateSlider(dataSlider);
            updateSlider(addressSlider);

            dataSlider.slideTo(0);
            updateLazy(sliderWrapper.firstElementChild);
        } else {
            sliderWrapper.innerHTML = createEmptySliderItem();
            addressSliderWrapper.innerHTML = createEmptyAddressSliderItem();
        }
    }

    // (function init() {
    //     listingHandler();
    // })();

    // let observer = new MutationObserver(mutationRecords => {
    //     listingHandler();
    // });

    // observer.observe(listing, {
    //     childList: true,
    // });


    let bodyAll = heroSliderListngs.querySelectorAll('.promo-header__body');
    const setHeight = () => {
        if (bodyAll.length) {
            bodyAll.forEach(body => {
                if (document.documentElement.clientWidth < 768) {
                    body.style.minHeight = document.documentElement.clientHeight - 69 + 'px';
                }
            })
        }
    }

    setHeight();

    window.addEventListener('resize', setHeight);

}


// if(listingSearch && listing) {
//     let allTitlesText = [];

//     const applyFilter = (items, value) => {
//         let regExp = new RegExp(value, 'ig');

//         items.forEach((item, index) => {
//             let title = item.querySelector('.card__title');

//             if(regExp.test(title.innerText)) {
//                 item.style.display = 'block';
//                 title.innerHTML = allTitlesText[index].replace(regExp, '<span class="letters">$&</span>');
//             } else {
//                 item.style.display = 'none';
//                 title.innerHTML = allTitlesText[index];
//             }
//         })
//     }

//     const getTitlesText = (items) => {
//         items.forEach(item => {
//             let title = item.querySelector('.card__title');
//             allTitlesText.push(title.innerText);
//         })
//     }

//     getTitlesText(Array.from(listing.children));

//     let observer = new MutationObserver(mutationRecords => {
//         console.log('observer 2');
//         getTitlesText(Array.from(listing.children));
//     });

//     observer.observe(listing, {
//         childList: true,
//     });


//     listingSearch.addEventListener('input', (e) => {
//         applyFilter(Array.from(listing.children), e.target.value);
//     })
// }



// search result formated price ====
// new Promise((res, rej) => {
//     let id = setInterval(() => {
//         let resultContainer = document.querySelector('#ajaxsearchliteres1');
//         if (resultContainer) {
//             res(resultContainer);
//             clearInterval(id);
//         }
//     }, 100)
// }).then(resultContainer => {

//     let observer = new MutationObserver(mutationRecords => {
//         let allPrices =  resultContainer.querySelectorAll('.asl_desc');
//         if(allPrices.length) {
//             let numFormat = wNumb({ decimals: 0, prefix: '$', thousand: ',' });
//             allPrices.forEach(item => {
//                 console.log(item);
//                 //item.innerText = numFormat.to(item);
//             })
//         }
//     });

//     observer.observe(resultContainer, {
//         childList: true, 
//         subtree: true,
//         characterData: false, 
//     });
// });



	window.localAnimationfadeIn = () => {
		function scrollTrigger(el, value, callback) {
			let triggerPoint = document.documentElement.clientHeight / 100 * (100 - value);
			const trigger = () => {
				if (el.getBoundingClientRect().top <= triggerPoint && !el.classList.contains('is-show')) {
					if (typeof callback === 'function') {
						callback();
						el.classList.add('is-show')
					}
				}
			}
	
			trigger();
	
			window.addEventListener('scroll', trigger);
		}
	
	
		let counterItems2 = document.querySelectorAll('.fadeIn');
		if (counterItems2) {
	
			counterItems2.forEach(item => {
				scrollTrigger(item, 15, () => {
					setTimeout(() => { item.classList.add('_active') }, item.dataset.delay ? item.dataset.delay : 0);
				})
			})
		}
	}

	localAnimationfadeIn();


	let transactionsCardTitles = document.querySelectorAll('.transactions-card__title');
	if (transactionsCardTitles.length) {
		setSameHeight(transactionsCardTitles);
	}
	let transactionsCardPlace = document.querySelectorAll('.transactions-card__place');
	if (transactionsCardPlace.length) {
		setSameHeight(transactionsCardPlace);
	}



	let scrollBtn = document.querySelector('[data-scroll]');
	if(scrollBtn) {
		scrollBtn.addEventListener('click', () => {
			window.scrollTo({
				top: document.documentElement.clientHeight - 69,
				behavior: 'smooth',
			})
		})
	}
});

window.addEventListener('DOMContentLoaded', function () {
	if (isMobile.any()) {
		document.body.classList.add('_is-mobile');
	}

	if (isMobile.iOS()) {
		document.body.classList.add('_is-mobile-ios');
	}

	// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);

					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
			
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);


		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}

	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
			
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
			
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		//customAdapt();
	}


	dynamicAdapt();

	
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}

	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());;
	function scrollTrigger(el, value, callback) {
	let triggerPoint = document.documentElement.clientHeight / 100 * (100 - value);
    const trigger = () => {
        if(el.getBoundingClientRect().top <= triggerPoint && !el.classList.contains('is-show')) {
            if(typeof callback === 'function') {
                callback();
                el.classList.add('is-show')
            }
        }
    }

    trigger();

    window.addEventListener('scroll', trigger);
}

(function numberCounterAnim() {
    let counterItems = document.querySelectorAll('[data-number-counter-anim]');
    if (counterItems) {

        counterItems.forEach(item => {
            let animation = anime({
                targets: item,
                textContent: [0, item.innerText],
                round: 1,
                easing: 'linear',
                autoplay: false,
                duration: 1000
            });

            window.addEventListener('load', () => {
                scrollTrigger(item, 15, () => {animation.play()})
            })
        })
    }
})();

function wrapWords(el) {
    //el.innerHTML = el.innerHTML.replace( /[^<|>]\s?\w+[\s|,|\.$]?[^<|>]/g, '<span class="word">$&</span><span class="white-space"></span>');
    el.innerHTML = el.innerText.split(' ').map(word => `<span class="word">${word}</span><span class="white-space"></span>`).join('');
}

(function titleAnim() {
    let counterItems = document.querySelectorAll('[data-title-anim]');
    if (counterItems) {


        counterItems.forEach(item => {
            if (item.children.length) {
                Array.from(item.children).forEach(line => {
                    line.innerHTML = `<span class="word">${line.innerText}</span>`;
                })
            } else {
                item.innerHTML = `<span class="word">${item.innerText}</span>`;
            }


            let animation = anime({
                targets: item.querySelectorAll('.word'),
                translateY: ['100%', '0'],
                easing: 'easeInOutQuad',
                autoplay: false,
                duration: 600,
                delay: 300,
            });

            window.addEventListener('load', () => {
                scrollTrigger(item, 15, () => {
                    setTimeout(() => { animation.play(); }, item.dataset.delay ? item.dataset.delay : 0);
                })
            })
        })
    }
})();

(function textAnim() {
    let counterItems = document.querySelectorAll('[data-text-anim]');
    if (counterItems) {

        counterItems.forEach(item => {
            if (item.children.length) {
                Array.from(item.children).forEach(line => {
                    if(line.localName === 'ul' || line.localName === 'ol') {
                        if(line.children.length) {
                            Array.from(line.children).forEach(li => {
                                wrapWords(li)
                            })
                        }
                    } else if (line.localName === 'p') {
                        wrapWords(line)
                    } else {
                        return;
                    }
                })
            } else {
                wrapWords(item)
            }


            let animation = anime({
                targets: item.querySelectorAll('.word'),
                opacity: ['0', '1'],
                easing: 'easeInOutQuad',
                autoplay: false,
                duration: 1000,
                delay: function (el, i, l) {
                    return i * 10;
                },
            });

            window.addEventListener('load', () => {
                scrollTrigger(item, 15, () => {
                    setTimeout(() => { animation.play(); }, item.dataset.delay ? item.dataset.delay : 0);
                })
            })
        })
    }
})();

(function fadeIn() {
    let counterItems = document.querySelectorAll('[data-fade-in-anim]');
    if (counterItems) {


        counterItems.forEach(item => {

            let animation = anime({
                targets: item,
                opacity: ['0', '1'],
                easing: 'easeInOutQuad',
                autoplay: false,
                duration: 1000,
                delay: 300,
            });

            window.addEventListener('load', () => {
                scrollTrigger(item, 15, () => {
                    setTimeout(() => { animation.play(); }, item.dataset.delay ? item.dataset.delay : 0);
                })
            })
        })
    }
})();

(function imageAnim() {
    let counterItems = document.querySelectorAll('[data-image-anim]');
    if (counterItems) {


        counterItems.forEach(item => {

            let animation = anime({
                targets: item,
                scale: ['0.6', '1'],
                easing: 'easeInOutQuad',
                autoplay: false,
                duration: 1000,
                delay: 300,
            });

            window.addEventListener('load', () => {
                scrollTrigger(item, 15, () => {
                    setTimeout(() => { animation.play(); }, item.dataset.delay ? item.dataset.delay : 0);
                })
            })
        })
    }
})();;
	{
	let vimeoVideos = document.querySelectorAll('[data-vimeo-id]');
	if(vimeoVideos.length) {
		vimeoVideos.forEach(async video => {
			let id = video.dataset.vimeoId;
			let img = video.querySelector('img');
			
			if(document.documentElement.clientWidth < 992) {
				if(video.dataset.vimeoMobileId.trim()) {
					id = video.dataset.vimeoMobileId;
				}
			}

			if(!/[a-z]/gi.test(id)) {
				video.insertAdjacentHTML('beforeend', `<iframe src="https://player.vimeo.com/video/${id}?muted=1&amp;autoplay=1&amp;controls=0&amp;loop=1&amp;background=1&amp"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="autoplay;" ></iframe>`);
				let iframe = video.querySelector('iframe')
				iframe.onload = () => {
					if(img) {
						img.style.opacity = 0;
					}
				}
	
				 setCoverVideoIframe(iframe, video, {desk: {w: 16.56, h: 9.31}, mob: {w:5.55, h: 7}});
			} else {
				video.insertAdjacentHTML('beforeend', `<iframe src="https://iframe.videodelivery.net/${id}?autoplay=true&muted=true&controls=false" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>`);
				let iframe = video.querySelector('iframe');
				iframe.onload = () => {
					if(img) {
						img.style.opacity = 0;
					}
				}
				setCoverVideoIframe(iframe, video, {desk: {w: 16, h: 9}, mob: {w:555, h: 700}});

			}

		})
	}

	function setCoverVideoIframe(iframe, parent, size) {
		
		const setSize = (widthVideo = 16.56, heightVideo = 9.31) => {
			let percentHeight =  heightVideo / widthVideo * 100;
			let percentWidth =  widthVideo / heightVideo * 100;

			if((parent.clientHeight / parent.clientWidth * 100) < percentHeight ) {
				iframe.style.width = '100%';
				iframe.style.height = (parent.clientWidth / 100 * percentHeight) + 'px';
			} else {
				iframe.style.width = (parent.clientHeight / 100 * percentWidth) + 'px';
				iframe.style.height = '100%';
			}
		}

		if(document.documentElement.clientWidth >= 768) {
			setSize(size.desk.w, size.desk.h);
		} else {
			setSize(size.mob.w, size.mob.h);
		}

		window.addEventListener('resize', () => {
			if(document.documentElement.clientWidth >= 768) {
				setSize(size.desk.w, size.desk.h);
			} else {
				setSize(size.mob.w, size.mob.h);
			}
		});
	}

	
	let youtubeVideos = document.querySelectorAll('[data-youtube-id]');
	if (youtubeVideos.length) {
		youtubeVideos.forEach(video => {
			let videoContainer = document.createElement('div');
			video.append(videoContainer);
			let videoId = video.dataset.youtubeId;
			let img = video.querySelector('img');

			if(document.documentElement.clientWidth < 992) {
				if(video.dataset.youtubeMobileId.trim()) {
					videoId = video.dataset.youtubeMobileId;
				}
			}
			let player = new YT.Player(videoContainer, {
				height: 'auto',
				width: 'auto',
				videoId: videoId,
				playerVars: {
					autoplay: 1,
					loop: 1,
					playlist: videoId,
					controls: 0,
					enablejsapi: 1,
				},
				events: {
					onReady: (e) => {
						e.target.mute();
						e.target.playVideo();

						if(img) {
							img.style.opacity = 0;
						}
					}
				}
			});
		})
	}


	function setMobileVideoForBanner() {
		let videos = document.querySelectorAll('[data-media-mobile]');
		if(videos.length) {
			videos.forEach(video => {
				let url = video.dataset.mediaMobile;
				Array.from(video.children).forEach(item => {
					item.setAttribute('src', url);
				})
	
				video.load();
			})
		}
	}

	if(document.documentElement.clientWidth < 768) {
		setMobileVideoForBanner()
	}

	let fancyboxYoutubeLinks = document.querySelectorAll('[data-fancybox-youtube]');
	if(fancyboxYoutubeLinks.length) {
		fancyboxYoutubeLinks.forEach(link => {
			let id = link.getAttribute('href');
			if(/https:\/\/www\.youtube\.com/i.test(id)) return;
			link.setAttribute('href', `https://www.youtube.com/watch?v=${id}`)
		})
	}

	let fancyboxVimeoLinks = document.querySelectorAll('[data-fancybox-vimeo]');
	if(fancyboxVimeoLinks.length) {
		fancyboxVimeoLinks.forEach(link => {
			let id = link.getAttribute('href');
			if(/https:\/\/vimeo\.com\//i.test(id)) return;
			link.setAttribute('href', `https://vimeo.com/${id}`)
		})
	}
};


	function testWebP(callback) {

		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {

		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});

	// add arrow to buttons ===
	let buttonsWithArrow = document.querySelectorAll('.btn-arrow');
	if (buttonsWithArrow.length) {
		buttonsWithArrow.forEach(button => {
			button.insertAdjacentHTML('beforeend', `
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="12" cy="12" r="11.25" stroke="white" stroke-width="1.5"/>
				<path d="M8.83984 6.9697L9.8095 6L15.7799 11.9704L9.8095 17.9408L8.83984 16.9711L13.1548 12.6561L14.0004 11.9704L13.1548 11.2847L8.83984 6.9697Z" fill="white"/>
				</svg>
				`);
		})
	}
	// and add arrow to buttons ===

	// add search icon ==
	let searchWrapAll = document.querySelectorAll('.search-wrap');
	if (searchWrapAll.length) {
		searchWrapAll.forEach(el => {
			el.insertAdjacentHTML('beforeend', `
				<svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M14.8828 14.6152L11.3379 11.0703C11.25 11.0117 11.1621 10.9531 11.0742 10.9531H10.6934C11.6016 9.89844 12.1875 8.49219 12.1875 6.96875C12.1875 3.62891 9.43359 0.875 6.09375 0.875C2.72461 0.875 0 3.62891 0 6.96875C0 10.3379 2.72461 13.0625 6.09375 13.0625C7.61719 13.0625 8.99414 12.5059 10.0781 11.5977V11.9785C10.0781 12.0664 10.1074 12.1543 10.166 12.2422L13.7109 15.7871C13.8574 15.9336 14.0918 15.9336 14.209 15.7871L14.8828 15.1133C15.0293 14.9961 15.0293 14.7617 14.8828 14.6152ZM6.09375 11.6562C3.48633 11.6562 1.40625 9.57617 1.40625 6.96875C1.40625 4.39062 3.48633 2.28125 6.09375 2.28125C8.67188 2.28125 10.7812 4.39062 10.7812 6.96875C10.7812 9.57617 8.67188 11.6562 6.09375 11.6562Z" fill="currentColor"/>
				</svg>
				`);
		})
	}
	// and add search icon ==
});

