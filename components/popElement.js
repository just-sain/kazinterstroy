import styled from '@emotion/styled';
import Link from 'next/link';

const PopWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1.5rem;

	text-align: center;

	img {
		width: 100%;

		object-fit: cover;
		object-position: center;
		border-radius: 50%;
		box-shadow: 0.3rem 0.2rem 1.5rem rgba(var(--black), 0.2);
	}

	span {
		padding: 0.5rem 1.25rem;

		background-color: rgb(var(--cash));
		border-radius: 0.5rem;

		color: rgb(var(--white));
		font-weight: var(--font-bold);
	}
`;

// path: string
// name: string
// image: string
// inStock: boolean
// description: string
// price: number

export const PopElement = ({ path, name, image, inStock, description, price, ...props }) => {
	return (
		<PopWrapper {...props}>
			<Link href={path} passHref>
				<img src={image} alt={name} />
			</Link>
			<h3>{name}</h3>
			<p>
				Всего лишь за <span>{price} ₸</span>
			</p>
		</PopWrapper>
	);
};
