import styled from '@emotion/styled';
import Link from 'next/link';

const Wrapper = styled.div`
	width: 100%;
	padding: 2rem;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 1rem;

	background: rgb(var(--darker-bg));
	border-radius: 1.5rem;

	img {
		width: 100%;
		height: auto;

		object-fit: cover;
		object-position: center;
		border-radius: 1.5rem;
	}

	p {
		color: rgb(var(--gray));
		font-size: 1.4rem;
		line-height: 1.5rem;
	}
`;

export const Product = ({ path, name, image, inStock, description, price, ...props }) => {
	return (
		<Link href={path}>
			<Wrapper {...props}>
				<img src={image} alt={name} />
				<h3>{name}</h3>
				<div>
					<span>{price} ₸</span>
					<span>{!inStock && `нету `}в наличи</span>
				</div>
				<p>{description}</p>
			</Wrapper>
		</Link>
	);
};
