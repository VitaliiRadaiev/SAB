{
    let coreValues = document.querySelector('.core-values');
    if(coreValues) {
        let dataSlider = new Swiper(coreValues.querySelector('.swiper-container'), {

            // autoplay: {
            //     delay: 4000,
            //     disableOnInteraction: false,
            // },
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
}