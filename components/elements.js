import styled from '@emotion/styled';
import { Article } from './article';
import { MirageArticle } from './mirage-article';

export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 3rem;

	@media screen and (max-width: 1050px) {
		grid-template-columns: repeat(3, 1fr);
	}
	@media screen and (max-width: 720px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media screen and (max-width: 400px) {
		grid-template-columns: 1fr;
	}
`;

// elements: []

export const Elements = ({ isReady, elements }) => {
	return (
		<Grid>
			{isReady ? (
				<>
					{elements.length &&
						elements.map(e => (
							<Article key={e.article} articleData={e} href={`/category/${e.category}/${e.article}`} />
						))}
				</>
			) : (
				<>
					<MirageArticle />
					<MirageArticle />
					<MirageArticle />
					<MirageArticle />
					<MirageArticle />
					<MirageArticle />
					<MirageArticle />
				</>
			)}
		</Grid>
	);
};
