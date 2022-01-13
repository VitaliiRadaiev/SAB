let formFilter = document.querySelector('#filter');
if (formFilter) {
    let checkboxInputs = formFilter.querySelectorAll('input[type="checkbox"]');
    if (checkboxInputs.length) {
        checkboxInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                let event = new Event("submit", { bubbles: true }); 
                formFilter.dispatchEvent(event);
            })
        })
    }

    let rangeInputs = formFilter.querySelectorAll('input[type="hidden"]');
    if (rangeInputs.length) {
        rangeInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                let event = new Event("submit", { bubbles: true }); 
                formFilter.dispatchEvent(event);
            })
        })
    }
}