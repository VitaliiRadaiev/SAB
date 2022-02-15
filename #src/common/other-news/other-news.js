let otherNews = document.querySelector('.other-news');
if (otherNews) {
    const slider = otherNews.querySelector('.other-news__slider');
    if (slider) {
        let wrapper = slider.querySelector('.swiper-wrapper');
        let cards = slider.querySelectorAll('.post-card');


        let options = {
            speed: 800,
            navigation: {
                nextEl: otherNews.querySelector('.slider-button.next'),
                prevEl: otherNews.querySelector('.slider-button.prev'),
            },
            watchSlidesVisibility: true,
            watchOverflow: true,
            loop: true,
            breakpoints: {
                320: {
                    slidesPerView: 3,
                    spaceBetween:30,
                },

                992: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                }
            },
        }

        if(wrapper.children.length <= 3) {
            otherNews.classList.add('slider-is-empty');
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

        if(cards.length && document.documentElement.clientWidth > 991.98) {
            let delay = 0;
            cards.forEach(card => {
                card.setAttribute('data-delay', delay+=100);
            })
        }

        if(cards.length) {
            cards.forEach(card => {
                card.classList.add('fadeIn');
            })
        }

        window.addEventListener('resize', () => {
            mobileSlider();
        })
    }

}
