import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { declOfNum } from '../utils/declaration';
// components
import Head from 'next/head';
import { Breadcrumb } from '../components/breadcrumb';
import styled from '@emotion/styled';
import { Elements } from '../components/elements';

const Wrapper = styled.div`
	width: 100%;
`;

const Heading = styled.h1`
	margin-bottom: 3rem;

	color: rgb(var(--black));
	text-align: center;
	word-break: break-all;
	font-size: 3.2rem;
	font-weight: 400;

	b {
		color: rgb(var(--primary));
	}

	span {
		color: rgb(var(--light-gray));
		font-weight: 100;
	}
`;

const NotFound = styled.h2`
	color: rgb(var(--black));
	text-align: center;
	word-break: break-all;
	font-size: 3.2rem;
	font-weight: 400;
`;

const Search = () => {
	const { query } = useRouter();
	const [elements, setElements] = useState([]);
	const [isReady, setIsReady] = useState(false);

	const breadcrumbData = [
		{ name: 'Поиск', href: '/' },
		{ name: query.search, href: `/search?search=${query.search}` }
	];

	useEffect(() => {
		setIsReady(false);
		if (!query.search) {
			setElements([]);
		} else {
			if (!isNaN(query.search)) {
				const id = Number(query.search);

				axios
					.get(
						`${process.env.NEXT_PUBLIC_API}/element-info?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&article=${id}&additional_fields=brand,images`
					)
					.then(response => {
						setElements(typeof response.data === 'string' ? [] : response.data);
						setIsReady(true);
					});
			} else {
				axios
					.get(
						`${process.env.NEXT_PUBLIC_API}/element-info?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&name=${query.search}&additional_fields=brand,images`
					)
					.then(response => {
						setElements(typeof response.data === 'string' ? [] : response.data);
						setIsReady(true);
					});
			}
		}
	}, [query.search]);

	return (
		<>
			<Head>
				<meta
					name='description'
					content={
						!query.search ? 'Поисковик / KazInterStroy ' : `Поиск по запросу: ${query.search} / KazInterStroy`
					}
				/>
				<meta
					name='keywords'
					content={`kazinterstroy, интернет магазин, kazstroy, казинтерстрой, казстрой, ${
						!query.search ? '' : query.search
					}, поисковик, поиск`}
				/>

				<meta property='og:title' content='Поиск / KazInterStroy' />
				<meta
					property='og:description'
					content={
						!query.search ? 'Поисковик / KazInterStroy ' : `Поиск по запросу: ${query.search} / KazInterStroy`
					}
				/>

				<meta name='twitter:title' content={`Поиск / KazInterStroy`} />
				<meta
					name='twitter:description'
					content={
						!query.search ? 'Поисковик / KazInterStroy ' : `Поиск по запросу: ${query.search} / KazInterStroy`
					}
				/>

				<title>Результаты по запросу {query.search ?? ''} / KazInterStroy</title>
			</Head>
			<Wrapper>
				<Breadcrumb links={breadcrumbData} withMarginBottom />
				<Heading>
					Результат по запросу <b>{query.search}</b>
					{!!elements.length && (
						<>
							<br />
							<span>
								({elements.length} {declOfNum(elements.length, ['товар', 'товара', 'товаров'])})
							</span>
						</>
					)}
				</Heading>
				{!elements.length && isReady ? (
					<NotFound>Ничего не найдено</NotFound>
				) : (
					<Elements isReady={isReady} elements={elements} />
				)}
			</Wrapper>
		</>
	);
};

export default Search;
