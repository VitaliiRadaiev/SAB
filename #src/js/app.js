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
	@@include('../common/burger/burger.js');
	@@include('../common/header/header.js');
	@@include('../common/core-values/core-values.js');
	@@include('../common/services/services.js');
	@@include('../common/team/team.js');
	@@include('../common/capital-markets-value/capital-markets-value.js');
	
	@@include('../common/video/video.js');

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
		
	})()


	let transactionsCardTitles = document.querySelectorAll('.transactions-card__title');
	if(transactionsCardTitles.length) {
		setSameHeight(transactionsCardTitles);
	}
	let transactionsCardPlace = document.querySelectorAll('.transactions-card__place');
	if(transactionsCardPlace.length) {
		setSameHeight(transactionsCardPlace);
	}
});

window.addEventListener('DOMContentLoaded', function () {
	if (isMobile.any()) {
		document.body.classList.add('_is-mobile');
	}

	if(isMobile.iOS()) {
		document.body.classList.add('_is-mobile-ios');
	}

	@@include('files/dynamic_adapt.js');

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
		if(buttonsWithArrow.length) {
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
});

