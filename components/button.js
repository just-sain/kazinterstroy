import { useRouter } from 'next/router';
// components
import styled from '@emotion/styled';
import { AiFillCaretRight } from 'react-icons/ai';

// size: 's' | 'm' | 'l'
// bg: variable
// color: variable
// href?: string
// isBold?: boolean
// withArrow?: boolean

const StyledButton = styled.button`
	padding: ${({ size }) => (size === 's' ? `1rem 1.5rem` : size === 'm' ? `1.25rem 2.5rem` : `1.75rem 3rem`)};

	display: flex;
	justify-content: space-between;
	align-items: center;

	border-radius: 1rem;
	background: rgb(var(--${({ background }) => background}));

	color: rgb(var(--${({ color }) => color}));
	font-size: ${({ size }) => (size === 's' ? `1.4` : size === 'm' ? `1.6` : `2`)}rem;
	font-weight: ${({ isBold }) => (isBold ? `7` : `4`)}00;
	text-decoration: none;

	transition: background 0.4s ease 0s;

	span {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.25rem;
	}

	a {
		text-decoration: none;
	}

	&:hover,
	&:focus {
		background: rgba(var(--${({ background }) => background}), 0.85);
	}

	&:disabled {
		cursor: no-drop;
		opacity: 0.5;
	}
`;

const RightIcon = styled(AiFillCaretRight)`
	width: auto;
	height: 100%;
	margin-left: 0.25rem;

	transform: scale(125%);
`;

export const Button = ({
	children,
	disabled = false,
	size = 'm',
	background = 'primary',
	color = 'white',
	href = '',
	isBold = false,
	withArrow = false,
	...props
}) => {
	const { push } = useRouter();

	return (
		<StyledButton
			disabled={disabled}
			size={size}
			isBold={isBold}
			background={background}
			color={color}
			onClick={!href ? props.onClick : () => push(href)}
			{...props}>
			<span>{children}</span>
			{withArrow && <RightIcon />}
		</StyledButton>
	);
};
