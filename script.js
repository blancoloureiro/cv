const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const THEME_STORAGE_KEY = 'preferredTheme';

const setTheme = (isDark) => {
    document.body.classList.toggle('dark-theme', isDark);

    if (themeToggle) {
        themeToggle.textContent = isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
    }
};

const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
const shouldUseDarkTheme = savedTheme ? savedTheme === 'dark' : prefersDarkScheme.matches;

setTheme(shouldUseDarkTheme);

prefersDarkScheme.addEventListener('change', (event) => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        setTheme(event.matches);
    }
});

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = !document.body.classList.contains('dark-theme');
        setTheme(isDark);
        localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
    });
}
