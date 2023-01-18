import styled from '@emotion/styled';

// maxW: 's' | 'm' | 'l';
export const Container = styled.div`
	max-width: var(--container-${props => props.maxW ?? 's'});
	width: 100%;
	margin: 0 auto;

	@media screen and (max-width: 1${({ maxW }) => (maxW === 'l' ? `4` : maxW === 'm' ? `2` : `0`)}80px) {
		padding: 0 1rem;
	}
`;
