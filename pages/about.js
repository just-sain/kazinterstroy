import client from '../lib/contentful';
// components
import Head from 'next/head';
import styled from '@emotion/styled';
import { Companies } from '../components/companies';
import Image from 'next/image';

const Section = styled.section`
	width: 80%;
	margin: 0 auto;

	@media screen and (max-width: 800px) {
		width: 100%;
	}
`;

const Heading = styled.h1`
	color: rgb(var(--black));
	text-align: center;
	font-size: 4rem;
	font-weight: 500;
`;

const Divider = styled.div`
	width: 100%;
	height: 0.1rem;
	margin: 3rem 0;

	box-shadow: var(--inner-shadow);
	border-radius: 0.5rem;
`;

const Text = styled.p`
	width: 100%;
	margin: 0 0;

	color: rgb(var(--gray));
	text-align: center;
	font-size: 1.8rem;
	font-weight: 400;

	@media screen and (max-width: 300px) {
		font-size: 1.6rem;
		word-break: break-word;
	}
`;

const Picture = styled.div`
	width: 100%;
	height: 40rem;
	margin: 0 0;
	position: relative;

	img {
		width: 100%;
		height: 100%;

		object-fit: cover;
		object-position: center;
		border-radius: 1.5rem;
	}

	@media screen and (max-width: 600px) {
		height: 30rem;
	}
	@media screen and (max-width: 450px) {
		height: 20rem;
	}
`;

const StyledCompanies = styled(Companies)`
	margin-top: 10rem;
`;

const AboutPage = ({ text, photo, companiesData }) => {
	return (
		<>
			<Head>
				<title>О компании / KazInterStroy</title>
			</Head>
			<Section>
				<Heading>О нас</Heading>
				<Divider />
				<Text>{text}</Text>
				<Divider />
				<Picture>
					<Image src={`https:${photo}`} alt='we' fill sizes='100%' />
				</Picture>
			</Section>
			<StyledCompanies companiesData={companiesData} />
		</>
	);
};

export default AboutPage;

export const getStaticProps = async () => {
	const aboutData = await client.getEntries({ content_type: 'about' });

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
			text: aboutData.items[0].fields.text,
			photo: aboutData.items[0].fields.photo.fields.file.url,
			companiesData
		}
	};
};
