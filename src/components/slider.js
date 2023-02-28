// components
import styled from '@emotion/styled';
import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper'; // required modules for swiper js
import { Swiper, SwiperSlide } from 'swiper/react';
// styles for swiper.js
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';

// slider (swiper js)
const Container = styled.section`
	width: 100%;
	height: calc(60rem - 3rem);

	--swiper-pagination-color: rgb(var(--primary));

	@media screen and (max-width: 1440px) {
		height: calc(50rem - 3rem);
	}
	@media screen and (max-width: 1240px) {
		height: calc(40rem - 3rem);
	}
	@media screen and (max-width: 768px) {
		height: calc(30rem - 3rem);
	}
	@media screen and (max-width: 600px) {
		height: calc(25rem - 3rem);
	}
	@media screen and (max-width: 450px) {
		height: calc(20rem - 3rem);
	}
	@media screen and (max-width: 300px) {
		height: calc(15rem - 3rem);
	}
`;

const StyledSwiper = styled(Swiper)`
	width: 100vw;
	height: 60rem;

	background: rgb(var(--bg));

	position: absolute;
	top: var(--header-height);
	left: 0;

	@media screen and (max-width: 1440px) {
		height: 50rem;
	}
	@media screen and (max-width: 1240px) {
		height: 40rem;
	}
	@media screen and (max-width: 768px) {
		height: 30rem;
	}
	@media screen and (max-width: 600px) {
		height: 25rem;
	}
	@media screen and (max-width: 450px) {
		height: 20rem;
	}
	@media screen and (max-width: 300px) {
		height: 15rem;
	}
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

// sliderData: string[]
export const Slider = ({ sliderData, ...props }) => {
	return (
		<Container>
			<StyledSwiper
				grabCursor
				centeredSlides
				loop
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				pagination={{ clickable: true, dynamicBullets: true }}
				modules={[Autoplay, Pagination]}
				{...props}>
				{sliderData.map(s => (
					<StyledSwiperSlide key={s.image}>
						{s.link === '.' ? (
							<Image src={`https:${s.image}`} alt={s.image} fill sizes='100%' />
						) : (
							<Link href={s.link}>
								<Image src={`https:${s.image}`} alt={s.image} fill sizes='100%' />
							</Link>
						)}
					</StyledSwiperSlide>
				))}
			</StyledSwiper>
		</Container>
	);
};
