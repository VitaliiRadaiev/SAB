{
    let rangeAll = document.querySelectorAll('.range');
    if (rangeAll.length) {
        rangeAll.forEach(range => {
            let min = range.dataset.min;
            let max = range.dataset.max;
            let numStart = range.dataset.start;
            let numEnd = range.dataset.end;
            let step = range.dataset.step;
            let slider = range.querySelector('.range__slider');
            let inputStart = range.querySelector('.range__start');
            let inputEnd = range.querySelector('.range__end');
            let fielpStart = range.querySelector('.range__values-start');
            let fielpEnd = range.querySelector('.range__values-end');

            noUiSlider.create(slider, {
                start: [+numStart, +numEnd],
                connect: true,
                range: {
                    'min': [+min],
                    'max': [+max],
                },
                step: +step,
            });

            let numFormat = wNumb({ decimals: 0, thousand: ',' });

            slider.noUiSlider.on('update', function (values, handle) {
                let value = values[handle];
                if (handle) {
                    inputEnd.value = Math.round(value);
                    fielpEnd.innerText = numFormat.to(Math.round(value));
                } else {
                    inputStart.value = Math.round(value);
                    fielpStart.innerText = numFormat.to(Math.round(value));
                }
            });

            slider.noUiSlider.on('change', (values, handle) => {
                let value = values[handle];
                if (handle) {
                    let event = new Event("change", { bubbles: true });
                    inputEnd.dispatchEvent(event);
                } else {
                    let event = new Event("change", { bubbles: true });
                    inputStart.dispatchEvent(event);
                }

            })
        })
    }

}

// {
//     let formFilter = document.querySelector('#filter');
//     if (formFilter) {
//         formFilter.addEventListener('submit', (e) => {
//             e.preventDefault();
//             console.dir(e.target);
//         });
//     }
// }