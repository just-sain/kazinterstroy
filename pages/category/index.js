import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
// components
import Head from 'next/head';
import Link from 'next/link';
import { BsArrowReturnRight } from 'react-icons/bs';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Wrapper = styled.div`
	width: 100%;
`;

const Box = styled.div`
	width: 100%;
	height: 55rem;

	display: grid;
	grid-template-columns: 1fr 2fr;
`;

const FirstLevelMenu = styled.ul`
	width: 100%;
	padding: 1rem;
	overflow-y: scroll;
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

	a {
		cursor: alias;

		color: rgb(var(--white));
		font-size: 2rem;

		position: absolute;
		top: 50%;
		right: 0.75rem;

		transform: translate(0, -200%);
		transition: transform 0.4s ease 0s;
	}

	&:hover {
		background: rgb(var(--black));
		border: 0.1rem solid rgb(var(--bg));

		color: rgb(var(--white));

		top: -0.3rem;
		left: 0.8rem;

		a {
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
	overflow: hidden;

	background: rgb(var(--light-gray), 0.1);
`;

const Heading = styled.h2`
	margin-bottom: 1.5rem;

	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
	gap: 0.5rem;

	color: rgb(var(--black));
	font-size: 2.4rem;
	font-weight: 500;

	a {
		cursor: alias;
	}
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

const Category = ({ menu }) => {
	const router = useRouter();

	const [firstLevel] = useState(menu && menu.filter(m => m.level === 1));
	const [secondLevel] = useState(menu && menu.filter(m => m.level === 2));
	const [selectMenu, setSelectMenu] = useState(firstLevel[0]);

	return (
		<>
			<Head>
				<title>Все категории / KazInterStroy</title>
			</Head>
			<Wrapper>
				<Title>Наш Каталог</Title>
				<Box>
					<FirstLevelMenu>
						{firstLevel.map(first => (
							<MenuItem
								key={first.id}
								isSelected={selectMenu.id === first.id}
								onClick={() => setSelectMenu(first)}>
								{first.name}
								<Link href={`/category/${first.id}`}>
									<BsArrowReturnRight />
								</Link>
							</MenuItem>
						))}
					</FirstLevelMenu>
					<SecondLevelMenu>
						<ul>
							<Heading>
								{selectMenu.name}
								<Link href={`/category/${selectMenu.id}`}>
									<BsArrowReturnRight />
								</Link>
							</Heading>
							{secondLevel
								.filter(second => selectMenu.left < second.left && second.right < selectMenu.right)
								.map(second => (
									<MenuItem
										key={second.id}
										onClick={() => router.push(`/category/${selectMenu.id}/${second.id}`)}>
										{second.name}
										<Link href={`/category/${selectMenu.id}/${second.id}`}>
											<BsArrowReturnRight />
										</Link>
									</MenuItem>
								))}
						</ul>
					</SecondLevelMenu>
				</Box>
			</Wrapper>
		</>
	);
};

export default Category;

export const getStaticProps = async () => {
	// menu
	const { data: menu } = await axios.get(
		`${process.env.NEXT_PUBLIC_API}/categories?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
	);

	return {
		props: {
			menu
		}
	};
};
