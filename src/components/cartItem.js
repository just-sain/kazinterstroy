import { memo } from 'react';
import { declOfQuantity } from '../utils/declaration';
import { priceRule } from '../utils/price';
// components
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { BsTrash } from 'react-icons/bs';
import { Button } from './button';

const Grid = styled.div`
	overflow: hidden;

	display: grid;
	grid-template-columns: 17.5rem 1fr;
	gap: 3rem;

	position: relative;

	${({ notActive }) =>
		notActive &&
		css`
			&::after {
				content: 'нет в наличии';
				width: 30%;
				height: 100%;

				display: flex;
				justify-content: center;
				align-items: center;

				background: rgba(var(--error), 0.9);

				color: rgb(var(--white));
				text-align: center;
				font-size: 2.6rem;

				position: absolute;
				top: 50%;
				left: 50%;

				transform: translate(-50%, -50%);

				@media screen and (max-width: 720px) {
					width: 100%;
					height: 40%;
				}
			}
		`}

	@media screen and (max-width: 720px) {
		grid-template-columns: 1fr;
	}
`;

const Img = styled(Link)`
	width: 17.5rem;
	min-height: 17.5rem;
	overflow: hidden;
	display: block;

	border-radius: 1.5rem;
	background: rgb(var(--real-white));

	position: relative;

	img {
		width: 100%;
		height: 100%;

		object-fit: contain;
		object-position: center;
	}

	@media screen and (max-width: 720px) {
		width: 100%;
		height: 35rem;
	}
`;

const Column = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 1.5rem;
`;

const Name = styled(Link)`
	color: rgb(var(--primary));
	font-size: 1.8rem;
	font-weight: 600;
`;

const Info = styled.ul`
	width: 100%;

	display: grid;
	align-content: flex-start;
	gap: 0.25rem;
`;

const InfoItem = styled.li`
	width: 100%;

	display: grid;
	grid-template-columns: auto 1fr auto;
	gap: 0.5rem;

	color: rgb(var(--gray));
	text-align: end;
	font-size: 1.6rem;
	font-weight: 400;

	hr {
		border: none;
		border-bottom: 0.1rem dotted rgb(var(--light-gray));
	}

	span {
		text-align: start;

		&:last-of-type {
			text-align: end;

			@media screen and (max-width: 420px) {
				word-break: break-word;
				text-align: start;
				font-size: 1.4rem;
			}
		}
	}

	@media screen and (max-width: 420px) {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0rem;
	}
`;

const Bottom = styled.div`
	width: 100%;

	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1.5rem;
`;

const Price = styled.p`
	color: rgb(var(--cash));
	font-size: 3.2rem;
	font-weight: 600;
`;

export const CartItem = memo(({ elementData, dispatch, ...props }) => {
	const removeHandle = () => {
		dispatch({ type: 'CART_REMOVE_ITEM', payload: elementData });
	};

	// checking is item available
	let isAvailable = true;
	if (declOfQuantity(elementData.quantity) === 'нет в наличии' && elementData.price2 < 5) {
		isAvailable = true;
	} else if (declOfQuantity(elementData.quantity) === 'нет в наличии') {
		isAvailable = false;
	}

	return (
		<Grid notActive={!isAvailable} {...props}>
			<Img href={String(elementData.href)} title={elementData.name}>
				<Image src={elementData.images[0]} alt={elementData.name} fill sizes='100%' />
			</Img>
			<Column>
				<Name href={String(elementData.href)} title={elementData.name}>
					{elementData.name}
				</Name>
				<Info>
					<InfoItem>
						<span>Брэнд</span>
						<hr />
						<span>{elementData.brand}</span>
					</InfoItem>
					{!(declOfQuantity(elementData.quantity) === 'нет в наличии' && elementData.price2 < 5) && (
						<InfoItem>
							<span>В наличи</span>
							<hr />
							<span
								style={{
									color: declOfQuantity(elementData.quantity) === 'нет в наличии' ? 'rgb(var(--error))' : 'rgb(var(--gray))',
								}}>
								{declOfQuantity(elementData.quantity)}
							</span>
						</InfoItem>
					)}
					<InfoItem>
						<span>Артикул-PartNumber</span>
						<hr />
						<span>{elementData.article_pn}</span>
					</InfoItem>
				</Info>
				<Bottom>
					<Price>
						{!(declOfQuantity(elementData.quantity) === 'нет в наличии' && elementData.price2 < 5)
							? priceRule(elementData.price2)
							: 'По запросу'}
					</Price>
					<Button onClick={removeHandle} background='error' color='white' size='m'>
						<BsTrash />
					</Button>
				</Bottom>
			</Column>
		</Grid>
	);
});
