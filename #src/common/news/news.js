let news = document.querySelector('.news');
if (news) {
    function scrollTrigger(el, value, callback) {
        let triggerPoint = document.documentElement.clientHeight / 100 * (100 - value);
        const trigger = () => {
            if (el.getBoundingClientRect().top <= triggerPoint && !el.classList.contains('is-show')) {
                if (typeof callback === 'function') {
                    callback();
                    el.classList.add('is-show')
                }
            }
        }

        trigger();

        window.addEventListener('scroll', trigger);
    }



    let triggers = news.querySelectorAll('.news__head-item');
    let contentAll = news.querySelectorAll('.news__list');

    if (triggers.length && contentAll.length) {
        const startAnimation = () => {
            contentAll.forEach(box => {
                if(box.classList.contains('active')) {
                    let c = 0;
                    Array.from(box.children).forEach(li => {
                        setTimeout(() => {
                            li.firstElementChild.classList.add('show');
                        }, c+=100)
                    })
                }
            })
        }

        const removeClasses = (box) => {
            Array.from(box.children).forEach(li => {
                li.firstElementChild.classList.remove('show');
            })
        }

        scrollTrigger(news, 15, startAnimation);

        triggers.forEach(item => {
            let tabId = item.dataset.tab;

            item.addEventListener('click', () => {
                item.classList.add('active');

                triggers.forEach(i => {
                    if (i === item) return;

                    i.classList.remove('active');
                })

                contentAll.forEach(box => {
                    if (box.dataset.tab === tabId) {
                        box.classList.add('active');
                        startAnimation();
                    } else {
                        box.classList.remove('active');
                        removeClasses(box);
                    }
                })
            })
        })

        let select = news.querySelector('.news__head-mob select');
        if (select) {
            select.addEventListener('change', (e) => {
                let tabId = e.target.value;

                contentAll.forEach(box => {
                    if (box.dataset.tab === tabId) {
                        box.classList.add('active');
                        startAnimation();
                    } else {
                        box.classList.remove('active');
                        removeClasses(box);
                    }
                })
            })
        }
    }

    // contentAll.forEach(box => {
    //     let cards = box.querySelectorAll('.post-card');
    //     if (cards.length) {
    //         const splitArray = (arr, length) => {
    //             let arr2 = []
    //             let step = Math.floor(arr.length / length);
    //             let count = 0;
    //             for (let i = 0; i <= step; i++) {
    //                 arr2.push([arr[count], arr[count + 1], arr[count + 2]]);
    //                 count += length;
    //             }

    //             return arr2
    //         }

    //         let arrayEl = splitArray(cards, 3);
    //         arrayEl.forEach(innerArr => {
    //             innerArr[0] && innerArr[0].setAttribute('data-delay', '100');
    //             innerArr[1] && innerArr[1].setAttribute('data-delay', '200');
    //             innerArr[2] && innerArr[2].setAttribute('data-delay', '300');
    //         })

    //         cards.forEach(card => {
    //             let delay = card.dataset.delay;
    //             scrollTrigger(card, 15, () => {
    //                 setTimeout(() => {
    //                     card.classList.add('show')
    //                 }, delay)
    //             });
    //         })
    //     }
    // })
}