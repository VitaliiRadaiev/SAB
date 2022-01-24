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
        observer: true,
        observeParents: true, 
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        preloadImages: false,
        watchOverflow: true,
        watchSlidesVisibility: true,
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
// })