let boxAll = document.querySelectorAll('.box');
if (boxAll.length) {
    boxAll.forEach(box => {
        let list = box.querySelector('.box__list');
        let textWrap = box.querySelector('.box__text-wrap');
        if (list.scrollHeight > 580) {
            textWrap.classList.add('is-scroll');

            list.addEventListener('scroll', () => {
                textWrap.classList.toggle('scroll-ended', (list.scrollTop + list.clientHeight) >= (list.scrollHeight - 15));
            })
        }
    })
}