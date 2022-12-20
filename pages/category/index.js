import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import client from '../../lib/contentful';
// components
import Head from 'next/head';
import Link from 'next/link';
import { BsArrowBarLeft, BsArrowReturnRight, BsArrowBarRight } from 'react-icons/bs';
import { Slider } from '../../components/slider';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const MenuContainer = styled.div`
	width: 100%;
	margin-top: 7.5rem;
`;

const LoaderContainer = styled.div`
	width: 100%;
	padding: 7.5rem 0;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const Loader = styled.span`
	width: 7rem;
	height: 7rem;
	border-radius: 50%;
	display: inline-block;
	position: relative;
	border: 0.5rem solid;
	border-color: rgb(var(--black)) rgb(var(--black)) transparent;
	box-sizing: border-box;
	animation: catalogRotation 1s linear infinite;

	&::after {
		content: '';
		box-sizing: border-box;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		border: 0.4rem solid;
		border-color: transparent rgb(var(--primary));
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
		animation: catalogRotationBack 0.5s linear infinite;
		transform-origin: center center;
	}
`;

const Box = styled.div`
	width: 100%;
	min-height: 70rem;

	display: grid;
	grid-template-columns: 1fr;
`;

const FirstLevelMenu = styled.ul`
	width: 100%;
	padding: 1rem;
	opacity: 0;
	display: ${({ isMenuSelect }) => (isMenuSelect ? `none` : `block`)};

	animation: fade-right 0.5s ease 0s forwards;
`;

const MenuItem = styled.li`
	padding: 1rem 2.5rem 1rem 1rem;
	overflow: hidden;

	cursor: pointer;
	background: rgba(var(--primary), 0.2);
	border: 0.1rem solid rgb(var(--bg));

	position: relative;
	top: 0;
	left: 0;

	font-size: 1.6rem;
	font-weight: 500;

	transition: background 0.4s ease 0s, left 0.3s ease 0s, top 0.3s ease 0s, color 0.3s ease 0s;

	div {
		cursor: alias;

		color: rgb(var(--white));
		font-size: 2rem;

		position: absolute;
		top: 50%;
		right: 0.75rem;

		transform: translate(0, -200%);
		transition: transform 0.4s ease 0s;
	}

	svg {
		position: relative;
		top: 0.25rem;
		left: 0.5rem;
	}

	&:hover {
		background: rgb(var(--black));
		border: 0.1rem solid rgb(var(--bg));

		color: rgb(var(--white));

		top: -0.3rem;
		left: 0.8rem;

		div {
			transform: translate(0, -50%);
		}
	}

	${({ isSelected }) =>
		isSelected &&
		css`
			background: rgb(var(--primary));
			border: 0.1rem solid rgb(var(--bg));

			color: rgb(var(--white));

			top: -0.3rem;
			left: -0.8rem;

			a {
				transform: translate(0, -50%);
			}
		`}
`;

const SecondLevelMenu = styled.div`
	width: 100%;
	padding: 2rem;
	overflow-y: auto;
	opacity: 0;

	display: ${({ isMenuSelect }) => (!isMenuSelect ? `none` : `block`)};
	background: rgb(var(--light-gray), 0.1);
	border-radius: 0 1.5rem 1.5rem 0;

	animation: fade-left 0.5s ease 0s forwards;
`;

const Heading = styled.h2`
	margin-bottom: 1.5rem;

	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
	gap: 0.5rem;

	color: rgb(var(--primary));
	font-size: 2.4rem;
	font-weight: 500;

	a {
		cursor: alias;
	}
`;

const BackArrow = styled(BsArrowBarLeft)`
	margin-right: 0.5rem;
	cursor: pointer;

	color: rgb(var(--error));
	font-size: 2.8rem;
`;

const Title = styled.h1`
	margin-bottom: 1.5rem;

	color: rgb(var(--black));
	text-align: center;
	font-size: 3.4rem;
	font-weight: 400;

	a {
		cursor: alias;
	}
`;

const Category = ({ sliderData }) => {
	const router = useRouter();

	const [menu, setMenu] = useState([]);
	const [firstLevel, setFirstLevel] = useState([]);
	const [secondLevel, setSecondLevel] = useState([]);
	const [selectedMenu, setSelectedMenu] = useState(null);
	const TitleRef = useRef(null);

	useEffect(() => {
		if (!menu.length) {
			axios
				.get(`${process.env.NEXT_PUBLIC_API}/categories?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`)
				.then(res => {
					setMenu(res.data);
				});
		} else {
			setFirstLevel(menu.filter(m => m.level === 1));
			setSecondLevel(menu.filter(m => m.level === 2));
		}
	}, [menu]);

	const onFirstLevelMenuClick = selectedMenu => {
		window.scrollTo({
			top: TitleRef.current.offsetTop - 100,
			left: 0,
			behavior: 'smooth'
		});
		setSelectedMenu(selectedMenu);
	};

	return (
		<>
			<Head>
				<meta name='description' content='Рассмотрите наш каталог и выберите себе нужный товар / KazInterStroy' />
				<meta
					name='keywords'
					content='kazinterstroy, интернет магазин, kazstroy, казинтерстрой, казстрой, каталог, меню, товары, магазин, продукты'
				/>

				<meta property='og:title' content='Каталог / KazInterStroy' />
				<meta
					property='og:description'
					content='Рассмотрите наш каталог и выберите себе нужный товар / KazInterStroy'
				/>

				<meta name='twitter:title' content='Каталог / KazInterStroy' />
				<meta
					name='twitter:description'
					content='Рассмотрите наш каталог и выберите себе нужный товар  / KazInterStroy'
				/>

				<title>Каталог / KazInterStroy</title>
			</Head>
			<Slider sliderData={sliderData} />
			<MenuContainer>
				<Title ref={TitleRef}>Наш Каталог</Title>
				{!menu.length || !firstLevel.length || !secondLevel.length ? (
					<LoaderContainer>
						<Loader />
					</LoaderContainer>
				) : (
					<Box>
						<FirstLevelMenu isMenuSelect={!selectedMenu ? 0 : 1}>
							{firstLevel.map(first => (
								<MenuItem
									key={first.id}
									isSelected={selectedMenu && selectedMenu.id === first.id}
									onClick={() => onFirstLevelMenuClick(first)}>
									{first.name}
									<div>
										<BsArrowBarRight />
									</div>
								</MenuItem>
							))}
						</FirstLevelMenu>
						{selectedMenu && (
							<SecondLevelMenu isMenuSelect={!selectedMenu ? 0 : 1}>
								<ul>
									<Heading>
										<BackArrow onClick={() => setSelectedMenu(null)} />
										{selectedMenu.name}
									</Heading>
									{secondLevel
										.filter(second => selectedMenu.left < second.left && second.right < selectedMenu.right)
										.map(second => (
											<MenuItem key={second.id} onClick={() => router.push(`/category/${second.id}`)}>
												{second.name}
												<Link href={`/category/${second.id}`}>
													<BsArrowReturnRight />
												</Link>
											</MenuItem>
										))}
								</ul>
							</SecondLevelMenu>
						)}
					</Box>
				)}
			</MenuContainer>
		</>
	);
};

export default Category;

export const getStaticProps = async () => {
	const slider = await client.getEntries({ content_type: 'slider' });

	// sliderData
	const sliderData = [];
	if (!slider.items.length) sliderData.push('/slider-plug.webp'); // if sliderData is empty
	else {
		for (let i = 0; i < slider.items.length; i++) {
			sliderData.push({
				image: slider.items[i].fields.image.fields.file.url,
				link: slider.items[i].fields.link
			});
		}
	}

	return {
		props: {
			sliderData: sliderData
		}
	};
};
