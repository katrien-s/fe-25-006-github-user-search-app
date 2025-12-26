const colorThemes = document.querySelectorAll("[name='theme']");
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

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

	updateToggleUI();
};

colorThemes.forEach((themeOption) => {
	themeOption.addEventListener('change', () => {
		storeTheme(themeOption.id);

		// fallback for no :has() support
		document.documentElement.className = themeOption.id;
		document.documentElement.style.setProperty('--theme-mode', themeOption.id);
		updateToggleUI();
	});
});

function updateToggleUI() {
	const activeTheme = localStorage.getItem('theme');
	const sunSVG = `
  <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#FFF" fill-rule="nonzero"><path d="M13.545 6.455c-.9-.9-2.17-1.481-3.545-1.481a4.934 4.934 0 00-3.545 1.481c-.9.9-1.481 2.17-1.481 3.545 0 1.376.582 2.646 1.481 3.545.9.9 2.17 1.481 3.545 1.481a4.934 4.934 0 003.545-1.481c.9-.9 1.481-2.17 1.481-3.545a4.934 4.934 0 00-1.481-3.545zM10 3.413a.7.7 0 00.688-.688V.688A.7.7 0 0010 0a.7.7 0 00-.688.688v2.037a.7.7 0 00.688.688zM15.635 5.344l1.455-1.455a.67.67 0 000-.952.67.67 0 00-.952 0l-1.455 1.455a.67.67 0 000 .952c.238.264.66.264.952 0zM19.312 9.312h-2.037a.7.7 0 00-.688.688.7.7 0 00.688.688h2.037A.7.7 0 0020 10a.7.7 0 00-.688-.688zM15.608 14.656a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455a.67.67 0 00.952 0 .67.67 0 000-.952l-1.455-1.455zM10 16.587a.7.7 0 00-.688.688v2.037A.7.7 0 0010 20a.7.7 0 00.688-.688v-2.037a.7.7 0 00-.688-.688zM4.365 14.656L2.91 16.111a.67.67 0 000 .952.67.67 0 00.952 0l1.455-1.455a.67.67 0 000-.952c-.238-.264-.66-.264-.952 0zM3.413 10a.7.7 0 00-.688-.688H.688A.7.7 0 000 10a.7.7 0 00.688.688h2.037A.7.7 0 003.413 10zM4.365 5.344a.67.67 0 00.952 0 .67.67 0 000-.952L3.862 2.937a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455z"/></g></svg>
 `;

	const moonSVG = `
 <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M19.513 11.397a.701.701 0 00-.588.128 7.496 7.496 0 01-2.276 1.336 7.101 7.101 0 01-2.583.462 7.505 7.505 0 01-5.32-2.209 7.568 7.568 0 01-2.199-5.342c0-.873.154-1.72.41-2.49a6.904 6.904 0 011.227-2.21.657.657 0 00-.102-.924.701.701 0 00-.589-.128C5.32.61 3.427 1.92 2.072 3.666A10.158 10.158 0 000 9.83c0 2.8 1.125 5.342 2.967 7.19a10.025 10.025 0 007.16 2.98c2.353 0 4.527-.822 6.266-2.183a10.13 10.13 0 003.58-5.624.623.623 0 00-.46-.796z" fill="#697C9A" fill-rule="nonzero"/></svg>
 `;

	if (activeTheme === 'dark') {
		themeToggle.innerHTML = `light ${sunSVG}`;
		themeToggle.setAttribute('data-theme', 'light');
	} else {
		themeToggle.innerHTML = `dark ${moonSVG}`;
		themeToggle.setAttribute('data-theme', 'dark');
	}

	themeToggle.setAttribute(
		'aria-label',
		activeTheme === 'dark' ? 'light' : 'dark'
	);

	themeToggle.setAttribute(
		'title',
		activeTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
	);
}

themeToggle.addEventListener('click', () => {
	const lightRadio = document.getElementById('light');
	const darkRadio = document.getElementById('dark');

	if (lightRadio.checked) {
		darkRadio.checked = true;
		darkRadio.dispatchEvent(new Event('change'));
	} else {
		lightRadio.checked = true;
		lightRadio.dispatchEvent(new Event('change'));
	}

	updateToggleUI();
});

themeToggle.addEventListener('keydown', (e) => {
	if (e.key === ' ' || e.key === 'Enter') {
		e.preventDefault();
		themeToggle.click();
	}
});

// Fetch Github profile data
async function fetchGitHubData(username) {
	try {
		document.getElementById('user-credits').textContent = 'Loading...';
		const response = await fetch(`https://api.github.com/users/${username}`);
		const data = await response.json();

		document.getElementById('avatar').src = data.avatar_url;
		document.getElementById('user-credits').textContent =
			data.name || data.login;
		document.getElementById('username').textContent = `@${data.login}`;
		const joinedDate = new Date(data.created_at);
		const options = { day: 'numeric', month: 'short', year: 'numeric' };
		document.getElementById(
			'joined'
		).textContent = `Joined ${joinedDate.toLocaleDateString(
			undefined,
			options
		)}`;
		document.getElementById('user-bio').textContent = data.bio || 'No bio';
		document.getElementById('repos').textContent = data.public_repos;
		document.getElementById('followers').textContent = data.followers;
		document.getElementById('following').textContent = data.following;
		document.getElementById('location').textContent =
			data.location || 'Not Available';
		document.getElementById('twitter').textContent =
			data.twitter_username || 'Not Available';
		document.getElementById('blog').textContent = data.blog || 'Not Available';
		document.getElementById('company').textContent =
			data.company || 'Not Available';
	} catch (error) {
		console.error('Error fetching GitHub data:', error);
	}
}

// Get the searched username from the input field
function handleSearch(e) {
	e.preventDefault();
	const searchedUser = searchInput.value.trim();

	if (searchedUser) {
		fetchGitHubData(searchedUser);
		searchInput.focus();
	} else {
		document.querySelector('.error').style.display = 'block';
		setTimeout(() => {
			document.querySelector('.error').style.display = 'none';
		}, 3000);
	}

	searchInput.value = '';
}

searchButton.addEventListener('click', handleSearch);

searchButton.addEventListener('keydown', (e) => {
	if (e.key === 'Enter' || e.key === ' ') {
		handleSearch(e);
	}
});

searchInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		e.preventDefault();
		searchButton.click();
	}
});

// Initialize theme and fetch default user data on page load
document.addEventListener('DOMContentLoaded', () => {
	setTheme();
	updateToggleUI();
	fetchGitHubData('octocat');
});
