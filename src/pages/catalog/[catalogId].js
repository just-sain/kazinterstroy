import { useContext } from 'react';
import { Store } from '../../lib/store';
// components
import { Preloader } from '../../components/preloader';
import { Error404Page } from '../404';
// styles
import styled from '@emotion/styled';
import Link from 'next/link';
import { sendDefaultPagePropsRequest } from '../../lib/api';

const Wrapper = styled.section`
	width: 100%;
	padding-left: 1rem;
`;

const Heading = styled.h1`
	color: rgb(var(--primary));
	text-align: center;
	font-size: 3.2rem;
	font-weight: 600;
`;

const ListWrapper = styled.div`
	width: 100%;
	margin-top: 3rem;

	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	justify-items: flex-start;
	align-items: flex-start;
	gap: 1.5rem;

	@media screen and (max-width: 850px) {
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

const ListContainer = styled.div`
	width: 100%;
`;

const List = styled.ul`
	padding-left: 1rem;

	display: grid;
	align-content: flex-start;
	gap: 1rem;

	border-left: 0.1rem solid rgb(var(--real-gray));

	h4 {
		font-size: 1.6rem;
	}

	transition: border-left 0.3s ease 0s;

	&:hover {
		border-left: 0.1rem solid rgb(var(--primary));
	}
`;

const ListTitle = styled.h4`
	margin-bottom: 1rem;

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
	font-weight: 600;

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
	const selectedCatalogCategories = !!catalog && !!menu && menu.filter(el => selectedCatalog.categories.indexOf(el.id) > -1);

	//  for divide category to 3 columns
	let selectCatalogCategoriesColumns = [];
	if (!!selectedCatalogCategories) {
		for (let i = 0; i < selectedCatalogCategories.length + 1; i += Math.ceil(selectedCatalogCategories.length / 3)) {
			const nextValue = i + Math.ceil(selectedCatalogCategories.length / 3);
			const menuPart = selectedCatalogCategories.slice(i, nextValue);

			selectCatalogCategoriesColumns.push(menuPart);
		}
	}

	const AutoFillCategoriesLvl = ({ currentLvl }) => {
		return (
			<ListItem key={currentLvl.id}>
				{currentLvl.left + 1 === currentLvl.right ? (
					<Link href={`/category/${currentLvl.id}`}>{currentLvl.name}</Link>
				) : (
					<>
						<ListTitle>{currentLvl.name}</ListTitle>
						<List>
							{menu
								.filter(nextLvl => currentLvl.left < nextLvl.left && nextLvl.right < currentLvl.right)
								.map(nextLvl => (
									<AutoFillCategoriesLvl currentLvl={nextLvl} key={nextLvl.id} />
								))}
						</List>
					</>
				)}
			</ListItem>
		);
	};

	return (
		<Wrapper>
			{!selectedCatalog || !menu ? (
				<Preloader />
			) : (
				<>
					<Heading>{selectedCatalog.name}</Heading>
					<ListWrapper>
						{selectCatalogCategoriesColumns.map((column, i) => (
							<ListColumn key={i}>
								{column.map(firstLevel => (
									<ListContainer key={firstLevel.id}>
										<List>
											<ListTitle>{firstLevel.name}</ListTitle>
											{menu
												.filter(secondLevel => firstLevel.left < secondLevel.left && secondLevel.right < firstLevel.right)
												.map(secondLevel => (
													<AutoFillCategoriesLvl currentLvl={secondLevel} key={secondLevel.id} />
												))}
										</List>
									</ListContainer>
								))}
							</ListColumn>
						))}
					</ListWrapper>
				</>
			)}
		</Wrapper>
	);
};

export default DynamicCatalogPage;

export const getServerSideProps = async ctx => {
	// default props
	const defaultData = await sendDefaultPagePropsRequest();

	// working with catalog data
	if (!ctx?.query || !ctx.query.catalogId || isNaN(ctx.query.catalogId)) {
		return { notFound: true };
	}

	return {
		props: {
			contactData: defaultData.contactData,
			catalogData: defaultData.catalogData,
			menuData: defaultData.menuData,
			catalogId: Number(ctx.query.catalogId),
		},
	};
};
