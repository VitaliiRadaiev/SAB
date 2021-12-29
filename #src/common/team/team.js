let team = document.querySelector('.team');
if (team) {
    const slider = team.querySelector('.team__slider');
    if (slider) {
        let wrapper = slider.querySelector('.swiper-wrapper');
        let cards = slider.querySelectorAll('.team-card');
        if(cards.length && document.documentElement.clientWidth > 991.98) {
            let delay = 0;
            cards.forEach(card => {
                card.setAttribute('data-delay', delay+=100);
            })
        }

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

    let teamList = team.querySelector('.team__list');
    if(teamList) {
        let cards = team.querySelectorAll('.team-card');
        if(cards.length) {
            const splitArray = (arr, length) => {
                let arr2 = []
                let step = Math.floor(arr.length / length);
                let count = 0;
                for (let i = 0; i <= step; i++) {
                  arr2.push([arr[count], arr[count + 1], arr[count + 2], arr[count + 3]]);
                  count += length;
                }
        
                return arr2
              }
        
              let arrayEl = splitArray(cards, 4);
              console.log(arrayEl);
              arrayEl.forEach(innerArr => {
                innerArr[0] && innerArr[0].setAttribute('data-delay', '100');
                innerArr[1] && innerArr[1].setAttribute('data-delay', '200');
                innerArr[2] && innerArr[2].setAttribute('data-delay', '300');
                innerArr[3] && innerArr[3].setAttribute('data-delay', '400');
              })
        }
    }

}
