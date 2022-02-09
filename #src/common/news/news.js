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
        const startAnimation = (box) => {
            let c = 0;
            Array.from(box.children).forEach(li => {
                setTimeout(() => {
                    li.firstElementChild.classList.add('show');
                }, c += 100)
            })
        }

        const removeClasses = (box) => {
            Array.from(box.children).forEach(li => {
                li.firstElementChild.classList.remove('show');
            })
        }

        scrollTrigger(news, 15, () => { startAnimation(news.querySelector('.news__list.active'))});



        let heroTitle = document.querySelector('.hero__title');

        triggers.forEach(item => {
            let tabId = item.dataset.tab;

            item.addEventListener('click', () => {
                item.classList.add('active');

                if(heroTitle) {
                    heroTitle.innerText = item.dataset.titleName;
                }

                triggers.forEach(i => {
                    if (i === item) return;

                    i.classList.remove('active');
                })

                contentAll.forEach(box => {
                    if (box.dataset.tab === tabId) {
                        box.classList.add('active');
                        startAnimation(box);
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
                        startAnimation(box);
                    } else {
                        box.classList.remove('active');
                        removeClasses(box);
                    }
                })
            })
        }
    }

}