import client from '../lib/contentful';
// components
import Head from 'next/head';
import styled from '@emotion/styled';
import { Companies } from '../components/companies';

const StyledCompanies = styled(Companies)`
	margin-top: 10rem;
`;

const AboutPage = ({ companiesData }) => {
	return (
		<>
			<Head>
				<title>О компании / KazInterStroy</title>
			</Head>
			<section>О компании!</section>
			<StyledCompanies companiesData={companiesData} />
		</>
	);
};

export default AboutPage;

export const getStaticProps = async () => {
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
			companiesData
		}
	};
};
