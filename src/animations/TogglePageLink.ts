export const selectPage = (e: any) => {
    const links = document.querySelectorAll('.page-links a');
    if (!Array.from(links).includes(e.target)) {
        return;
    }
    links.forEach(link => {
        link.classList.remove('selected-page-link');
    });


    e.target.classList.add('selected-page-link');
 
}