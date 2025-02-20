import { gsap } from 'gsap';

export const ToggleOptions = (e: any) => {
  const dialogOption = e.target.nextElementSibling;
  dialogOption?.classList.toggle('active-dialog');
};
