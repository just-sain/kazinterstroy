import styled from '@emotion/styled';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '../components/container';
import { sendDefaultPagePropsRequest } from '../lib/api';

const Section = styled.section`
	width: 100%;
	margin-top: 5rem;
`;

// logo
const Logo = styled.div`
	margin-bottom: 2.5rem;

	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;

	color: rgb(var(--primary));
	line-height: 1rem;
	font-size: 4.6rem;
	font-weight: 700;

	@media screen and (max-width: 650px) {
		font-size: 2.6rem;
	}

	@media screen and (max-width: 300px) {
		flex-direction: column;
		font-size: 2rem;
	}
`;

const LogoImage = styled.div`
	width: 10rem;
	height: 10rem;

	position: relative;

	img {
		width: auto;
		height: 5rem;

		object-fit: contain;
		object-position: center;
	}

	@media screen and (max-width: 650px) {
		width: 5rem;
		height: 5rem;
	}
`;

const LogoText = styled.p`
	margin-bottom: 10rem;

	color: rgb(var(--gray));
	text-align: center;
	font-size: 1.8rem;
	font-weight: 600;
	font-style: italic;
`;

// grid
const Grid = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
	gap: 2rem;

	@media screen and (max-width: 900px) {
		grid-template-columns: 1fr;
	}
`;

const Company = styled.span`
	color: var(--primary);
	text-decoration: underline;
	font-style: italic;
`;

const Text = styled.div`
	h1,
	h2,
	h3 {
		margin-bottom: 2rem;
	}

	p {
		margin-bottom: 1rem;

		text-indent: 1rem;
		letter-spacing: 0.1rem;
	}

	ul {
		margin-top: 0.5rem;

		li {
			margin-top: 0.75rem;
			padding-left: 1rem;

			border-left: 0.3rem solid rgb(var(--primary));

			font-size: 1.7rem;
		}
	}

	@media screen and (max-width: 350px) {
		font-size: 1.4rem;
	}
`;

const Img = styled.img`
	width: 100%;
	height: auto;

	border-radius: 1.5rem;

	@media screen and (max-width: 900px) {
		width: 75%;
		margin: 0 auto;
	}

	@media screen and (max-width: 450px) {
		width: 100%;
		margin: 0 auto;
	}
`;

const End = styled.div`
	margin-top: 5rem;

	a {
		color: rgb(var(--primary));
		text-decoration: underline;
	}
`;

const AboutPage = () => {
	return (
		<>
			<Head>
				<meta
					name='description'
					content='KazInterStroy - многопрофильное строительно-монтажная компания, в наши услуги входят продажа установкам систем видеонаблюдения в городе Алматы / KazInterStroy '
				/>
				<meta
					name='keywords'
					content='kazinterstroy, интернет магазин, kazstroy, казинтерстрой, казстрой, контакты, номер телефона, номер, мобильный, почта, адрес'
				/>

				<meta property='og:title' content='Контакты / KazInterStroy' />
				<meta
					property='og:description'
					content='KazInterStroy - многопрофильное строительно-монтажная компания, в наши услуги входят продажа установкам систем видеонаблюдения в городе Алматы / KazInterStroy'
				/>

				<meta name='twitter:title' content='Контакты / KazInterStroy' />
				<meta
					name='twitter:description'
					content='KazInterStroy - многопрофильное строительно-монтажная компания, в наши услуги входят продажа установкам систем видеонаблюдения в городе Алматы / KazInterStroy'
				/>

				<title>Контакты / KazInterStroy</title>
			</Head>
			<Container maxW='s'>
				<Section>
					<div>
						<Logo>
							<LogoImage>
								<Image src='/logo.png' alt='KazInterStroy' priority fill sizes='100%' />
							</LogoImage>
							KazInterStroy
						</Logo>
						<LogoText>
							Продажа и монтаж систем видеонаблюдения, систем охранно-пожарной сигнализации, систем контороля и управлением доступа.
						</LogoText>
					</div>

					<Grid>
						<Text>
							<h2>
								О <Company>KazInterStroy</Company>
							</h2>
							<p>
								<strong>
									<i>TOO “KazInterStroy”</i>
								</strong>{' '}
								— процветающая компания, положительно зарекомендовавшаяся себя на рынке систем безопасности. Мы отвечаем за качество
								предлагаемой продукции и предоставленных услугах, а потому даем фирменную гарантию.
							</p>
							<p>
								Многолетний опыт нашего коллектива позволяет осуществлять работы по внедрению систем{' '}
								<strong>видеонаблюдения</strong> на высоком профессиональном уровне. Проверенные эффективные решения позволят
								сократить Ваше время, и, в результате, деньги.
							</p>
						</Text>

						<Img src='/pic/cctv.png' alt='cctv' />
					</Grid>
				</Section>
				<Section>
					<Text>
						<h2>IP видеонаблюдение</h2>
						<p>
							<strong>IP камеры</strong> одновременно совместили в себе два устройства, аналоговую видеокамеру и DVR
							видеорегистратор.
						</p>
						<p>
							В отличие от аналоговых камер, IP камеры одновременно снимают видеоинформацию, сжимают ее а затем передают его по
							локальным сетям или по сети Интернет. Так же при помощи технологии Wifi IP камера может использоваться как беспроводная
							камера.
						</p>
					</Text>

					<Img src='/pic/camera-2.jpg' alt='' style={{ width: '100%' }} />
				</Section>
				<Section>
					<Grid>
						<Text>
							<h2>HD видеонаблюдение</h2>
							<p>
								<strong>HD видеокамеры</strong> имеют большое количество преимуществ, и это позволяет им занимать все большую долю
								рынка видеонаблюдения.
							</p>
							<p>
								Так пользователи систем безопасности с каждым днем все лучше ориентируются в важных плюсах таких камер и отдают им
								предпочтение при постройке системы видеонаблюдения на своем объекте.
							</p>
						</Text>

						<Img src='/pic/camera-1.png' alt='' style={{ width: '100%' }} />
					</Grid>

					<End>
						Здесь вы можете подробнее узнать о нашем компании:{' '}
						<Link target='_blank' href='/doc/presentation-KazInterstroy.pdf'>
							презентация
						</Link>
					</End>
				</Section>
			</Container>
		</>
	);
};

export default AboutPage;

export const getStaticProps = async () => {
	const data = await sendDefaultPagePropsRequest();

	return {
		props: {
			contactData: data.contactData,
			catalogData: data.catalogData,
			menuData: data.menuData,
		},
		revalidate: 60,
	};
};
