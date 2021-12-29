{
    let coreValues = document.querySelector('.core-values');
    if(coreValues) {
        let dataSlider = new Swiper(coreValues.querySelector('.swiper-container'), {
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
}