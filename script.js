const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const setTheme = (isDark) => {
    document.body.classList.toggle('dark-theme', isDark);
    themeToggle.textContent = isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
};

setTheme(prefersDarkScheme.matches);

prefersDarkScheme.addEventListener('change', (event) => {
    setTheme(event.matches);
});

themeToggle.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-theme');
    setTheme(isDark);
});
