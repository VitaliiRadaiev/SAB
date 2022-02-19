(function uploadFileHandler() {
    let files = []
    let inputWrapItems = document.querySelectorAll('.file-input');
    if (inputWrapItems.length) {
        inputWrapItems.forEach(inputWrap => {
            let input = inputWrap.querySelector('input[type="file"]');
            let text = inputWrap.querySelector('.file-input__text');
            let deleteBtn = inputWrap.querySelector('.file-input__delete');


            const changeHandler = (event) => {
                if (!event.target.files.length) {
                    return
                }

                files = Array.from(event.target.files);

                let result = files.map(item => item.name);
                text.innerText = result.join(', ');
                inputWrap.classList.add('_has-files')
            }

            deleteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                input.value = '';
                files = [];
                text.innerText = 'Upload a file or drag and drop here';
                inputWrap.classList.remove('_has-files')
            })

            input.addEventListener('change', changeHandler);

            ;['dragenter', 'dragover'].forEach(eventName => {
                input.addEventListener(eventName, (e) => {
                    inputWrap.classList.add('highlight');
                });
            })
            ;['dragleave', 'drop'].forEach(eventName => {
                input.addEventListener(eventName, (e) => {
                    inputWrap.classList.remove('highlight');
                });
            })

            input.addEventListener('mouseenter', () => {
                inputWrap.classList.add('_hover')
            })
            input.addEventListener('mouseleave', () => {
                inputWrap.classList.remove('_hover')
            })

        })
    }
})()

