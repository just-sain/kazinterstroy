import styled from '@emotion/styled';

const LoaderContainer = styled.div`
	width: 100%;
	padding: 7.5rem 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Loader = styled.span`
	width: 7rem;
	height: 7rem;

	display: inline-block;
	border-radius: 50%;
	border: 0.5rem solid;
	border-color: rgb(var(--black)) rgb(var(--black)) transparent;
	box-sizing: border-box;

	position: relative;
	animation: catalogRotation 1s linear infinite;

	&::after {
		content: '';
		width: 5rem;
		height: 5rem;
		margin: auto;

		border: 0.4rem solid;
		border-color: transparent rgb(var(--primary));
		border-radius: 50%;

		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;

		transform-origin: center center;
		animation: catalogRotationBack 0.5s linear infinite;
	}
`;

export const Preloader = ({ ...props }) => {
	return (
		<LoaderContainer {...props}>
			<Loader />
		</LoaderContainer>
	);
};
