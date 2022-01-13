let servicesList = document.querySelector('.services__list');
if(servicesList) {
    let items = servicesList.querySelectorAll('.services__item');
    if(items.length) {
        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                if(document.documentElement.clientWidth >= 992) {
                    item.classList.add('active');
                }
            })
            item.addEventListener('mouseleave', () => {
                if(document.documentElement.clientWidth >= 992) {
                    item.classList.remove('active');
                }
                
            })
        })
    }
}