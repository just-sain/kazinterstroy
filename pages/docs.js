import client from '../lib/contentful';
// components
import styled from '@emotion/styled';
import { SlDocs } from 'react-icons/sl';
import Head from 'next/head';
import Link from 'next/link';

const Heading = styled.h1`
	margin-bottom: 3rem;

	color: rgb(var(--black));
	word-break: break-word;
	text-align: center;
	font-size: 3.2rem;
	font-weight: 400;

	@media screen and (max-width: 300px) {
		font-size: 2.4rem;
	}
`;

const Section = styled.section`
	width: 100%;
	margin-bottom: 5rem;

	&:last-of-type {
		margin-bottom: 0;
	}
`;

const Flex = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	gap: 2.5rem;
`;

const Item = styled(Link)`
	width: 100%;
	padding: 1.5rem 1rem;

	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 1rem;

	border-top: 0.1rem solid rgb(var(--real-gray));
	border-bottom: 0.1rem solid rgb(var(--real-gray));
	background: rgba(var(--primary), 0.1);

	transition: background 0.3s ease 0s;

	&:hover {
		background: rgba(var(--primary), 0.2);
	}

	svg {
		font-size: 2rem;
	}

	h5 {
		color: rgb(var(--primary));
		word-break: break-word;
		text-align: center;
		font-size: 1.8rem;
		font-weight: 500;
	}
`;

export const Docs = ({ documents, letters }) => {
	return (
		<>
			<Head>
				<meta name='description' content='Благодарственные письма и документы нашей компании / KazInterStroy ' />
				<meta
					name='keywords'
					content='kazinterstroy, интернет магазин, kazstroy, казинтерстрой, казстрой, благодарственные письма, документы, благодарственное письмо, письма, документ, отзывы, сотрудничество'
				/>

				<meta property='og:title' content='Документы и благодарственные письма / KazInterStroy' />
				<meta
					property='og:description'
					content='Благодарственные письма и документы нашей компании / KazInterStroy'
				/>

				<meta name='twitter:title' content='Документы и благодарственные письма / KazInterStroy' />
				<meta
					name='twitter:description'
					content='Благодарственные письма и документы нашей компании / KazInterStroy'
				/>

				<title>Документы и благодарственные письма / KazInterStroy</title>
			</Head>
			{documents && (
				<Section>
					<Heading>Документы</Heading>
					<Flex>
						{documents.map(d => (
							<Item key={d.fields.name} href={`https:${d.fields.file.fields.file.url}`} target='_blank' download>
								<SlDocs />
								<h5>{d.fields.name}</h5>
							</Item>
						))}
					</Flex>
				</Section>
			)}
			{letters && (
				<Section>
					<Heading>Благодарственные письма</Heading>
					<Flex>
						{letters.map(d => (
							<Item key={d.fields.name} href={`https:${d.fields.file.fields.file.url}`} target='_blank' download>
								<SlDocs />
								<h5>{d.fields.name}</h5>
							</Item>
						))}
					</Flex>
				</Section>
			)}
		</>
	);
};

export default Docs;

export const getStaticProps = async () => {
	const documents = await client.getEntries({ content_type: 'documents' });

	return {
		props: {
			documents: documents.items.filter(d => !d.fields.is_thanks_letter),
			letters: documents.items.filter(d => d.fields.is_thanks_letter)
		}
	};
};
