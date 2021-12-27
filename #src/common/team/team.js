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
