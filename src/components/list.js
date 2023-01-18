import styled from '@emotion/styled';

// color: 'white' | 'black';
// columns?: any number but in string;
// gap?: 's' | 'm' | 'l';

export const List = styled.ul`
	display: grid;
	grid-template-columns: repeat(${({ columns }) => (columns ? columns : `1`)}, 1fr);
	justify-content: flex-start;
	align-items: flex-start;
	gap: ${({ gap }) => (gap === 's' ? `.5rem 1.5rem` : gap === 'l' ? '2rem 3rem' : `1rem 2rem`)};

	h6 {
		color: rgb(var(--${({ color }) => (color !== 'black' ? 'darker-white' : 'black')}));
		text-transform: uppercase;
		font-size: 1.4rem;
	}

	li {
		color: rgb(var(--${({ color }) => (color !== 'black' ? 'white' : 'black')}));
		font-size: 1.6rem;
	}

	a {
		text-decoration: underline;
	}

	@media screen and (max-width: 250px) {
		word-break: break-word;
	}
`;
