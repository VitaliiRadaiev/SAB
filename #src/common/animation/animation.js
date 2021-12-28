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
            const observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.intersectionRatio >= 0.7) {
                            animation.play();
                            observer.disconnect();
                        }
                    });
                },
                {
                    threshold: 0.7
                }
            );

            window.addEventListener('load', () => {
                observer.observe(item);
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
                    wrapWords(line)
                })
            } else {
                wrapWords(item)
            }


            let animation = anime({
                targets: item.querySelectorAll('.word'),
                translateY: ['100%', '0'],
                easing: 'easeInOutQuad',
                autoplay: false,
                duration: 600,
                delay: 300,
            });
            const observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.intersectionRatio >= 0.7) {
                            animation.play();
                            observer.disconnect();
                        }
                    });
                },
                {
                    threshold: 0.7
                }
            );

            window.addEventListener('load', () => {
                observer.observe(item);
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
                    if (
                        line.localName === 'h1' ||
                        line.localName === 'h2' ||
                        line.localName === 'h3' ||
                        line.localName === 'h4' ||
                        line.localName === 'h5' ||
                        line.localName === 'h6'
                    ) return;
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
            const observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.intersectionRatio >= 0.7) {
                            animation.play();
                            observer.disconnect();
                        }
                    });
                },
                {
                    threshold: 0.7
                }
            );

            window.addEventListener('load', () => {
                observer.observe(item);
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
            const observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.intersectionRatio >= 0.7) {
                            animation.play();
                            observer.disconnect();
                        }
                    });
                },
                {
                    threshold: 0.7
                }
            );

            window.addEventListener('load', () => {
                observer.observe(item);
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
            const observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.intersectionRatio >= 0.7) {
                            animation.play();
                            observer.disconnect();
                        }
                    });
                },
                {
                    threshold: 0.7
                }
            );

            window.addEventListener('load', () => {
                observer.observe(item);
            })
        })
    }
})();