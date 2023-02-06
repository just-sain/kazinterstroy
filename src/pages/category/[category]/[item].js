import { Autoplay, Zoom, Pagination, EffectCards } from 'swiper'; // required modules for swiper
import axios from 'axios';
import { declOfQuantity } from '../../../utils/declaration';
import { priceRule } from '../../../utils/price';
// components
import Head from 'next/head';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Breadcrumb } from '../../../components/breadcrumb';
import { Button } from '../../../components/button';
import { BsCartPlusFill, BsTrash } from 'react-icons/bs';
import styled from '@emotion/styled';
// styles for swiper
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import { useContext } from 'react';
import { Store } from '../../../lib/store';

const StyledButton = styled(Button)`
	width: 100%;
	margin-top: 1.5rem;

	justify-content: center;

	text-align: center;

	svg {
		margin-left: 0.5rem;
		font-size: 3.6rem;
	}
`;

const Wrapper = styled.article`
	width: 100%;
`;

const Heading = styled.h1`
	color: rgb(var(--black));
	line-height: 2.8rem;
	font-size: 3.2rem;
	font-weight: 400;

	@media screen and (max-width: 300px) {
		font-size: 2rem;
		word-break: break-word;
	}
`;

const Grid = styled.div`
	margin-top: 5rem;

	display: grid;
	grid-template-columns: minmax(45rem, 2fr) 1fr;
	gap: 3rem;

	@media screen and (max-width: 900px) {
		grid-template-columns: 1fr;
	}
`;

// carousel
const Carousel = styled.div`
	width: 100%;
	height: 45rem;

	position: relative;

	@media screen and (max-width: 900px) {
		grid-template-columns: 1fr;
	}

	@media screen and (max-width: 550px) {
		height: 75vw;
	}

	@media screen and (max-width: 300px) {
		height: 30rem;
	}
`;

const StyledSwiper = styled(Swiper)`
	max-width: 45rem;
	width: 100%;
	height: 100%;

	position: absolute;
	top: 0;
	left: 50%;

	transform: translateX(-50%);

	--swiper-pagination-color: rgb(var(--primary));

	@media screen and (max-width: 550px) {
		max-width: 75vw;
	}

	@media screen and (max-width: 550px) {
		max-width: 90%;
	}
`;

const StyledSwiperSlide = styled(SwiperSlide)`
	overflow: hidden;

	background: rgb(var(--bg));
	border-radius: 2rem;
`;

const ImageContainer = styled.div`
	width: 100%;
	height: 100%;
	/* overflow: hidden; */

	background: rgb(var(--bg));
	border-radius: 2rem;

	position: relative;

	&.swiper-slide-zoomed {
		cursor: zoom-out;
	}
`;

// info
const Info = styled.ul`
	display: grid;
	align-content: flex-start;
	gap: 0.5rem;

	h2 {
		margin-bottom: 1.5rem;

		color: rgb(var(--black));
		text-indent: 1rem;
		font-size: 2.4rem;
		font-weight: 400;

		@media screen and (max-width: 300px) {
			font-size: 1.8rem;
			word-break: break-word;
		}
	}

	li {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 0.5rem;

		color: rgb(var(--gray));
		font-size: 1.6rem;
		font-weight: 500;

		hr {
			border: none;
			border-bottom: 0.1rem dashed rgb(var(--light-gray));
		}

		span:last-of-type {
			color: rgb(var(--secondary));
			text-align: end;
		}

		@media screen and (max-width: 420px) {
			display: grid;
			grid-template-columns: 1fr;
			gap: 0rem;
		}

		@media screen and (max-width: 250px) {
			font-size: 1.4rem;
			word-break: break-word;
		}
	}
`;

const Price = styled.p`
	margin-top: 1.5rem;

	color: rgb(var(--light-gray));
	font-size: 1.6rem;
	font-weight: 500;

	span {
		color: rgb(var(--black));
		font-size: 3.2rem;
		font-weight: 600;
	}
`;

const DetailText = styled.div`
	margin-top: 7.5rem;
	text-align: start;

	h1,
	h2 {
		margin: 1rem 0;
		font-weight: 400;
	}

	h3,
	h4 {
		margin: 0.5rem 0;
		font-weight: 500;
	}

	p {
		text-indent: 1.5rem;
	}

	center {
		text-align: start;
	}

	img {
		border-radius: 1.5rem;
	}
`;

const Properties = styled.ul`
	margin-top: 5rem;

	display: grid;
	align-content: flex-start;
	gap: 1rem;
`;

const PropertiesItem = styled.li`
	width: 100%;

	display: grid;
	grid-template-columns: auto 1fr auto;
	gap: 1rem;

	color: rgb(var(--gray));
	text-align: end;
	font-size: 1.8rem;
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

const ItemPage = ({ categoryData, itemData }) => {
	const { state, dispatch } = useContext(Store);
	const {
		cart: { cartItems }
	} = state;

	const breadcrumbData = [
		{ name: 'Каталог', href: '/' },
		{ name: categoryData.name, href: `/category/${categoryData.id}` },
		{ name: itemData.name, href: `/category/${categoryData.id}/${itemData.article}` }
	];

	const cartHandle = () => {
		const payload = {
			article: itemData.article,
			name: itemData.name,
			brand: itemData.brand,
			article_pn: itemData.article_pn,
			href: `${process.env.NEXT_PUBLIC_SELF_DOMAIN}/category/${categoryData.id}/${itemData.article}`,
			price1: itemData.price1,
			quantity: itemData.quantity,
			images: itemData.images
		};

		// interface of payload
		// article: 0,     // id
		// name: '',       // name
		// brand: '',      // brand
		// href: '',       // link
		// article_pn: '', // article part number
		// price1: 0,      // price
		// quantity: 0,    // count in base
		// images: [''],   // images

		if (!cartItems.find(e => e.article === itemData.article)) {
			dispatch({ type: 'CART_ADD_ITEM', payload });
		} else {
			dispatch({ type: 'CART_REMOVE_ITEM', payload });
		}
	};

	// checking is item available
	let isAvailable = true;
	if (declOfQuantity(itemData.quantity) === 'нет в наличии' && itemData.price1 < 5) {
		isAvailable = true
	} else if (declOfQuantity(itemData.quantity) === 'нет в наличии' ) {
		isAvailable = false;
	}

	return (
		<>
			<Head>
				<meta
					name='description'
					content={`${itemData.full_name} все за ${priceRule(itemData.price1)} / KazInterStroy`}
				/>
				<meta
					name='keywords'
					content={`kazinterstroy, интернет магазин, элемент, продукт, товар, ${itemData.name}, ${itemData.price1}, ${itemData.full_name}`}
				/>

				<meta property='og:title' content={`${itemData.name} / KazInterStroy`} />
				<meta
					property='og:description'
					content={`${itemData.full_name} все за ${priceRule(itemData.price1)} / KazInterStroy`}
				/>
				<meta property='og:image' content={itemData.images[0]} />

				<meta name='twitter:title' content={`${itemData.name} / KazInterStroy`} />
				<meta
					name='twitter:description'
					content={`${itemData.full_name} все за ${priceRule(itemData.price1)} / KazInterStroy`}
				/>
				<meta name='twitter:image' content={itemData.images[0]} />

				<title>{itemData.name} / KazInterStroy</title>
			</Head>
			<Wrapper>
				<Breadcrumb links={breadcrumbData} withMarginBottom />
				<Heading title={itemData.full_name}>{itemData.name}</Heading>
				<Grid>
					<Carousel>
						<StyledSwiper
							title='Кликните 2 раза что бы увеличить картинку'
							effect={'cards'}
							grabCursor={true}
							centeredSlides={true}
							autoplay={{ delay: 2500, disableOnInteraction: true }}
							zoom={true}
							pagination={{ dynamicBullets: true, clickable: true }}
							modules={[Autoplay, Zoom, Pagination, EffectCards]}>
							{itemData.images.map(i => (
								<StyledSwiperSlide key={i}>
									<ImageContainer className='swiper-zoom-container'>
										<Image priority src={i} alt={i} fill sizes='100%' />
									</ImageContainer>
								</StyledSwiperSlide>
							))}
						</StyledSwiper>
					</Carousel>
					<div>
						<Info>
							<h2>{itemData.full_name}</h2>
							<li>
								<span>Брэнд</span>
								<hr />
								<span>{itemData.brand}</span>
							</li>
							<li>
								<span>Код товара</span>
								<hr />
								<span>{itemData.article}</span>
							</li>
							{!(declOfQuantity(itemData.quantity) === 'нет в наличии' && itemData.price1 < 5) && (
								<li>
									<span>В наличи</span>
									<hr />
									<span
										style={{ color: !isAvailable ? 'rgb(var(--error))' : 'rgb(var(--secondary))' }}>
										{declOfQuantity(itemData.quantity)}
									</span>
								</li>
							)}
							{itemData.warranty && (
								<li>
									<span>Гарантия</span>
									<hr />
									<span>{itemData.warranty}</span>
								</li>
							)}
							<li>
								<span>Артикул-PartNumber</span>
								<hr />
								<span>{itemData.article_pn}</span>
							</li>
						</Info>
						<Price>
							Цена
							<br />
							<span>
								{!(declOfQuantity(itemData.quantity) === 'нет в наличии' && itemData.price1 < 5)
								? priceRule(itemData.price1)
								: 'По запросу'}
							</span>
						</Price>
						<StyledButton
							disabled={!isAvailable}
							onClick={cartHandle}
							background={cartItems.find(i => i.article === itemData.article) ? 'error' : 'cash'}
							color='white'
							size='l'>
							{!cartItems.find(i => i.article === itemData.article) ? (
								<>
									Добавить в корзину <BsCartPlusFill />
								</>
							) : (
								<>
									Удалить с корзины <BsTrash />
								</>
							)}
						</StyledButton>
						{!isAvailable ? <i style={{ color: 'rgb(var(--error))' }}>* нет в наличии</i> : ''}
					</div>
				</Grid>
				<DetailText dangerouslySetInnerHTML={{ __html: itemData.detailtext }} />
				{itemData.properties && (
					<Properties>
						<Heading>Характеристики</Heading>
						{Object.keys(itemData.properties).map(p => (
							<PropertiesItem key={p}>
								<span>{p}</span>
								<hr />
								<span>{itemData.properties[p]}</span>
							</PropertiesItem>
						))}
					</Properties>
				)}
			</Wrapper>
		</>
	);
};

export default ItemPage;

export const getServerSideProps = async ctx => {
	if (!ctx?.query || !ctx.query.category || isNaN(ctx.query.category) || !ctx.query.item || isNaN(ctx.query.item)) {
		return { notFound: true };
	}

	// category data
	const { data: categoryData } = await axios.get(
		`${process.env.NEXT_PUBLIC_API}/categories?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&id=${ctx.query.category}`
	);
	if (!categoryData || !categoryData.length) return { notFound: true };

	// item data
	const additionalFields = 'images,brand,warranty,detailtext,properties';
	const { data: itemData } = await axios.get(
		`${process.env.NEXT_PUBLIC_API}/element-info?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&article=${ctx.query.item}&additional_fields=${additionalFields}`
	);
	if (!itemData || !itemData.length) return { notFound: true };

	return {
		props: {
			categoryData: categoryData[0],
			itemData: itemData[0]
		}
	};
};
