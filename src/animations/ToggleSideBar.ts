import { gsap } from 'gsap';

export const ToggleSideBar = () => {

    let open = true; 
    const sidebar = document.querySelector('.sidebar');
    const addTask = document.querySelector('.add-task');
    const sidebarTitle = document.querySelector('.sb-header h1');
    const navlinkTitle = document.querySelector('.nav-header h3');
    const navLinks = document.querySelectorAll('.nav-links');
    const themeSwitch = document.querySelector('.theme-switch');
    
    gsap.set(addTask, { rotate: 180 });    

    return function displaySidebar() {
        let opacity = 1;
        if (window.innerWidth < 1080) {
            gsap.to(navLinks, { opacity: 0, duration: 0.25 });
            gsap.to(sidebar, {backgroundColor: "rgba(0, 0, 0, 0)", duration: 0.1 });
        }
        if (open) {
            gsap.to(sidebar, { width: "0rem", duration: 0.25 });
            gsap.to(sidebarTitle, { opacity: 0, duration: 0.05 });
            gsap.to(navlinkTitle, { opacity: 0, duration: 0.05 });
            gsap.to(themeSwitch, { opacity: 0, duration: 0.05 });
            gsap.to(addTask, { rotate: 0, duration: 0.1});
            open = false;
        } else {

            let width = "15rem";
            if (window.innerWidth < 1080) {
                width = "90%";
            }
            gsap.to(sidebar, { width: width, duration: 0.25, backgroundColor: "var(--secondary-color)" });
            gsap.to(sidebarTitle, { opacity: 1, duration: 0.25 });
            gsap.to(navlinkTitle, { opacity: 1, duration: 0.25 });
            gsap.to(themeSwitch, { opacity: 1, duration: 0.25 });
            gsap.to(addTask, { rotate: 180, duration: 0.1});
            gsap.to(navLinks, { opacity: 1, duration: 0.25 });
            open = true;
        }
    }

};