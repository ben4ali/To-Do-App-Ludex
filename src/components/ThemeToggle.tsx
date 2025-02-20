import {
  ToggleDarkTheme,
  ToggleLightTheme,
} from '../animations/themeToggleAnimation';

export const ThemeToggle = () => {
  return (
    <div className="theme-holder">
      <div className="theme" id="lightTheme" onClick={ToggleLightTheme}>
        <i className="bi bi-sun"></i>
        <p>Light</p>
      </div>
      <div
        className="theme selectedTheme"
        id="darkTheme"
        onClick={ToggleDarkTheme}
      >
        <i className="bi bi-moon"></i>
        <p>Dark</p>
      </div>
    </div>
  );
};
