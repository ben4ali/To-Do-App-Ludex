export const ToggleOptions = (e: React.MouseEvent<HTMLElement>) => {
  const dialogOption = (e.target as HTMLElement).nextElementSibling;
  dialogOption?.classList.toggle('active-dialog');
};
