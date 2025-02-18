const toggleTheme = (theme: 'dark' | 'light') => {
    const body = document.body;
    const selectedTheme = document.querySelector('.selectedTheme');
    selectedTheme?.classList.remove('selectedTheme');

    const themeElement = document.getElementById(`${theme}Theme`);
    themeElement?.classList.add('selectedTheme');

    if (theme === 'dark') {
        body.classList.remove('light-mode');
    } else {
        body.classList.add('light-mode');
    }
};

export const ToggleDarkTheme = () => toggleTheme('dark');
export const ToggleLightTheme = () => toggleTheme('light');
