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
};
	
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

        let subMenuAll = header.querySelectorAll('.sub-menu');
        if (subMenuAll.length) {
            subMenuAll.forEach(subMenu => {
                if (subMenu.children.length == 2) {
                    Array.from(subMenu.children).forEach(el => {
                        el.style.flexBasis = '50%';
                        el.style.width = '50%';
                    })
                }
                if (subMenu.children.length == 3) {
                    Array.from(subMenu.children).forEach(el => {
                        el.style.flexBasis = '33.33333%';
                        el.style.width = '33.33333%';
                    })
                }
                if (subMenu.children.length >= 4) {
                    Array.from(subMenu.children).forEach(el => {
                        el.style.flexBasis = '25%';
                        el.style.width = '25%';
                    })
                }
            })
        }
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
	{
    let coreValues = document.querySelector('.core-values');
    if(coreValues) {
        let dataSlider = new Swiper(coreValues.querySelector('.swiper-container'), {

            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            speed: 800,
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
    }
};
	let servicesList = document.querySelector('.services__list');
if(servicesList) {
    let items = servicesList.querySelectorAll('.services__item');
    if(items.length) {
        items.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('active');

                items.forEach(i => {
                    if(i === item) return;
                    i.classList.remove('active');
                })
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
            breakpoints: {
                320: {
                    slidesPerView: 3,
                    spaceBetween:30,
                },

                992: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                }
            },
        }

        if(wrapper.children.length <= 4) {
            team.classList.add('slider-is-empty');
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

        window.addEventListener('resize', () => {
            mobileSlider();
        })
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

            window.addEventListener('load', () => {
                observer.observe(item);
            })
        })
    }
})();

function wrapWords(el) {
    el.innerHTML = el.innerText.split(' ').map(word => `<span class="word">${word}</span><span class="white-space"></span>`).join('');
}

(function titleAnim() {
    let counterItems = document.querySelectorAll('[data-title-anim]');
    if (counterItems) {


        counterItems.forEach(item => {
            if (item.children.length) {
                Array.from(item.children).forEach(line => {
                    wrapWords(line)
                })
            } else {
                wrapWords(item)
            }


            let animation = anime({
                targets: item.querySelectorAll('.word'),
                translateY: ['100%', '0'],
                easing: 'easeInOutQuad',
                autoplay: false,
                duration: 600,
                delay: 300,
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

            window.addEventListener('load', () => {
                observer.observe(item);
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
                    if (
                        line.localName === 'h1' ||
                        line.localName === 'h2' ||
                        line.localName === 'h3' ||
                        line.localName === 'h4' ||
                        line.localName === 'h5' ||
                        line.localName === 'h6'
                    ) return;
                    wrapWords(line)
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

            window.addEventListener('load', () => {
                observer.observe(item);
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

            window.addEventListener('load', () => {
                observer.observe(item);
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

            window.addEventListener('load', () => {
                observer.observe(item);
            })
        })
    }
})();;


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

