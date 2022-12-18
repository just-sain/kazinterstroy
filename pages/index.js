import client from '../lib/contentful';
// components
import Head from 'next/head';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper'; // required modules for swiper js
import styled from '@emotion/styled';
// styles for swiper.js
import 'swiper/css';
import 'swiper/css/pagination';
import { Companies } from '../components/companies';

// slider (swiper js)
const Carousel = styled.section`
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

// about section
const About = styled.section`
	margin-top: 10rem;

	display: grid;
	grid-template-columns: 2fr 1fr;
	grid-template-rows: min-content 1fr;
	grid-template-areas: 'img title' 'img description';
	justify-items: center;
	gap: 1rem 2rem;

	@media screen and (max-width: 1024px) {
		margin-top: 5rem;

		grid-template-columns: 1fr;
		grid-template-rows: max-content min-content 1fr;
		grid-template-areas: 'img' 'title' 'description';
		gap: 1rem;
	}
`;

const AboutImg = styled.div`
	width: 100%;
	height: 100%;
	overflow: hidden;

	grid-area: img;
	border-radius: 1.5rem;

	position: relative;

	img {
		width: 100%;
		height: 100%;

		object-fit: cover;
		object-position: center;
	}

	@media screen and (max-width: 1024px) {
		width: 65%;
	}
	@media screen and (max-width: 768px) {
		width: 75%;
	}
	@media screen and (max-width: 550px) {
		width: 90%;
	}
	@media screen and (max-width: 450px) {
		width: 100%;
	}
`;

const AboutTitle = styled.h1`
	grid-area: title;

	color: rgb(var(--primary));
	line-height: 3.8rem;
	font-size: 3.2rem;
	font-weight: 500;

	@media screen and (max-width: 600px) {
		word-break: break-word;
		line-height: 2.8rem;
		font-size: 2.4rem;
	}
`;

const AboutDescription = styled.p`
	grid-area: description;

	color: rgb(var(--black));
	text-indent: 1rem;
	font-size: 1.8rem;
	font-weight: 400;

	@media screen and (max-width: 1024px) {
		width: 90%;
	}
	@media screen and (max-width: 600px) {
		width: 100%;

		word-break: break-word;
	}
`;

// companies section
const StyledCompanies = styled(Companies)`
	margin-top: 10rem;

	@media screen and (max-width: 1024px) {
		margin-top: 5rem;
	}
`;

const HomePage = ({ title, contentImage, description, sliderData, companiesData }) => {
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
							<Image src={`https:${s}`} alt={s} fill sizes='100%' />
						</StyledSwiperSlide>
					))}
				</StyledSwiper>
			</Carousel>
			<About>
				<AboutImg>
					<Image src={`https:${contentImage}`} alt='KazInterStroy' fill sizes='100%' />
				</AboutImg>
				<AboutTitle>{title}</AboutTitle>
				<AboutDescription>{description}</AboutDescription>
			</About>
			<StyledCompanies companiesData={companiesData} />
		</>
	);
};

export default HomePage;

export const getStaticProps = async () => {
	const home = await client.getEntries({ content_type: 'home' });

	// sliderData
	const sliderData = [];
	for (let i = 0; i < home.items[0].fields.slider.length; i++) {
		sliderData.push(home.items[0].fields.slider[i].fields.file.url);
	}
	if (!sliderData.length) sliderData.push('/slider-plug.webp'); // if sliderData is empty

	// companiesData
	const companies = await client.getEntries({ content_type: 'componies' });

	const companiesData = [];
	for (let i = 0; i < companies.items.length; i++) {
		companiesData.push({
			name: companies.items[i].fields.name,
			logo: companies.items[i].fields.logo.fields.file.url
		});
	}

	return {
		props: {
			sliderData,
			title: home.items[0].fields.title,
			contentImage: home.items[0].fields.content_image.fields.file.url,
			description: home.items[0].fields.description.content[0].content[0].value,
			companiesData
		}
	};
};
