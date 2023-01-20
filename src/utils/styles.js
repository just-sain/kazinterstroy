import { css } from '@emotion/react';

const globalStyles = css`
	:root {
		--header-height: 7rem;

		--container-l: 1440px;
		--container-m: 1240px;
		--container-s: 1040px;

		--outer-shadow: 0.3rem 0.3rem 0.6rem #d0d0d0, -0.3rem -0.3rem 0.6rem #f8f8f8;
		--outer-shadow-0: 0 0 0 #d0d0d0, 0 0 0 #f8f8f8;
		--inner-shadow: inset 0.3rem 0.3rem 0.6rem #d0d0d0, inset -0.3rem -0.3rem 0.6rem #f8f8f8;
		--inner-shadow-0: inset 0 0 0 #d0d0d0, inset 0 0 0 #f8f8f8;

		--bg: 255, 255, 255;
		--darker-bg: 241, 244, 243;

		--primary: 34, 138, 218;
		--primary-dark: 0, 78, 168;
		--secondary: 221, 112, 32;
		--cash: 17, 140, 79;
		--error: 235, 75, 75;

		--white: 255, 255, 255;
		--real-white: 255, 255, 255;
		--darker-white: 222, 222, 222;
		--black: 12, 10, 15;
		--gray: 58, 58, 58;
		--real-gray: 187, 187, 187;
		--black-gray: 35, 35, 35;
		--light-gray: 160, 160, 160;

		--font-family-primary: 'Inter', sans-serif;
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

	@keyframes fade-right {
		from {
			opacity: 0;
			transform: translateX(-20%);
		}
		to {
			opacity: 1;
			transform: translateX(0%);
		}
	}
	@keyframes fade-left {
		from {
			opacity: 0;
			transform: translateX(20%);
		}
		to {
			opacity: 1;
			transform: translateX(0%);
		}
	}
	@keyframes mirage {
		to {
			background-position: 215px 0, 0 0, 15px 150px, 15px 180px;
		}
	}
	@keyframes animMapLoader {
		0% {
			transform: scale(0);
			opacity: 1;
		}
		100% {
			transform: scale(1);
			opacity: 0;
		}
	}
	@keyframes catalogRotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes catalogRotationBack {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(-360deg);
		}
	}

	@keyframes snow {
		0% {
			background-position: 0px 0px, 0px 0px, 0px 0px;
		}
		100% {
			background-position: 600px 1800px, 600px 1200px, 600px 600px;
		}
	}
`;

export default globalStyles;
