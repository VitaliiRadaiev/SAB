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
}