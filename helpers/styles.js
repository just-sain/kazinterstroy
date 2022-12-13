import { css } from '@emotion/react';

const globalStyles = css`
	:root {
		--header-height: 7rem;

		--container-l: 1440px;
		--container-m: 1240px;
		--container-s: 1040px;

		--primary: 34, 138, 218;
		--secondary: 221, 112, 32;
		--cash: 17, 140, 79;
		--error: 235, 75, 75;

		--bg: 251, 254, 253;
		--darker-bg: 241, 244, 243;

		--white: 255, 250, 250;
		--darker-white: 222, 222, 222;
		--black: 12, 10, 15;
		--gray: 58, 58, 58;
		--black-gray: 35, 35, 35;
		--light-gray: 160, 160, 160;

		--font-family-primary: -apple-system, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

		--font-light: 300;
		--font-medium: 500;
		--font-bold: 700;
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;

		*:hover,
		*:focus {
			outline: none;
		}
	}

	html,
	body {
		overflow: hidden auto;
		font-family: var(--font-family-primary);
	}

	html {
		font-size: 62.5%;
	}

	body {
		font-size: 1.6rem;
	}

	a,
	button {
		cursor: pointer;
		border: none;
		background: none;

		color: inherit;
		text-decoration: none;
	}

	ul,
	ol,
	menu,
	li {
		list-style: none;
	}

	input,
	textarea {
		background: none;
		border: none;

		color: inherit;
		font-size: inherit;
		font-weight: inherit;

		&::placeholder {
			color: inherit;
			font-size: inherit;
			font-weight: inherit;
		}
	}

	@keyframes fade-down {
		from {
			opacity: 0;
			transform: translateY(-150%);
		}
		to {
			opacity: 1;
			transform: translateY(0%);
		}
	}
`;

export default globalStyles;
