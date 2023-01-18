import styled from '@emotion/styled';
import { useContext } from 'react';
import { Store } from '../utils/store';
import { CatalogBlock } from './catalogBlock';
import { Container } from './container';

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	padding-top: var(--header-height);
	z-index: 80;

	background: rgb(var(--bg));

	position: fixed;
	top: 0;
	left: 0;
`;

const StyledContainer = styled(Container)`
	width: var(--container-l);
	height: 100%;
	margin: 0 auto;
	padding: 3rem 0;
	overflow-x: none;
	overflow-y: auto;
`;

export const Catalog = () => {
	const { state } = useContext(Store);
	const { menu } = state;

	return (
		<Wrapper>
			<StyledContainer maxW='m'>
				<CatalogBlock />
			</StyledContainer>
		</Wrapper>
	);
};
