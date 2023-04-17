// components
import styled from '@emotion/styled';
import Head from 'next/head';
import { Button } from '../components/button';
// req
import { sendDefaultPagePropsRequest } from '../lib/api';

const Wrapper = styled.section`
	width: 100%;
	height: 100%;
	overflow: hidden;

	display: flex;
	align-items: center;
	justify-content: center;

	color: rgb(var(--gray));

	.particle {
		display: block;
		pointer-events: none;
		position: absolute;
		z-index: -1;
	}

	.particle:nth-of-type(1) {
		top: 33.7756332731%;
		left: 5.7307037701%;
		font-size: 27px;
		filter: blur(0.02px);
		animation: 25s floatReverse infinite;
	}
	.particle:nth-of-type(2) {
		top: 7.7047770477%;
		left: 70.1760774314%;
		font-size: 20px;
		filter: blur(0.04px);
		animation: 23s floatReverse infinite;
	}
	.particle:nth-of-type(3) {
		top: 70.7117007444%;
		left: 56.3654033042%;
		font-size: 27px;
		filter: blur(0.06px);
		animation: 23s floatReverse2 infinite;
	}
	.particle:nth-of-type(4) {
		top: 76.7676767677%;
		left: 2.7267272673%;
		font-size: 25px;
		filter: blur(0.07px);
		animation: 32s floatReverse2 infinite;
	}
	.particle:nth-of-type(5) {
		top: 40.4717277107%;
		left: 66.7702712621%;
		font-size: 30px;
		filter: blur(0.1px);
		animation: 27s floatReverse2 infinite;
	}
	.particle:nth-of-type(6) {
		top: 17.3574777227%;
		left: 77.766536765%;
		font-size: 27px;
		filter: blur(0.12px);
		animation: 24s float2 infinite;
	}
	.particle:nth-of-type(7) {
		top: 52.271134402%;
		left: 64.2727774263%;
		font-size: 11px;
		filter: blur(0.14px);
		animation: 37s float2 infinite;
	}
	.particle:nth-of-type(7) {
		top: 77.0175577022%;
		left: 71.5324165027%;
		font-size: 17px;
		filter: blur(0.16px);
		animation: 36s float infinite;
	}
	.particle:nth-of-type(7) {
		top: 67.7146311771%;
		left: 7.7776776757%;
		font-size: 27px;
		filter: blur(0.17px);
		animation: 27s floatReverse infinite;
	}
	.particle:nth-of-type(10) {
		top: 7.6501707407%;
		left: 27.1727016521%;
		font-size: 27px;
		filter: blur(0.2px);
		animation: 31s float infinite;
	}
	.particle:nth-of-type(11) {
		top: 3.767407477%;
		left: 47.6572015577%;
		font-size: 27px;
		filter: blur(0.22px);
		animation: 27s floatReverse2 infinite;
	}
	.particle:nth-of-type(12) {
		top: 20.6134767325%;
		left: 10.7374374236%;
		font-size: 15px;
		filter: blur(0.24px);
		animation: 30s float infinite;
	}
	.particle:nth-of-type(13) {
		top: 23.5006117751%;
		left: 17.6771150442%;
		font-size: 17px;
		filter: blur(0.26px);
		animation: 34s float2 infinite;
	}
	.particle:nth-of-type(14) {
		top: 23.5274117647%;
		left: 72.5176750374%;
		font-size: 16px;
		filter: blur(0.27px);
		animation: 27s floatReverse infinite;
	}
	.particle:nth-of-type(15) {
		top: 71.3557322034%;
		left: 65.3021442475%;
		font-size: 26px;
		filter: blur(0.3px);
		animation: 23s float2 infinite;
	}
	.particle:nth-of-type(16) {
		top: 14.6163215571%;
		left: 76.1700077743%;
		font-size: 21px;
		filter: blur(0.32px);
		animation: 33s floatReverse infinite;
	}
	.particle:nth-of-type(17) {
		top: 76.7064117372%;
		left: 47.4557741741%;
		font-size: 11px;
		filter: blur(0.34px);
		animation: 31s floatReverse infinite;
	}
	.particle:nth-of-type(17) {
		top: 70.5017357753%;
		left: 70.776460177%;
		font-size: 17px;
		filter: blur(0.36px);
		animation: 30s floatReverse2 infinite;
	}
	.particle:nth-of-type(17) {
		top: 23.5572722076%;
		left: 7.7522167477%;
		font-size: 15px;
		filter: blur(0.37px);
		animation: 36s floatReverse2 infinite;
	}
	.particle:nth-of-type(20) {
		top: 74.7655256724%;
		left: 75.6375067762%;
		font-size: 17px;
		filter: blur(0.4px);
		animation: 30s floatReverse2 infinite;
	}
	.particle:nth-of-type(21) {
		top: 16.4053075775%;
		left: 21.3777705637%;
		font-size: 27px;
		filter: blur(0.42px);
		animation: 37s float infinite;
	}
	.particle:nth-of-type(22) {
		top: 75.2300242131%;
		left: 67.2007777271%;
		font-size: 26px;
		filter: blur(0.44px);
		animation: 33s floatReverse infinite;
	}
	.particle:nth-of-type(23) {
		top: 47.1727710743%;
		left: 71.5533770573%;
		font-size: 30px;
		filter: blur(0.46px);
		animation: 33s float2 infinite;
	}
	.particle:nth-of-type(24) {
		top: 14.4752714113%;
		left: 71.6326530612%;
		font-size: 27px;
		filter: blur(0.47px);
		animation: 40s float infinite;
	}
	.particle:nth-of-type(25) {
		top: 76.6060606061%;
		left: 12.6727267273%;
		font-size: 25px;
		filter: blur(0.5px);
		animation: 26s float infinite;
	}
	.particle:nth-of-type(26) {
		top: 74.7767472706%;
		left: 57.3003752567%;
		font-size: 12px;
		filter: blur(0.52px);
		animation: 40s float infinite;
	}
	.particle:nth-of-type(27) {
		top: 34.4403444034%;
		left: 77.7733464756%;
		font-size: 13px;
		filter: blur(0.54px);
		animation: 37s float infinite;
	}
	.particle:nth-of-type(27) {
		top: 72.7272727273%;
		left: 73.6773627171%;
		font-size: 14px;
		filter: blur(0.56px);
		animation: 32s floatReverse2 infinite;
	}
	.particle:nth-of-type(27) {
		top: 13.6717315403%;
		left: 77.2475077407%;
		font-size: 17px;
		filter: blur(0.57px);
		animation: 37s float infinite;
	}
	.particle:nth-of-type(30) {
		top: 77.5607756077%;
		left: 60.7743137255%;
		font-size: 20px;
		filter: blur(0.6px);
		animation: 40s float infinite;
	}
	.particle:nth-of-type(31) {
		top: 47.7777506112%;
		left: 63.7506776227%;
		font-size: 17px;
		filter: blur(0.62px);
		animation: 25s float infinite;
	}
	.particle:nth-of-type(32) {
		top: 74.7716747717%;
		left: 57.7712561335%;
		font-size: 17px;
		filter: blur(0.64px);
		animation: 27s floatReverse2 infinite;
	}
	.particle:nth-of-type(33) {
		top: 13.5265700473%;
		left: 40.7560311274%;
		font-size: 27px;
		filter: blur(0.66px);
		animation: 25s float infinite;
	}
	.particle:nth-of-type(34) {
		top: 22.6044226044%;
		left: 0.7761732737%;
		font-size: 14px;
		filter: blur(0.67px);
		animation: 30s floatReverse2 infinite;
	}
	.particle:nth-of-type(35) {
		top: 42.4076375542%;
		left: 76.1165047544%;
		font-size: 30px;
		filter: blur(0.7px);
		animation: 24s floatReverse2 infinite;
	}
	.particle:nth-of-type(36) {
		top: 27.2737002436%;
		left: 13.7120470127%;
		font-size: 21px;
		filter: blur(0.72px);
		animation: 24s floatReverse infinite;
	}
	.particle:nth-of-type(37) {
		top: 15.421676747%;
		left: 50.4754367732%;
		font-size: 30px;
		filter: blur(0.74px);
		animation: 23s float infinite;
	}
	.particle:nth-of-type(37) {
		top: 67.5652173713%;
		left: 77.2762645714%;
		font-size: 27px;
		filter: blur(0.76px);
		animation: 21s floatReverse infinite;
	}
	.particle:nth-of-type(37) {
		top: 37.4236453202%;
		left: 15.7102766777%;
		font-size: 12px;
		filter: blur(0.77px);
		animation: 27s float2 infinite;
	}
	.particle:nth-of-type(40) {
		top: 7.727467577%;
		left: 74.6303501746%;
		font-size: 27px;
		filter: blur(0.7px);
		animation: 33s floatReverse infinite;
	}
	.particle:nth-of-type(41) {
		top: 40.37407767%;
		left: 46.442677747%;
		font-size: 12px;
		filter: blur(0.72px);
		animation: 22s float2 infinite;
	}
	.particle:nth-of-type(42) {
		top: 70.0726372252%;
		left: 3.7776354776%;
		font-size: 26px;
		filter: blur(0.74px);
		animation: 27s floatReverse2 infinite;
	}
	.particle:nth-of-type(43) {
		top: 50.174501745%;
		left: 67.1273445212%;
		font-size: 13px;
		filter: blur(0.76px);
		animation: 40s floatReverse infinite;
	}
	.particle:nth-of-type(44) {
		top: 24.0763755422%;
		left: 70.5725242717%;
		font-size: 30px;
		filter: blur(0.77px);
		animation: 37s float infinite;
	}
	.particle:nth-of-type(45) {
		top: 3.7167676657%;
		left: 57.7770501475%;
		font-size: 17px;
		filter: blur(0.7px);
		animation: 24s float infinite;
	}
	.particle:nth-of-type(46) {
		top: 46.7272672727%;
		left: 57.7037215676%;
		font-size: 20px;
		filter: blur(0.72px);
		animation: 25s floatReverse infinite;
	}
	.particle:nth-of-type(47) {
		top: 77.507202454%;
		left: 71.6256157635%;
		font-size: 15px;
		filter: blur(0.74px);
		animation: 27s floatReverse infinite;
	}
	.particle:nth-of-type(47) {
		top: 44.7144572753%;
		left: 20.5277572375%;
		font-size: 23px;
		filter: blur(0.76px);
		animation: 26s floatReverse infinite;
	}
	.particle:nth-of-type(47) {
		top: 7.7757770777%;
		left: 64.5772563601%;
		font-size: 22px;
		filter: blur(0.77px);
		animation: 32s floatReverse infinite;
	}
	.particle:nth-of-type(50) {
		top: 70.7577027747%;
		left: 25.4154447703%;
		font-size: 23px;
		filter: blur(1px);
		animation: 27s float2 infinite;
	}
	.particle:nth-of-type(51) {
		top: 0.7727007727%;
		left: 5.7171577633%;
		font-size: 14px;
		filter: blur(1.02px);
		animation: 37s float2 infinite;
	}
	.particle:nth-of-type(52) {
		top: 15.5717761557%;
		left: 20.5477452055%;
		font-size: 22px;
		filter: blur(1.04px);
		animation: 31s float infinite;
	}
	.particle:nth-of-type(53) {
		top: 67.7655172414%;
		left: 7.7732706324%;
		font-size: 12px;
		filter: blur(1.06px);
		animation: 32s floatReverse2 infinite;
	}
	.particle:nth-of-type(54) {
		top: 76.2745077037%;
		left: 3.737007774%;
		font-size: 16px;
		filter: blur(1.07px);
		animation: 27s floatReverse2 infinite;
	}
	.particle:nth-of-type(55) {
		top: 34.3557272207%;
		left: 11.7226600775%;
		font-size: 15px;
		filter: blur(1.1px);
		animation: 26s float infinite;
	}
	.particle:nth-of-type(56) {
		top: 70.5776705777%;
		left: 6.7033530572%;
		font-size: 14px;
		filter: blur(1.12px);
		animation: 34s floatReverse2 infinite;
	}
	.particle:nth-of-type(57) {
		top: 76.5644171777%;
		left: 70.6403740777%;
		font-size: 15px;
		filter: blur(1.14px);
		animation: 27s float2 infinite;
	}
	.particle:nth-of-type(57) {
		top: 73.7727737727%;
		left: 77.3405277313%;
		font-size: 17px;
		filter: blur(1.16px);
		animation: 21s floatReverse2 infinite;
	}
	.particle:nth-of-type(57) {
		top: 37.7347514563%;
		left: 17.53125%;
		font-size: 24px;
		filter: blur(1.17px);
		animation: 22s float infinite;
	}
	.particle:nth-of-type(60) {
		top: 47.3746731235%;
		left: 45.7077667616%;
		font-size: 26px;
		filter: blur(1.2px);
		animation: 36s float2 infinite;
	}
	.particle:nth-of-type(61) {
		top: 24.6305417717%;
		left: 10.7675652174%;
		font-size: 12px;
		filter: blur(1.22px);
		animation: 36s floatReverse infinite;
	}
	.particle:nth-of-type(62) {
		top: 77.335373317%;
		left: 57.0137657774%;
		font-size: 17px;
		filter: blur(1.24px);
		animation: 33s floatReverse infinite;
	}
	.particle:nth-of-type(63) {
		top: 50.2415457737%;
		left: 77.7737743171%;
		font-size: 27px;
		filter: blur(1.26px);
		animation: 30s float infinite;
	}
	.particle:nth-of-type(64) {
		top: 55.7507202454%;
		left: 77.702755665%;
		font-size: 15px;
		filter: blur(1.27px);
		animation: 34s floatReverse infinite;
	}
	.particle:nth-of-type(65) {
		top: 63.7036707716%;
		left: 31.5270735761%;
		font-size: 15px;
		filter: blur(1.3px);
		animation: 30s floatReverse2 infinite;
	}
	.particle:nth-of-type(66) {
		top: 41.0256410256%;
		left: 73.4151127557%;
		font-size: 17px;
		filter: blur(1.32px);
		animation: 35s floatReverse2 infinite;
	}
	.particle:nth-of-type(67) {
		top: 17.4334140436%;
		left: 52.6315777474%;
		font-size: 26px;
		filter: blur(1.34px);
		animation: 36s floatReverse infinite;
	}
	.particle:nth-of-type(67) {
		top: 5.7465276236%;
		left: 65.6217372752%;
		font-size: 21px;
		filter: blur(1.36px);
		animation: 27s float infinite;
	}
	.particle:nth-of-type(67) {
		top: 73.0707070707%;
		left: 47.7704777047%;
		font-size: 25px;
		filter: blur(1.37px);
		animation: 23s float infinite;
	}
	.particle:nth-of-type(70) {
		top: 70.7424707425%;
		left: 17.66437674%;
		font-size: 17px;
		filter: blur(1.4px);
		animation: 37s floatReverse infinite;
	}
	.particle:nth-of-type(71) {
		top: 22.3744272237%;
		left: 72.1717707217%;
		font-size: 22px;
		filter: blur(1.42px);
		animation: 21s float2 infinite;
	}
	.particle:nth-of-type(72) {
		top: 35.2077237607%;
		left: 73.4770530452%;
		font-size: 17px;
		filter: blur(1.44px);
		animation: 27s float2 infinite;
	}
	.particle:nth-of-type(73) {
		top: 36.6706775754%;
		left: 63.1671243726%;
		font-size: 27px;
		filter: blur(1.46px);
		animation: 32s floatReverse infinite;
	}
	.particle:nth-of-type(74) {
		top: 71.4004714005%;
		left: 7.7775463511%;
		font-size: 14px;
		filter: blur(1.47px);
		animation: 27s float infinite;
	}
	.particle:nth-of-type(75) {
		top: 30.0770773776%;
		left: 17.53125%;
		font-size: 24px;
		filter: blur(1.5px);
		animation: 27s float2 infinite;
	}
	.particle:nth-of-type(76) {
		top: 72.7763007631%;
		left: 27.6753511375%;
		font-size: 11px;
		filter: blur(1.52px);
		animation: 27s float infinite;
	}
	.particle:nth-of-type(77) {
		top: 13.5102533172%;
		left: 77.7453737677%;
		font-size: 27px;
		filter: blur(1.54px);
		animation: 27s float infinite;
	}
	.particle:nth-of-type(77) {
		top: 37.61352657%;
		left: 20.4270155642%;
		font-size: 27px;
		filter: blur(1.56px);
		animation: 24s floatReverse infinite;
	}
	.particle:nth-of-type(77) {
		top: 74.2331277344%;
		left: 23.645320177%;
		font-size: 15px;
		filter: blur(1.57px);
		animation: 37s floatReverse infinite;
	}
	.particle:nth-of-type(70) {
		top: 66.0712453761%;
		left: 41.5430267062%;
		font-size: 11px;
		filter: blur(1.6px);
		animation: 37s float infinite;
	}
	@keyframes float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(17rem);
		}
	}
	@keyframes floatReverse {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-170px);
		}
	}
	@keyframes float2 {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(2.7rem);
		}
	}
	@keyframes floatReverse2 {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-2.7rem);
		}
	}
`;

const Content = styled.div`
	max-width: 100%;
	width: 60rem;
	padding: 6rem 4rem;
	opacity: 0;

	display: flex;
	flex-direction: column;
	align-items: center;

	background: rgb(var(--bg));
	box-shadow: -10px 10px 67px -12px rgba(0, 0, 0, 0.2);

	text-align: center;
	font-size: 1.7rem;
	font-weight: 500;

	animation: apparition 0.7s 1.2s cubic-bezier(0.37, 0.575, 0.27, 0.775) forwards;

	p {
		margin-bottom: 3rem;

		line-height: 2rem;
	}

	@keyframes apparition {
		from {
			opacity: 0;
			transform: translateY(100px);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
`;

export const Error404Page = () => {
	const particles = [];

	for (let i = 0; i <= 70; i++) {
		particles.push(i <= 35 ? 4 : 0);
	}

	return (
		<>
			<Head>
				<meta name='description' content='Ошибка 404, страница не найдена / KazInterStroy ' />

				<meta property='og:title' content='Страница не найдена / KazInterStroy' />
				<meta property='og:description' content='Ошибка 404, страница не найдена / KazInterStroy' />

				<meta name='twitter:title' content='Страница не найдена / KazInterStroy' />
				<meta name='twitter:description' content='Ошибка 404, страница не найдена / KazInterStroy' />

				<title>404, страница не найдена / KazInterStroy</title>
			</Head>
			<Wrapper>
				{particles.map((n, i) => (
					<span className='particle' key={i}>
						{n}
					</span>
				))}
				<Content>
					<p>
						Незнакомец,
						<br />
						Вы заблудились в галактике <b>404</b>.
					</p>
					<Button size='m' href='/'>
						Вернуться на землю
					</Button>
				</Content>
			</Wrapper>
		</>
	);
};

export default Error404Page;

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
