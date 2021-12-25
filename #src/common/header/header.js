{
    let header = document.querySelector('.header');
    let mobileMenu = document.querySelector('.mobile-menu');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('is-scroll', window.pageYOffset > 100);
        });

        let btnBurger = header.querySelector('.burger');
        if (btnBurger) {
            btnBurger.addEventListener('click', () => {
                burgerBtnAnimationToggle(btnBurger);
                header.classList.toggle('menu-is-open');
                if (mobileMenu) mobileMenu.classList.toggle('open');
                document.body.classList.toggle('lock');
            })
        }

        let subMenuAll = header.querySelectorAll('.sub-menu');
        if (subMenuAll.length) {
            subMenuAll.forEach(subMenu => {
                if (subMenu.children.length == 2) {
                    Array.from(subMenu.children).forEach(el => {
                        el.style.flexBasis = '50%';
                        el.style.width = '50%';
                    })
                }
                if (subMenu.children.length == 3) {
                    Array.from(subMenu.children).forEach(el => {
                        el.style.flexBasis = '33.33333%';
                        el.style.width = '33.33333%';
                    })
                }
                if (subMenu.children.length >= 4) {
                    Array.from(subMenu.children).forEach(el => {
                        el.style.flexBasis = '25%';
                        el.style.width = '25%';
                    })
                }
            })
        }
    }

    
    if (mobileMenu) {
        let hasSubMenuItems = mobileMenu.querySelectorAll('.menu-item-has-children');
        if (hasSubMenuItems.length) {
            hasSubMenuItems.forEach(item => {
                let link = item.querySelector('.menu__link');
                let subMenu = item.querySelector('.sub-menu');

                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    link.classList.toggle('sub-menu-is-open');
                    _slideToggle(subMenu);

                    hasSubMenuItems.forEach(i => {
                        if (i === item) return;

                        let link = i.querySelector('.menu__link');
                        let subMenu = i.querySelector('.sub-menu');
                        link.classList.remove('sub-menu-is-open');
                        _slideUp(subMenu);
                    })
                })
            })
        }
    }
}
