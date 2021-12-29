function scrollTrigger(el, value, callback) {
	let triggerPoint = document.documentElement.clientHeight / 100 * (100 - value);
    const trigger = () => {
        if(el.getBoundingClientRect().top <= triggerPoint && !el.classList.contains('is-show')) {
            if(typeof callback === 'function') {
                callback();
                el.classList.add('is-show')
            }
        }
    }

    trigger();

    window.addEventListener('scroll', trigger);
}

(function numberCounterAnim() {
    let counterItems = document.querySelectorAll('[data-number-counter-anim]');
    if (counterItems) {

        counterItems.forEach(item => {
            let animation = anime({
                targets: item,
                textContent: [0, item.innerText],
                round: 1,
                easing: 'linear',
                autoplay: false,
                duration: 1000
            });

            window.addEventListener('load', () => {
                scrollTrigger(item, 15, () => {animation.play()})
            })
        })
    }
})();

function wrapWords(el) {
    el.innerHTML = el.innerText.split(' ').map(word => `<span class="word">${word}</span><span class="white-space"></span>`).join('');
}

(function titleAnim() {
    let counterItems = document.querySelectorAll('[data-title-anim]');
    if (counterItems) {


        counterItems.forEach(item => {
            if (item.children.length) {
                Array.from(item.children).forEach(line => {
                    line.innerHTML = `<span class="word">${line.innerText}</span>`;
                })
            } else {
                item.innerHTML = `<span class="word">${item.innerText}</span>`;
            }


            let animation = anime({
                targets: item.querySelectorAll('.word'),
                translateY: ['100%', '0'],
                easing: 'easeInOutQuad',
                autoplay: false,
                duration: 600,
                delay: 300,
            });

            window.addEventListener('load', () => {
                scrollTrigger(item, 15, () => {
                    setTimeout(() => { animation.play(); }, item.dataset.delay ? item.dataset.delay : 0);
                })
            })
        })
    }
})();

(function textAnim() {
    let counterItems = document.querySelectorAll('[data-text-anim]');
    if (counterItems) {

        counterItems.forEach(item => {
            if (item.children.length) {
                Array.from(item.children).forEach(line => {
                    if (line.localName !== 'p') return;

                    wrapWords(line)
                })
            } else {
                wrapWords(item)
            }


            let animation = anime({
                targets: item.querySelectorAll('.word'),
                opacity: ['0', '1'],
                easing: 'easeInOutQuad',
                autoplay: false,
                duration: 1000,
                delay: function (el, i, l) {
                    return i * 10;
                },
            });

            window.addEventListener('load', () => {
                scrollTrigger(item, 15, () => {
                    setTimeout(() => { animation.play(); }, item.dataset.delay ? item.dataset.delay : 0);
                })
            })
        })
    }
})();

(function fadeIn() {
    let counterItems = document.querySelectorAll('[data-fade-in-anim]');
    if (counterItems) {


        counterItems.forEach(item => {

            let animation = anime({
                targets: item,
                opacity: ['0', '1'],
                easing: 'easeInOutQuad',
                autoplay: false,
                duration: 1000,
                delay: 300,
            });

            window.addEventListener('load', () => {
                scrollTrigger(item, 15, () => {
                    setTimeout(() => { animation.play(); }, item.dataset.delay ? item.dataset.delay : 0);
                })
            })
        })
    }

    let counterItems2 = document.querySelectorAll('.fadeIn');
    if (counterItems2) {


        counterItems2.forEach(item => {
            window.addEventListener('load', () => {
                scrollTrigger(item, 15, () => {
                    setTimeout(() => { item.classList.add('_active') }, item.dataset.delay ? item.dataset.delay : 0);
                })
            })
        })
    }
})();

(function imageAnim() {
    let counterItems = document.querySelectorAll('[data-image-anim]');
    if (counterItems) {


        counterItems.forEach(item => {

            let animation = anime({
                targets: item,
                scale: ['0.6', '1'],
                easing: 'easeInOutQuad',
                autoplay: false,
                duration: 1000,
                delay: 300,
            });

            window.addEventListener('load', () => {
                scrollTrigger(item, 15, () => {
                    setTimeout(() => { animation.play(); }, item.dataset.delay ? item.dataset.delay : 0);
                })
            })
        })
    }
})();