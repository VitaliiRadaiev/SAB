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

	@@include('_function.js');
	@@include('forms.js');
	@@include('../common/burger/burger.js');
	@@include('../common/header/header.js');
	@@include('../common/promo-header/promo-header.js');
	@@include('../common/core-values/core-values.js');
	@@include('../common/services/services.js');
	@@include('../common/team/team.js');
	@@include('../common/capital-markets-value/capital-markets-value.js');
	@@include('../common/team-detail/team-detail.js');
	@@include('../common/news/news.js');
	@@include('../common/range/range.js');
	@@include('../common/other-listings/other-listings.js');
	@@include('../common/filter/filter.js');
	@@include('../common/box/box.js');
	@@include('../common/popup/popup.js');
	@@include('../common/other-news/other-news.js');
	@@include('../common/labels-carousel/labels-carousel.js');

	@@include('../common/input-file/input-file.js'); 

	@@include('./pages/listings.js');



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

	@@include('files/dynamic_adapt.js');
	@@include('../common/animation/animation.js');
	@@include('../common/video/video.js');


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

