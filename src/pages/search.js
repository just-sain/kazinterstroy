import axios from 'axios';
import { declOfNum } from '../utils/declaration';
// components
import styled from '@emotion/styled';
import Head from 'next/head';
import { Breadcrumb } from '../components/breadcrumb';
import { Elements } from '../components/elements';
import { sendDefaultPagePropsRequest } from '../lib/api';

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

// search: string

const Search = ({ search, elementsData }) => {
	const breadcrumbData = [
		{ name: 'Поиск', href: '/' },
		{ name: search, href: `/search?search=${search}` },
	];

	return (
		<>
			<Head>
				<meta name='description' content={search ? 'Поисковик / KazInterStroy ' : `Поиск по запросу: ${search} / KazInterStroy`} />
				<meta
					name='keywords'
					content={`kazinterstroy, интернет магазин, kazstroy, казинтерстрой, казстрой, ${search ? '' : search}, поисковик, поиск`}
				/>

				<meta property='og:title' content='Поиск / KazInterStroy' />
				<meta
					property='og:description'
					content={search ? 'Поисковик / KazInterStroy ' : `Поиск по запросу: ${search} / KazInterStroy`}
				/>

				<meta name='twitter:title' content={`Поиск / KazInterStroy`} />
				<meta
					name='twitter:description'
					content={search ? 'Поисковик / KazInterStroy ' : `Поиск по запросу: ${search} / KazInterStroy`}
				/>

				<title>Результаты по запросу {search ?? ''} / KazInterStroy</title>
			</Head>

			<Wrapper>
				<Breadcrumb links={breadcrumbData} withMarginBottom />
				<Heading>
					Результат по запросу <b>{search}</b>
					{!!elementsData.length && (
						<>
							<br />
							<span>
								({elementsData.length} {declOfNum(elementsData.length, ['товар', 'товара', 'товаров'])})
							</span>
						</>
					)}
				</Heading>
				{!elementsData.length ? <NotFound>Ничего не найдено</NotFound> : <Elements elements={elementsData} />}
			</Wrapper>
		</>
	);
};

export default Search;

export const getServerSideProps = async ({ query }) => {
	// default props
	const defaultData = await sendDefaultPagePropsRequest();

	// working with search
	if (!query?.search) {
		return {
			NotFound: true,
		};
	}

	// elements
	let elementsData = [];

	if (!isNaN(query.search)) {
		const id = Number(query.search);

		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_API}/element-info?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&article=${id}&additional_fields=brand,images`
		);

		elementsData = typeof data === 'string' ? [] : data;
	} else {
		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_API}/element-info?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&name=${query.search}&additional_fields=brand,images`
		);

		elementsData = typeof data === 'string' ? [] : data;
	}

	return {
		props: {
			search: query.search,
			elementsData: elementsData ?? [],
			// default props
			contactData: defaultData.contactData,
			catalogData: defaultData.catalogData,
			menuData: defaultData.menuData,
		},
	};
};
