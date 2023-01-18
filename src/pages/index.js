import { useContext } from 'react';
import { Store } from '../utils/store';
import client from '../utils/contentful';
// components
import Head from 'next/head';
import { Slider } from '../components/slider';
import { CatalogBlock } from '../components/catalogBlock';

const HomePage = ({ sliderData }) => {
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
			<CatalogBlock style={{ marginTop: '7.5rem' }} />
		</>
	);
};

export default HomePage;

export const getStaticProps = async () => {
	const slider = await client.getEntries({ content_type: 'slider' });

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

	return {
		props: {
			sliderData
		}
	};
};
