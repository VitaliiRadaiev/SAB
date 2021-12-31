{
    let priceSlider = document.querySelector('.price-filter__slider');
    if (priceSlider) {
        let inputNumFrom = document.querySelector('.price-filter__input-start');
        let inputNumTo = document.querySelector('.price-filter__input-end');
        let value = document.querySelector('.values-price-filter');

        let min = value.dataset.min;
        let max = value.dataset.max;
        let numStart = value.dataset.start;
        let numEnd = value.dataset.end;

        noUiSlider.create(priceSlider, {
            start: [+numStart, +numEnd],
            connect: true,
            tooltips: [wNumb({ decimals: 0, thousand: ',' }), wNumb({ decimals: 0, thousand: ',' })],
            range: {
                'min': [+min],
                '1%': [100, 100],
                'max': [+max],
            }
        });

        priceSlider.noUiSlider.on('update', function (values, handle) {
            var value = values[handle];

            if (handle) {
                inputNumTo.value = Math.round(value);
            } else {
                inputNumFrom.value = Math.round(value);
            }
        });

        priceSlider.noUiSlider.on('change', () => {
            let event = new Event("change", {bubbles: true}); 
            inputNumFrom.dispatchEvent(event);
            inputNumTo.dispatchEvent(event);
        })

        inputNumTo.addEventListener('change', () => {
            setPriceValues()
        })

        inputNumFrom.addEventListener('change',() => {
            setPriceValues()
        })

        function setPriceValues() {
            let priceStartValue;
            let priceEndValue;
            if (inputNumFrom.value != '') {
                priceStartValue = inputNumFrom.value;
            }

            if (inputNumTo.value != '') {
                priceEndValue = inputNumTo.value;
            }

            priceSlider.noUiSlider.set([priceStartValue, priceEndValue])
        }

    }

    let rangeAll = document.querySelectorAll('.range');
    if(rangeAll.length) {
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
                //tooltips: [wNumb({ decimals: 0, thousand: ',' }), wNumb({ decimals: 0, thousand: ',' })],
                range: {
                    'min': [+min],
                    //'1%': [100, 100],
                    'max': [+max],
                },
                step: +step,
            });

            let numFormat = wNumb({ decimals: 0, thousand: ',' });

            slider.noUiSlider.on('update', function (values, handle) {
                var value = values[handle];
    
                if (handle) {
                    inputEnd.value = Math.round(value);
                    fielpEnd.innerText = numFormat.to(Math.round(value));
                } else {
                    inputStart.value = Math.round(value);
                    fielpStart.innerText = numFormat.to(Math.round(value));
                }
            });
        })
    }

}
