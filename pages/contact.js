import client from '../lib/contentful';
// components
import Head from 'next/head';
import { GrContactInfo, GrMail, GrMapLocation, GrLocationPin, GrFormClock, GrPhone } from 'react-icons/gr';
import styled from '@emotion/styled';

// map section
const MapSection = styled.section`
	width: 100%;
	height: 40rem;
`;

const Map = styled.iframe`
	width: 100%;
	height: 40rem;

	border: none;

	position: absolute;
	top: var(--header-height);
	left: 0;
`;

// contact section
const StyledContact = styled.section`
	width: 100%;
	margin-top: 5rem;
`;

const Heading = styled.h1`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;

	color: rgb(var(--black));
	word-break: break-word;
	text-align: center;
	font-size: 3.2rem;
	font-weight: 400;

	@media screen and (max-width: 300px) {
		font-size: 2.4rem;
	}
`;

const Box = styled.div`
	width: 100%;
`;

const Line = styled.div`
	width: 100%;
	margin-top: 2rem;

	display: grid;
	grid-template-columns: 1fr 2.5fr;

	color: rgb(var(--black));
	word-break: break-word;
	font-size: 1.8rem;
	font-weight: 500;

	svg {
		font-size: 3rem;
	}

	p {
		padding: 0.5rem 1rem;

		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
	}

	@media screen and (max-width: 800px) {
		grid-template-columns: 1fr;

		span {
			padding-left: 5rem;
		}
	}

	@media screen and (max-width: 300px) {
		font-size: 1.4rem;

		svg {
			font-size: 2rem;
		}

		span {
			padding-left: 4rem;
		}
	}

	@media screen and (max-width: 220px) {
		font-size: 1.2rem;

		svg {
			font-size: 1.6rem;
		}

		span {
			padding-left: 1rem;
		}
	}
`;

const Contact = ({ contactData }) => {
	return (
		<>
			<Head>
				<title>Контакты / KazInterStroy</title>
			</Head>
			<MapSection>
				<Map
					loading='lazy'
					src='https://yandex.ru/map-widget/v1/?um=constructor%3A09c7f4a4a087808079f28245bf8ab598e9609a06e555f8a5586d6e7ed9ab7da3&amp;source=constructor'></Map>
			</MapSection>
			<StyledContact>
				<Heading>
					<GrContactInfo /> Контакты
				</Heading>
				<Box>
					<Line>
						<p>
							<GrMapLocation />
							Адрес
						</p>
						<span>{contactData.address}</span>
					</Line>
					<Line>
						<p>
							<GrLocationPin />
							Индекс
						</p>
						<span>{contactData.index}</span>
					</Line>
					<Line>
						<p>
							<GrPhone />
							Телефон
						</p>
						<span>{contactData.phone}</span>
					</Line>
					<Line>
						<p>
							<GrPhone />
							Городской телефон
						</p>
						<span>{contactData.city_phone}</span>
					</Line>
					<Line>
						<p>
							<GrMail />
							Почта
						</p>
						<span>{contactData.mail}</span>
					</Line>
					<Line>
						<p>
							<GrFormClock />
							График работы
						</p>
						<span>{contactData.timetable}</span>
					</Line>
				</Box>
			</StyledContact>
		</>
	);
};

export default Contact;

export const getStaticProps = async () => {
	// companiesData
	const companies = await client.getEntries({ content_type: 'contacts' });

	return {
		props: {
			contactData: companies.items[0].fields
		}
	};
};
