import styled from '@emotion/styled';
import Head from 'next/head';
import { Container } from '../components/container';

const Section = styled.section`
	width: 100%;
	margin-top: 5rem;
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
	gap: 2rem;
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
			margin-top: 0.5rem;

			border-left: 0.2rem solid red;
		}
	}
`;

const Img = styled.img`
	width: 100%;
	height: auto;

	border-radius: 1.5rem;
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
					<Grid>
						<Text>
							<h2>
								О <Company>KazInterStroy</Company>
							</h2>
							<p>
								Наша компания уже долгое время специализируется по продажам и установкам систем{' '}
								<strong>
									<i>видеонаблюдения </i>
								</strong>
								в Алматы. За время работы на рынке мы убедились, что данная услуга становится из года в год все актуальнее. Ведь
								каждый человек хотел бы быть уверенным в защите своего дома или иного имущества и верить в спокойствие завтрашнего
								дня.
							</p>
							<p>
								А современные системы <strong>видеонаблюдения</strong> помогают держать руку на пульсе и знать, что в данный момент
								происходит в доме или в вашей организации. Если Вы переживаете за своего ребёнка, который остался с няней –
								установите камеры <strong>видеонаблюдения</strong> и не волнуйтесь без повода. Мы готовы помочь с выбором систем
								<strong> видеонаблюдения</strong>, исходя из предназначения и места использования. Наша компания занимается
								установкой во всех отраслях деятельности:
								<ul>
									<li>Кафе, ресторанах</li>
									<li>Магазинах, торговых центрах</li>
									<li>Офисах, на производстве, в складском помещении</li>
									<li>Квартирах, загородных</li>
									<li>домах и т.д.</li>
								</ul>
							</p>
						</Text>

						<Img src='/pic/cctv.png' alt='cctv' />
					</Grid>
				</Section>
				<Section>
					<div>
						<Text>
							<h2>Видеонаблюдение</h2>
							<p>
								<strong>Видеонаблюдения</strong> – это самый простой и бюджетный способ гарантировать свою безопасность. Современные
								системы <strong>видеонаблюдения</strong> сэкономят владельцам и время, и деньги. Роль систем{' '}
								<strong>видеонаблюдения </strong>
								сложно переоценить. Ведь с помощью такой системы владелец сможет полностью обезопасить себя, свой бизнес и свой дом.
								При любой конфликтной или непонятной ситуации Вы сможете отстоять свои права, благодаря записи с видеокамер.
								Большинство владельцев изначально даже не подозревают, насколько выгодным и правильным окажется их вложение. Кроме
								экономии денег, вы сможете быстро доказать свою правоту при нарушении порядка или рабочего процесса на производстве,
								ведь слова будут подкреплены реальными записями. Установка <strong>видеонаблюдения</strong> в Алматы – это залог
								Вашей полной безопасности и уверенности.
							</p>
						</Text>

						<Img src='/pic/camera-2.jpg' alt='' />
					</div>
				</Section>
			</Container>
		</>
	);
};

export default AboutPage;
