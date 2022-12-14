import { useState } from 'react';
import axios from 'axios';
import { Autoplay, Zoom, Pagination, EffectCards } from 'swiper'; // required modules for swiper
// components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Breadcrumb } from '../../../../components/breadcrumb';
import styled from '@emotion/styled';
// styles for swiper
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import { declOfQuantity } from '../../../../helpers/declaration';
import { css } from '@emotion/css';
import { priceRule } from '../../../../helpers/price';

const Wrapper = styled.div`
	width: 100%;
`;

const Heading = styled.h1`
	color: rgb(var(--black));
	line-height: 2.8rem;
	font-size: 3rem;
	font-weight: 400;
`;

const Grid = styled.div`
	margin-top: 5rem;

	display: grid;
	grid-template-columns: minmax(45rem, 2fr) 1fr;
`;

// carousel
const Carousel = styled.div`
	width: 100%;
	height: 45rem;

	position: relative;
`;

const StyledSwiper = styled(Swiper)`
	width: 45rem;
	height: 45rem;

	position: absolute;
	top: 0;
	left: 50%;

	transform: translateX(-50%);

	--swiper-pagination-color: rgb(var(--primary));
`;

const StyledSwiperSlide = styled(SwiperSlide)`
	overflow: hidden;

	background: rgb(var(--bg));
	border-radius: 2rem;
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
		font-weight: 400;
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
	margin-top: 5rem;

	h1,
	h2,
	h3 {
		font-weight: 400;
		margin-bottom: 1rem;
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
	font-size: 1.8rem;
	font-weight: 400;

	hr {
		border: none;
		border-bottom: 0.1rem dotted rgb(var(--light-gray));
	}
`;

const Item = ({ categoryId, elementId, item, menu }) => {
	const [categoryData] = useState(menu && menu.find(m => m.id === Number(categoryId)));
	const [elementData] = useState(menu && menu.find(m => m.id === Number(elementId)));
	console.log(item);

	const breadcrumbData = [
		{ name: 'Каталог', href: '/category' },
		{ name: categoryData.name, href: `/category/${categoryData.id}` },
		{ name: elementData.name, href: `/category/${categoryData.id}/${elementData.id}` },
		{ name: item.name, href: `/category/${categoryData.id}/${elementData.id}/${item.id}` }
	];

	return (
		<Wrapper>
			<Breadcrumb links={breadcrumbData} withMarginBottom />
			<Heading>{item.name}</Heading>
			<Grid>
				<Carousel>
					<StyledSwiper
						title='Кликните 2 раза что бы увеличить картинку'
						effect={'cards'}
						grabCursor={true}
						centeredSlides={true}
						autoplay={{ delay: 2500, disableOnInteraction: false }}
						zoom={true}
						pagination={{ dynamicBullets: true, clickable: true }}
						modules={[Autoplay, Zoom, Pagination, EffectCards]}>
						{item.images.map(i => (
							<StyledSwiperSlide key={i}>
								<div className='swiper-zoom-container'>
									<img src={i} />
								</div>
							</StyledSwiperSlide>
						))}
					</StyledSwiper>
				</Carousel>
				<div>
					<Info>
						<h2>{item.full_name}</h2>
						<li>
							<span>Брэнд</span>
							<hr />
							<span>{item.brand}</span>
						</li>
						<li>
							<span>Код товара</span>
							<hr />
							<span>{item.article}</span>
						</li>
						<li>
							<span>В наличи</span>
							<hr />
							<span style={{ color: declOfQuantity(item.quantity) === 'Нет в наличи' && 'rgb(var(--error))' }}>
								{declOfQuantity(item.quantity)}
							</span>
						</li>
						<li>
							<span>Гарантия</span>
							<hr />
							<span>{item.warranty}</span>
						</li>
						<li>
							<span>Артикул-PartNumber</span>
							<hr />
							<span>{item.article_pn}</span>
						</li>
					</Info>
					<Price>
						Цена
						<br />
						<span>{priceRule(item.price1)}</span>
					</Price>
				</div>
			</Grid>
			<DetailText dangerouslySetInnerHTML={{ __html: item.detailtext }} />
			{item.properties && (
				<Properties>
					<Heading>Характеристики</Heading>
					{Object.keys(item.properties).map(p => (
						<PropertiesItem key={p}>
							<span>{p}</span>
							<hr />
							<span>{item.properties[p]}</span>
						</PropertiesItem>
					))}
				</Properties>
			)}
		</Wrapper>
	);
};

export default Item;

export const getServerSideProps = async ctx => {
	if (
		!ctx?.query ||
		!ctx.query.category ||
		isNaN(ctx.query.category) ||
		!ctx.query.element ||
		isNaN(ctx.query.element) ||
		!ctx.query.item ||
		isNaN(ctx.query.item)
	) {
		return { notFound: true };
	}

	// menu
	const { data: menu } = await axios.get(
		`${process.env.NEXT_PUBLIC_API}/categories?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
	);

	// item
	const additionalFields = 'images,brand,description,instructions,weight,warranty,detailtext,properties';
	const { data: item } = await axios.get(
		`${process.env.NEXT_PUBLIC_API}/element-info?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&article=${ctx.query.item}&additional_fields=${additionalFields}`
	);

	if (!item.length) return { notFound: true };

	return {
		props: {
			categoryId: ctx.query.category,
			elementId: ctx.query.element,
			item: item[0],
			menu
		}
	};
};
