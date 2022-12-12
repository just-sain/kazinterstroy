import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
// components
import Head from 'next/head';
import { BsArrowReturnRight } from 'react-icons/bs';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Link from 'next/link';

const Wrapper = styled.div`
	width: 100%;
`;

const Box = styled.div`
	width: 100%;
	height: calc(100vh - var(--header-height) - 3rem - 2rem - 5rem);

	display: grid;
	grid-template-columns: 1fr 2fr;
`;

const FirstLevelMenu = styled.ul`
	width: 100%;
	overflow-y: scroll;
`;

const FirstLevelMenuItem = styled.li`
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

		top: -0.2rem;
		left: -0.8rem;

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

			top: -0.2rem;
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

const Category = ({ menu }) => {
	const [firstLevel] = useState(menu.filter(m => m.level === 1));
	const [secondLevel] = useState(menu.filter(m => m.level === 2));
	const [selectMenu, setSelectMenu] = useState(firstLevel[0]);

	const router = useRouter();

	return (
		<>
			<Head>
				<title>Все категории / KazInterStroy</title>
			</Head>
			<Wrapper>
				<Box>
					<FirstLevelMenu>
						{firstLevel.map(first => (
							<FirstLevelMenuItem
								key={first.id}
								isSelected={selectMenu.id === first.id}
								onClick={() => setSelectMenu(first)}>
								{first.name}
								<Link href={`/category/${first.id}`}>
									<BsArrowReturnRight />
								</Link>
							</FirstLevelMenuItem>
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
									<FirstLevelMenuItem
										key={second.id}
										onClick={() => router.push(`/category/${selectMenu.id}/${second.id}`)}>
										{second.name}
										<Link href={`/category/${selectMenu.id}/${second.id}`}>
											<BsArrowReturnRight />
										</Link>
									</FirstLevelMenuItem>
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
