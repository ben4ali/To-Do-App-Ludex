import { gsap } from 'gsap';

export const ToggleSideBar = () => {

    let open = true; 
    const sidebar = document.querySelector('.sidebar');
    const addTask = document.querySelector('.add-task');
    const sidebarTitle = document.querySelector('.sb-header h1');
    const navlinkTitle = document.querySelector('.nav-header h3');
    const themeSwitch = document.querySelector('.theme-switch');
    
    gsap.set(addTask, { rotate: 180 });    

    return function displaySidebar() {
        if (open) {
            gsap.to(sidebar, { width: "0rem", duration: 0.25 });
            gsap.to(sidebarTitle, { opacity: 0, duration: 0.05 });
            gsap.to(navlinkTitle, { opacity: 0, duration: 0.25 });
            gsap.to(themeSwitch, { opacity: 0, duration: 0.25 });
            gsap.to(addTask, { rotate: 0, duration: 0.1});
            open = false;
        } else {
            gsap.to(sidebar, { width: "15rem", duration: 0.25 });
            gsap.to(sidebarTitle, { opacity: 1, duration: 0.25 });
            gsap.to(navlinkTitle, { opacity: 1, duration: 0.25 });
            gsap.to(themeSwitch, { opacity: 1, duration: 0.25 });
            gsap.to(addTask, { rotate: 180, duration: 0.1});
            open = true;
        }
    }

};