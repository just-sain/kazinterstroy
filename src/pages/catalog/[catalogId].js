import { useContext, useEffect } from 'react';
import { Store } from '../../lib/store';
// components
import { Error404Page } from '../404';
import { Preloader } from '../../components/preloader';
// styles
import styled from '@emotion/styled';
import Link from 'next/link';

const Wrapper = styled.section`
	width: 100%;
`;

const Heading = styled.h1`
	color: rgb(var(--primary));
	text-align: center;
	font-size: 3.2rem;
	font-weight: 500;
`;

const ListContainer = styled.div`
	margin-top: 3rem;
	width: 100%;

	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	justify-items: flex-start;
	align-items: flex-start;
	gap: 1.5rem;

	@media screen and (max-width: 850px) {
		grid-template-columns: 1fr 1fr;
	}

	@media screen and (max-width: 570px) {
		grid-template-columns: 1fr;
	}
`;

const ListColumn = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	justify-items: flex-start;
	align-items: flex-start;
	gap: 3rem;
`;

const List = styled.ul`
	padding-left: 0.5rem;

	display: grid;
	align-content: flex-start;
	gap: 1rem;
`;

const ListTitle = styled.h4`
	color: rgb(var(--black));
	font-size: 1.8rem;
	font-weight: 700;

	@media screen and (max-width: 570px) {
		font-size: 1.6rem;
	}
`;

const ListItem = styled.li`
	color: rgb(var(--gray));
	font-size: 1.4rem;
	font-weight: 500;

	a:hover {
		text-decoration: underline;
		color: rgb(var(--primary));
	}
`;

const DynamicCatalogPage = ({ catalogId }) => {
	const { state } = useContext(Store);
	const { catalog, menu } = state;

	const selectedCatalog = !!catalog && catalog.find(c => c.id === catalogId);
	if (!!catalog && !catalog.find(c => c.id === catalogId)) return <Error404Page />;
	const selectedCatalogCategories =
		!!catalog && !!menu && menu.filter(el => selectedCatalog.categories.indexOf(el.id) > -1);

	//  for divide category to 3 columns
	let selectCatalogCategoriesColumns = [];
	if (!!selectedCatalogCategories) {
		for (let i = 0; i < selectedCatalogCategories.length + 1; i += Math.ceil(selectedCatalogCategories.length / 3)) {
			const nextValue = i + Math.ceil(selectedCatalogCategories.length / 3);
			const menuPart = selectedCatalogCategories.slice(i, nextValue);

			selectCatalogCategoriesColumns.push(menuPart);
		}
	}

	console.log(selectCatalogCategoriesColumns);

	return (
		<Wrapper>
			{!selectedCatalog || !menu ? (
				<Preloader />
			) : (
				<>
					<Heading>{selectedCatalog.name}</Heading>
					<ListContainer>
						{selectCatalogCategoriesColumns.map((column, i) => (
							<ListColumn key={i}>
								{column.map(firstLevel => (
									<List key={firstLevel.id}>
										<ListTitle>{firstLevel.name}</ListTitle>
										{menu
											.filter(
												secondLevel =>
													firstLevel.left < secondLevel.left && secondLevel.right < firstLevel.right
											)
											.map(secondLevel => (
												<ListItem key={secondLevel.id}>
													<Link href={`/category/${secondLevel.id}`}>{secondLevel.name}</Link>
												</ListItem>
											))}
									</List>
								))}
							</ListColumn>
						))}
					</ListContainer>
				</>
			)}
		</Wrapper>
	);
};

export default DynamicCatalogPage;

export const getServerSideProps = async ctx => {
	if (!ctx?.query || !ctx.query.catalogId || isNaN(ctx.query.catalogId)) {
		return { notFound: true };
	}

	console.log(ctx.query);

	return {
		props: {
			catalogId: Number(ctx.query.catalogId)
		}
	};
};
