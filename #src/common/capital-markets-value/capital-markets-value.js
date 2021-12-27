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
    
}