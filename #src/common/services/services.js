let servicesList = document.querySelector('.services__list');
if(servicesList) {
    let items = servicesList.querySelectorAll('.services__item');
    if(items.length) {
        items.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('active');

                items.forEach(i => {
                    if(i === item) return;
                    i.classList.remove('active');
                })
            })
        })
    }
}