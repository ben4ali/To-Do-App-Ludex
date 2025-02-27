export const selectPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
  // get all the page links
  const links = document.querySelectorAll('.page-links a');
  if (!Array.from(links).includes(e.target as HTMLElement)) {
    return;
  }

  // remove the selected class from all the links
  links.forEach((link) => {
    link.classList.remove('selected-page-link');
  });

  // add the selected class to the clicked link
  (e.target as HTMLElement).classList.add('selected-page-link');
};
