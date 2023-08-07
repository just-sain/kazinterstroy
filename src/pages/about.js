import styled from '@emotion/styled';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '../components/container';
import { sendAboutTextRequest, sendDefaultPagePropsRequest } from '../lib/api';

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

const Company = styled.h2`
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

const AboutPage = ({ aboutData }) => {
	return (
		<>
			<Head>
				<meta name='robots' content='index, follow' />
				<meta name='googlebot' content='index, follow' />

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
							<Company>{aboutData.title1}</Company>
							<p dangerouslySetInnerHTML={{ __html: aboutData.content1 }} />
						</Text>

						<Img src='/pic/cctv.png' alt='cctv' />
					</Grid>
				</Section>
				<Section>
					<Text>
						<h2>{aboutData.title2}</h2>
						<p dangerouslySetInnerHTML={{ __html: aboutData.content2 }} />
					</Text>

					<Img src='/pic/camera-2.jpg' alt='' style={{ width: '100%' }} />
				</Section>
				<Section>
					<Grid>
						<Text>
							<h2>{aboutData.title3}</h2>
							<p dangerouslySetInnerHTML={{ __html: aboutData.content3 }} />
						</Text>

						<Img src='/pic/camera-1.png' alt='' style={{ width: '100%' }} />
					</Grid>

					<End>
						Здесь вы можете подробнее узнать о нашей компаний:{' '}
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
	try {
		const data = await sendDefaultPagePropsRequest();
		const aboutData = await sendAboutTextRequest();

		return {
			props: {
				contactData: data.contactData,
				catalogData: data.catalogData,
				menuData: data.menuData,
				aboutData,
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
