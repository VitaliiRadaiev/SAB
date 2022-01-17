let heroSliderListngs = document.querySelector('.hero-slider-listing');
if (heroSliderListngs) {
    let listing = document.querySelector('#listing');
    let sliderWrapper = heroSliderListngs.querySelector('.swiper-container .swiper-wrapper');
    let addressSliderWrapper = heroSliderListngs.querySelector('.hero-slider__controll-box-col-3 .swiper-container .swiper-wrapper');
    let notFoundImgUrl = heroSliderListngs.dataset.noPostFoundImg;
    let dataSlider = new Swiper(heroSliderListngs.querySelector('.swiper-container'), {
        effect: 'fade',
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        preloadImages: false,
        watchOverflow: true,
        touchRatio: 0,
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
                <a href="${data.url}" class="btn-arrow">View Listings</a>
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

            updateLazy(sliderWrapper.firstElementChild);
        } else {
            sliderWrapper.innerHTML = createEmptySliderItem();
            addressSliderWrapper.innerHTML = createEmptyAddressSliderItem();
        }
    }

    (function init() {
        listingHandler();
    })();

    let observer = new MutationObserver(mutationRecords => {
        console.log(mutationRecords);
    });

    observer.observe(listing, {
        childList: true,
    });


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