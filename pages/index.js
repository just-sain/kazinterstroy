// components
import Head from 'next/head';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper'; // required modules for swiper js
import { PopElement } from '../components/popElement';
import styled from '@emotion/styled';
import { css } from '@emotion/css';
// styles for swiper.js
import 'swiper/css';
import 'swiper/css/pagination';

// slider

// pop products
const PopContainer = styled.div`
	width: 100%;

	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 5rem;
`;

const PopHeading = styled.div`
	margin-bottom: 5rem;

	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;

	a {
		color: rgb(var(--primary));
		text-decoration: underline;
	}
`;

// swiper js
const Carousel = styled.section`
	height: 70rem;
`;

const StyledSwiper = styled(Swiper)`
	width: 100vw;
	height: 70rem;

	position: absolute;
	top: var(--header-height);
	left: 0;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
	background: rgb(var(--bg));

	display: flex;
	justify-content: center;
	align-items: center;

	img {
		width: 100%;
		height: 100%;

		display: block;
		object-fit: cover;
		object-position: center;
	}
`;

// data
const sliderData = [
	{ img: 'https://al-style.kz/upload/iblock/167/vod29crradneigwr4xo3e86fgd5xe2cv.jpg' },
	{ img: 'https://al-style.kz/upload/iblock/028/6us2io66ol3octve5lrwnkecvieiylu2.jpg' },
	{ img: 'https://al-style.kz/upload/iblock/56d/gaazaa8mrljohowsmrknbf8ahn4pg62n.jpg' }
];

const HomePage = ({ popProducts }) => {
	return (
		<>
			<Head>
				<title>KazInterStroy - Интернет магазин</title>
			</Head>
			<Carousel>
				<StyledSwiper
					grabCursor={true}
					centeredSlides={true}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false
					}}
					pagination={{ clickable: true, dynamicBullets: true }}
					modules={[Autoplay, Pagination]}>
					{sliderData.map(s => (
						<StyledSwiperSlide key={s}>
							<img src={s.img} alt={s.img} />
						</StyledSwiperSlide>
					))}
				</StyledSwiper>
			</Carousel>
			<section
				className={css`
					margin-top: 7.5rem;
				`}>
				<PopHeading>
					<h1>Наши популярные товары</h1>
					<Link href='/shop'>Просмотреть все наши товары...</Link>
				</PopHeading>
				<PopContainer>
					{popProducts.map((p, i) => (
						<PopElement key={i} {...p} />
					))}
				</PopContainer>
			</section>
		</>
	);
};

export default HomePage;

export const getStaticProps = async () => {
	// popular products
	const popProducts = [
		{
			path: '/products/rjc45',
			name: 'RJC45 - сетевой коннектор 8P8C CAT.5E.',
			image: 'https://images.satu.kz/113613494_w640_h640_rjc45-konnektor.jpg',
			inStock: false,
			description:
				'Коннектор сетевой 8P8C Cat.5E. Надежные, усиленные зубья контактов для надежного крепления провода, улучшенные фиксаторы обжима кабеля, экран от наводок, металлический',
			price: 100
		},
		{
			path: '/products/rjc45',
			name: 'RJC45 - сетевой коннектор 8P8C CAT.5E.',
			image: 'https://images.satu.kz/113613494_w640_h640_rjc45-konnektor.jpg',
			inStock: true,
			description:
				'Коннектор сетевой 8P8C Cat.5E. Надежные, усиленные зубья контактов для надежного крепления провода, улучшенные фиксаторы обжима кабеля, экран от наводок, металлический',
			price: 100
		},
		{
			path: '/products/rjc45',
			name: 'RJC45 - сетевой коннектор 8P8C CAT.5E.',
			image: 'https://images.satu.kz/113613494_w640_h640_rjc45-konnektor.jpg',
			inStock: true,
			description:
				'Коннектор сетевой 8P8C Cat.5E. Надежные, усиленные зубья контактов для надежного крепления провода, улучшенные фиксаторы обжима кабеля, экран от наводок, металлический',
			price: 100
		}
	];

	return {
		props: {
			popProducts
		}
	};
};
