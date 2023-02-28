// components
import styled from '@emotion/styled';
import Head from 'next/head';
import { useState } from 'react';
import { GrContactInfo, GrFormClock, GrLocationPin, GrMail, GrMapLocation, GrPhone } from 'react-icons/gr';
import { sendDefaultPagePropsRequest } from '../lib/api';

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
	z-index: 5;

	border: none;
`;

const LoaderWrapper = styled.div`
	width: 100%;
	height: 100%;
	z-index: ${({ ismapload }) => (ismapload ? `-1` : `1`)};
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

const Contact = ({ contactData: contact }) => {
	const [isMapLoad, setIsMapLoad] = useState(false);

	return (
		<>
			<Head>
				<meta name='description' content='Контакты нашей компании: почта, номер телефона, адрес, режим работы / KazInterStroy ' />
				<meta
					name='keywords'
					content='kazinterstroy, интернет магазин, kazstroy, казинтерстрой, казстрой, контакты, номер телефона, номер, мобильный, почта, адрес'
				/>

				<meta property='og:title' content='Контакты / KazInterStroy' />
				<meta property='og:description' content='Контакты нашей компании: почта, номер телефона, адрес, режим работы / KazInterStroy' />

				<meta name='twitter:title' content='Контакты / KazInterStroy' />
				<meta
					name='twitter:description'
					content='Контакты нашей компании: почта, номер телефона, адрес, режим работы / KazInterStroy'
				/>

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
						<span>{contact.address}</span>
					</Line>
					<Line>
						<p>
							<GrLocationPin />
							Индекс
						</p>
						<span>{contact.index}</span>
					</Line>
					<Line>
						<p>
							<GrPhone />
							Телефон
						</p>
						<span>{contact.phone}</span>
					</Line>
					<Line>
						<p>
							<GrPhone />
							Городской телефон
						</p>
						<span>{contact.city_phone}</span>
					</Line>
					<Line>
						<p>
							<GrMail />
							Почта
						</p>
						<span>{contact.mail}</span>
					</Line>
					<Line>
						<p>
							<GrFormClock />
							График работы
						</p>
						<span>{contact.timetable}</span>
					</Line>
				</Box>
			</StyledContact>
		</>
	);
};

export default Contact;

export const getStaticProps = async () => {
	const data = await sendDefaultPagePropsRequest();

	return {
		props: {
			contactData: data.contactData,
			catalogData: data.catalogData,
			menuData: data.menuData,
		},
		revalidate: 15,
	};
};
