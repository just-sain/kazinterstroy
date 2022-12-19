import { memo, useEffect, useState } from 'react';
import client from '../lib/contentful';
// components
import { List } from './list';
import { Container } from './container';
import styled from '@emotion/styled';

const StyledFooter = styled.footer`
	width: 100%;
	padding: 5rem 0 3rem;
	z-index: 50;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: start;

	background: rgb(var(--black));

	color: rgb(var(--white));

	h6 {
		color: rgb(var(--primary));
	}
`;

const FooterWrapper = styled(Container)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 3rem;
`;

const StyledContainer = styled(Container)`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 40rem;
	align-items: flex-start;
	gap: 3rem;

	@media screen and (max-width: 1050px) {
		grid-template-columns: 1fr 2fr;
		align-items: flex-start;
		gap: 2rem;

		ul {
			grid-column: 2 3;
			grid-row: 2 3;
		}
	}

	@media screen and (max-width: 720px) {
		grid-template-columns: 1fr;
		align-items: flex-start;
		gap: 2rem;
	}
`;

// map
const MapContainer = styled.div`
	width: 100%;
	height: 25rem;

	position: relative;
`;

const Map = styled.iframe`
	width: 100%;
	height: 100%;

	border: none;
	border-radius: 1.5rem;

	@media screen and (max-width: 720px) {
		height: 30rem;
	}
	@media screen and (max-width: 500px) {
		height: 25rem;
	}
	@media screen and (max-width: 350px) {
		height: 20rem;
	}
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

const Bottom = styled.div`
	color: rgb(var(--light-gray));
`;

export const Footer = memo(() => {
	const [contactData, setContactData] = useState(null);
	const [isMapLoad, setIsMapLoad] = useState(false);

	useEffect(() => {
		client.getEntries({ content_type: 'contacts' }).then(res => {
			setContactData(res.items[0].fields);
		});
	}, []);

	return (
		<StyledFooter>
			<FooterWrapper maxW='l'>
				<StyledContainer maxW='m'>
					<List>
						<h6>Контакты</h6>
						<li>
							<a href={contactData ? `tel:${contactData.phone}` : '#'}>{contactData && contactData.phone}</a>
						</li>
						<li>
							Городской:
							<br />
							<a href={contactData ? `tel:${contactData.city_phone}` : '#'}>
								{contactData && contactData.city_phone}
							</a>
						</li>
						<li>
							<a href='mailto:kazinterstroy@mail.ru'>kazinterstroy@mail.ru</a>
						</li>
					</List>
					<List>
						<h6>Адрес</h6>
						<li>{contactData && contactData.address}</li>
						<li>Индекс: {contactData && contactData.index}</li>
						<li>Режим работы: {contactData && contactData.timetable}</li>
					</List>
					<List>
						<h6>О нас</h6>
						<li>
							<a href='/about'>О нас</a>
						</li>
						<li>
							<a href='/contact'>Контакты</a>
						</li>
						<li>
							<a href='/docs'>Документы</a>
						</li>
						<li>
							<a href='/docs'>Благодарственные письма</a>
						</li>
					</List>
					<MapContainer>
						<Map
							loading='lazy'
							src='https://yandex.ru/map-widget/v1/?um=constructor%3A09c7f4a4a087808079f28245bf8ab598e9609a06e555f8a5586d6e7ed9ab7da3&amp;source=constructor'
							onLoad={() => setIsMapLoad(true)}></Map>
						<LoaderWrapper ismapload={isMapLoad ? 1 : 0}>
							<Loader />
						</LoaderWrapper>
					</MapContainer>
				</StyledContainer>
				<Bottom>Авторское право © 2023 KazInterStroy All rights reserved.</Bottom>
			</FooterWrapper>
		</StyledFooter>
	);
});
