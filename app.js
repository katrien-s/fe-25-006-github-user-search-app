const colorThemes = document.querySelectorAll("[name='theme']");

const storeTheme = (theme) => {
	localStorage.setItem('theme', theme);
};

const setTheme = () => {
	const activeTheme = localStorage.getItem('theme');
	colorThemes.forEach((themeOption) => {
		if (themeOption.id === activeTheme) {
			themeOption.checked = true;
		}
	});

	// fallback for no :has() support
	document.documentElement.className = activeTheme;
	document.documentElement.style.setProperty('--theme-mode', activeTheme);
};

colorThemes.forEach((themeOption) => {
	themeOption.addEventListener('change', () => {
		storeTheme(themeOption.id);

		// fallback for no :has() support
		document.documentElement.className = themeOption.id;
		document.documentElement.style.setProperty('--theme-mode', themeOption.id);
	});
});

document.addEventListener('DOMContentLoaded', setTheme);
