const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const setTheme = (isDark) => {
    document.body.classList.toggle('light-theme', !isDark);
    themeToggle.querySelector('.icon-button__icon').textContent = isDark ? '🌙' : '☀️';
    themeToggle.querySelector('.icon-button__text').textContent = isDark
        ? 'Modo oscuro'
        : 'Modo claro';
};

setTheme(prefersDarkScheme.matches);

prefersDarkScheme.addEventListener('change', (event) => {
    setTheme(event.matches);
});

themeToggle.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('light-theme');
    setTheme(!isDark);
});

const animatedSections = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    },
    { threshold: 0.2 }
);

animatedSections.forEach((section) => observer.observe(section));
