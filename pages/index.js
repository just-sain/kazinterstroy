import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// components
import Head from 'next/head';
import Link from 'next/link';
import Slider from 'react-slick';
import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { PopElement } from '../components/popElement';

// slider
const sliderData = [
	{ img: 'https://al-style.kz/upload/iblock/167/vod29crradneigwr4xo3e86fgd5xe2cv.jpg' },
	{ img: 'https://al-style.kz/upload/iblock/028/6us2io66ol3octve5lrwnkecvieiylu2.jpg' },
	{ img: 'https://al-style.kz/upload/iblock/56d/gaazaa8mrljohowsmrknbf8ahn4pg62n.jpg' }
];

const SliderContainer = styled.div`
	width: 100%;
	height: auto;
	padding-bottom: 3rem;

	position: absolute;
	top: var(--header-height);
	left: 0;
`;

const SliderItem = styled.div`
	width: 100%;
	cursor: grab;

	&:active {
		cursor: grabbing;
	}

	img {
		width: 100%;
		height: auto;
		object-fit: cover;
		object-position: center;
	}
`;

const CustomArrow = () => (
	<div
		className={css`
			display: none;
		`}
	/>
);

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

const HomePage = ({ popProducts }) => {
	const sliderSetting = {
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		speed: 500,
		autoplaySpeed: 3000,
		cssEase: 'ease',
		nextArrow: <CustomArrow />,
		prevArrow: <CustomArrow />
	};

	return (
		<>
			<Head>
				<title>KazInterStroy - Интернет магазин</title>
			</Head>
			<section
				className={css`
					width: 100%;
					height: 32vw;
				`}>
				<SliderContainer>
					<Slider append {...sliderSetting}>
						{sliderData.map((s, i) => (
							<SliderItem key={i}>
								<img src={s.img} />
							</SliderItem>
						))}
					</Slider>
				</SliderContainer>
			</section>
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
	// menu
	const { data: menu } = await axios.get(
		`${process.env.NEXT_PUBLIC_API}/categories?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
	);

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
			popProducts,
			menu
		}
	};
};
