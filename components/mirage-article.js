// components
import styled from '@emotion/styled';

const StyledArticle = styled.article`
	padding: 2rem 1.5rem;
	overflow: hidden;

	cursor: progress;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: stretch;
	gap: 1rem;

	box-shadow: var(--outer-shadow), var(--inner-shadow-0);
	background: rgba(var(--real-white), 1);
	border-radius: 1.5rem;

	position: relative;

	transition: box-shadow 0.3s ease 0s;

	&:hover {
		box-shadow: var(--outer-shadow-0), var(--inner-shadow);
	}
`;

const Mirage = styled.div`
	background: linear-gradient(0.25turn, transparent, rgb(var(--real-white)), transparent),
		linear-gradient(rgb(var(--real-gray)), rgb(var(--real-gray))),
		linear-gradient(rgb(var(--real-gray)), rgb(var(--real-gray))),
		linear-gradient(rgb(var(--real-gray)), rgb(var(--real-gray)));
	background-color: rgb(var(--real-white));
	background-repeat: no-repeat;
	background-position: -215px 0, 0 0, 15px 150px, 15px 180px;
	animation: mirage 0.8s infinite;
`;

const Poster = styled.div`
	width: 100%;
	height: 20rem;
`;

const PosterImg = styled(Mirage)`
	width: 100%;
	height: calc(20rem + 2rem);

	position: absolute;
	top: 0;
	left: 0;
`;

const Name = styled.div`
	margin-top: 0.5rem;
`;

const NameItem = styled(Mirage)`
	width: 100%;
	height: 1.8rem;
	margin: 0.6rem 0;

	&:last-of-type {
		width: 75%;
	}
`;

const Line = styled(Mirage)`
	width: 40%;
	height: 1.3rem;
	margin: 0.3rem 0;

	&:last-of-type {
		width: 35%;
	}
`;

const Price = styled(Mirage)`
	width: 55%;
	height: 2rem;
	margin: 1.3rem 0 0;
`;

export const MirageArticle = () => {
	return (
		<StyledArticle>
			<div>
				<Poster>
					<PosterImg />
				</Poster>
				<Name>
					<NameItem />
					<NameItem />
				</Name>
			</div>
			<div>
				<Line />
				<Line />
				<Price />
			</div>
		</StyledArticle>
	);
};
