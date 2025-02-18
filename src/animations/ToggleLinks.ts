import { gsap } from 'gsap';

export const DisplayLinks = () => {

    const links = document.getElementById('links');
    const linkBtn = document.getElementById('link-btn');

    linkBtn?.classList.toggle('active');
    
    const height = linkBtn?.classList.contains('active') ? '10rem' : '0rem';
    gsap.to(
        links,
        {
            height: height,
            duration: 0.25,
            ease: linkBtn?.classList.contains('active') ? 'back' : 'sine'
        }
    )

};

export const selectLink = (e: any) => {
    const links = document.querySelectorAll('.nav-links ul li');

    links.forEach(link => {
        link.classList.remove('selectedLink');
    });

    e.target.classList.add('selectedLink');
};
