import client from '../lib/contentful';
// components
import Head from 'next/head';
import Image from 'next/image';
import { Companies } from '../components/companies';
import styled from '@emotion/styled';
import { Slider } from '../components/slider';

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
				<meta name='description' content='kazinterstroy - Интернет магазин / KazInterStroy ' />
				<meta
					name='keywords'
					content='kazinterstroy, интернет магазин, kazstroy, казинтерстрой, казстрой, главная страница, сотрудничество'
				/>

				<meta property='og:title' content='Главная страница / KazInterStroy' />
				<meta property='og:description' content='kazinterstroy - Интернет магазин / KazInterStroy' />

				<meta name='twitter:title' content='Главная страница / KazInterStroy' />
				<meta name='twitter:description' content='kazinterstroy - Интернет магазин / KazInterStroy' />

				<title>KazInterStroy - Интернет магазин</title>
			</Head>
			<Slider sliderData={sliderData} />
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
	const slider = await client.getEntries({ content_type: 'slider' });

	// sliderData
	const sliderData = [];
	if (!slider.items.length) sliderData.push('/slider-plug.webp'); // if sliderData is empty
	else {
		for (let i = 0; i < slider.items.length; i++) {
			sliderData.push({
				image: slider.items[i].fields.image.fields.file.url,
				link: slider.items[i].fields.link
			});
		}
	}

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
