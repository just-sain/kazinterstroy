import client from '../lib/contentful';
// components
import Head from 'next/head';
import Link from 'next/link';
import { GrContactInfo, GrMail, GrMapLocation, GrLocationPin, GrFormClock, GrPhone } from 'react-icons/gr';
import styled from '@emotion/styled';
import { useState } from 'react';

// map section
const MapSection = styled.section`
	width: 100%;
	height: 40rem;
`;

const MapContainer = styled.div`
	width: 100%;
	height: 40rem;

	position: absolute;
	top: var(--header-height);
	left: 0;
`;

const Map = styled.iframe`
	width: 100%;
	height: 100%;

	border: none;
`;

const LoaderWrapper = styled.div`
	width: 100%;
	height: 100%;
	z-index: 5;
	opacity: ${({ ismapload }) => (ismapload ? `0` : `1`)};

	display: flex;
	justify-content: center;
	align-items: center;

	background: rgb(var(--black));

	position: absolute;
	top: 0;
	left: 0;

	transition: opacity 0.4s ease 0.4s, z-index 0s ease 0.8s;
`;

const Loader = styled.div`
	width: 10rem;
	height: 10rem;
	display: inline-block;
	position: relative;

	&::after,
	&::before {
		content: '';
		box-sizing: border-box;
		width: 10rem;
		height: 10rem;
		border-radius: 50%;
		border: 1rem solid #fff;
		position: absolute;
		left: 0;
		top: 0;
		animation: animMapLoader 2s linear infinite;
	}
	&::after {
		animation-delay: 1s;
	}
`;

// contact section
const StyledContact = styled.section`
	width: 100%;
	margin-top: 5rem;
`;

const Heading = styled.h1`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 1rem;

	color: rgb(var(--black));
	word-break: break-word;
	font-size: 3.2rem;
	font-weight: 400;

	@media screen and (max-width: 300px) {
		font-size: 2.4rem;
	}
`;

const Box = styled.div`
	width: 100%;
	margin-top: 3rem;
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

const Docs = styled.section`
	width: 100%;
	margin-top: 5rem;

	color: rgb(var(--black));
	word-break: break-word;
	text-align: start;
	font-size: 2rem;
	font-weight: 400;

	a {
		color: rgb(var(--primary));
		text-decoration: underline;
	}
`;

const Contact = ({ contactData }) => {
	const [isMapLoad, setIsMapLoad] = useState(false);

	return (
		<>
			<Head>
				<title>Контакты / KazInterStroy</title>
			</Head>
			<MapSection>
				<MapContainer>
					<Map
						loading='lazy'
						src='https://yandex.ru/map-widget/v1/?um=constructor%3A09c7f4a4a087808079f28245bf8ab598e9609a06e555f8a5586d6e7ed9ab7da3&amp;source=constructor'
						onLoad={() => setIsMapLoad(true)}></Map>
					<LoaderWrapper ismapload={isMapLoad ? 1 : 0}>
						<Loader />
					</LoaderWrapper>
				</MapContainer>
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
			<Docs>
				Вы также можете просмотреть наши
				<Link href='/docs'>благодарственные письма</Link> и <Link href='/docs'>лицензию</Link>
			</Docs>
		</>
	);
};

export default Contact;

export const getStaticProps = async () => {
	// contact data
	const contact = await client.getEntries({ content_type: 'contacts' });

	return {
		props: {
			contactData: contact.items[0].fields
		}
	};
};
