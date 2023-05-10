import client from '../config/contentful';
// components
import Head from 'next/head';
import { Category } from '../components/category';
import { Slider } from '../components/slider';
import { sendDefaultPagePropsRequest } from '../lib/api';

const HomePage = ({ sliderData }) => {
	return (
		<>
			<Head>
				<meta name='robots' content='index, follow' />
				<meta name='googlebot' content='index, follow' />

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
			<Category style={{ marginTop: '10rem' }} />
		</>
	);
};

export default HomePage;

export const getStaticProps = async () => {
	try {
		// default props
		const defaultData = await sendDefaultPagePropsRequest();

		// slider
		const slider = await client.getEntries({ content_type: 'slider' });

		const sliderData = [];
		if (!slider.items.length) sliderData.push('/slider-plug.webp'); // if sliderData is empty
		else {
			for (let i = 0; i < slider.items.length; i++) {
				sliderData.push({
					image: slider.items[i].fields.image.fields.file.url,
					link: slider.items[i].fields.link,
				});
			}
		}

		return {
			props: {
				contactData: defaultData.contactData,
				catalogData: defaultData.catalogData,
				menuData: defaultData.menuData,
				sliderData,
			},
			revalidate: 60,
		};
	} catch (err) {
		console.error(err);

		return {
			notFound: true,
		};
	}
};
