let teamDetail = document.querySelector('.team-detail');
if(teamDetail) {
    let bg = teamDetail.querySelector('.team-detail__bg');
    let position = teamDetail.querySelector('.team-detail__position');

    if(bg && position) {
        const setBgHeight = () => {
            bg.style.height = position.getBoundingClientRect().bottom  + 'px';
        }

        setBgHeight();

        window.addEventListener('resize', setBgHeight);
    }
}