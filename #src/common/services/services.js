let servicesList = document.querySelector('.services__list');
if(servicesList) {
    let items = servicesList.querySelectorAll('.services__item');
    if(items.length) {
        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.classList.add('active');

                // items.forEach(i => {
                //     if(i === item) return;
                //     i.classList.remove('active');
                // })
            })
            item.addEventListener('mouseleave', () => {
                item.classList.remove('active');

                // items.forEach(i => {
                //     if(i === item) return;
                //     i.classList.remove('active');
                // })
            })
        })
    }
}