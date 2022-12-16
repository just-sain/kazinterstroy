import styled from '@emotion/styled';

const StyledSection = styled.section`
	width: 100%;
`;

const Heading = styled.h1`
	color: rgb(var(--black));
	text-align: center;
	font-size: 3.2rem;
	font-weight: 400;

	@media screen and (max-width: 600px) {
		word-break: break-all;
		line-height: 2.8rem;
		font-size: 2.4rem;
	}
`;

const Flex = styled.div`
	margin-top: 3rem;

	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	gap: 2rem 5rem;
`;

const Item = styled.img`
	width: 21%;
	height: auto;

	/* filter: grayscale(100%); */
	pointer-events: none;
	object-fit: contain;
	object-position: center;

	@media screen and (max-width: 850px) {
		width: 25%;
	}
	@media screen and (max-width: 700px) {
		width: 40%;
	}
	@media screen and (max-width: 450px) {
		width: 65%;
	}
	@media screen and (max-width: 350px) {
		width: 95%;
	}
`;

// companiesData: [{ name: string, logo: string }]
export const Companies = ({ companiesData, ...props }) => {
	return (
		<StyledSection {...props}>
			<Heading>Компаний с которыми мы сотрудничаем</Heading>
			<Flex>
				{companiesData.map(c => (
					<Item key={c.name} src={c.logo} alt={c.name} />
				))}
			</Flex>
		</StyledSection>
	);
};
