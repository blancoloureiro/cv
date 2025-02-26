
document.getElementById('themeToggle').addEventListener('click', () => {
    // Alternar el tema oscuro
    const darkThemeEnabled = document.body.classList.toggle('dark-theme');

    if (darkThemeEnabled) {
        document.documentElement.style.setProperty('--bg-color', '#333');
        document.documentElement.style.setProperty('--text-color', '#fff');
        document.documentElement.style.setProperty('--header-footer-bg', '#555');
        document.documentElement.style.setProperty('--header-footer-text', '#eee');
    } else {
        document.documentElement.style.setProperty('--bg-color', '#f4f4f4');
        document.documentElement.style.setProperty('--text-color', '#333');
        document.documentElement.style.setProperty('--header-footer-bg', '#333');
        document.documentElement.style.setProperty('--header-footer-text', '#fff');
    }
});
