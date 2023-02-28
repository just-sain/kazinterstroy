/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: {
		defaultLocale: 'ru',
		locales: ['ru'],
	},
	images: {
		domains: ['images.ctfassets.net', 'img.al-style.kz', 'al-style.kz'],
	},
};

module.exports = nextConfig;
