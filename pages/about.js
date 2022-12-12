import axios from 'axios';
import Head from 'next/head';

const AboutPage = () => {
	return (
		<>
			<Head>
				<title>О компании / KazInterStroy</title>
			</Head>
			<section>О компании!</section>
		</>
	);
};

export default AboutPage;

export const getStaticProps = async () => {
	// menu
	const { data: menu } = await axios.get(
		`${process.env.NEXT_PUBLIC_API}/categories?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
	);

	return {
		props: {
			menu
		}
	};
};
