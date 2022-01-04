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
        touchRatio: 0,
        pagination: {
        	el: heroSlider.querySelector('.swiper-pagination'),
        	clickable: true,
        },
        navigation: {
            nextEl: heroSlider.querySelector('.slider-button.next'),
            prevEl: heroSlider.querySelector('.slider-button.prev'),
        },
    });

    let body = heroSlider.querySelector('.promo-header__body');
    const setHeight = () => {
        body.style.minHeight = document.documentElement.clientHeight - 69 + 'px';
    }

    setHeight();

    window.addEventListener('resize', setHeight);
}