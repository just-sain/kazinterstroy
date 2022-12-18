import { memo } from 'react';
// components
import { List } from './list';
import { Container } from './container';
import styled from '@emotion/styled';

const StyledFooter = styled.footer`
	width: 100%;
	padding: 5rem 0 3rem;
	z-index: 50;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: start;

	background: rgb(var(--black));

	color: rgb(var(--white));

	h6 {
		color: rgb(var(--primary));
	}
`;

const FooterWrapper = styled(Container)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 3rem;
`;

const StyledContainer = styled(Container)`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 40rem;
	align-items: flex-start;
	gap: 3rem;

	@media screen and (max-width: 1050px) {
		grid-template-columns: 1fr 2fr;
		align-items: flex-start;
		gap: 2rem;

		ul {
			grid-column: 2 3;
			grid-row: 2 3;
		}
	}

	@media screen and (max-width: 720px) {
		grid-template-columns: 1fr;
		align-items: flex-start;
		gap: 2rem;
	}
`;

const Map = styled.iframe`
	width: 100%;
	height: 25rem;

	border: none;
	border-radius: 1.5rem;

	@media screen and (max-width: 720px) {
		height: 30rem;
	}
	@media screen and (max-width: 500px) {
		height: 25rem;
	}
	@media screen and (max-width: 350px) {
		height: 20rem;
	}
`;

const Bottom = styled.div`
	color: rgb(var(--light-gray));
`;

export const Footer = memo(() => {
	return (
		<StyledFooter>
			<FooterWrapper maxW='l'>
				<StyledContainer maxW='m'>
					<List>
						<h6>Контакты</h6>
						<li>
							<a href='tel:+77083266420'>+7 (708) 326 64 20</a>
						</li>
						<li>
							Городской:
							<br />
							<a href='tel:+77273231030'>+7 (727) 32 31 030</a>
						</li>
						<li>
							<a href='mailto:kazinterstroy@mail.ru'>kazinterstroy@mail.ru</a>
						</li>
					</List>
					<List>
						<h6>Адрес</h6>
						<li>Республика Казахстан, г. Алматы, ул. Масанчи 78 офис 400</li>
						<li>Индекс: 050012</li>
						<li>Режим работы: ПН - ПТ, 9:00 - 18:00</li>
					</List>
					<List>
						<h6>О нас</h6>
						<li>
							<a href='/about'>О нас</a>
						</li>
						<li>
							<a href='/contacts'>Контакты</a>
						</li>
						<li>
							<a href='#'>Документы</a>
						</li>
					</List>
					<Map
						loading='lazy'
						src='https://yandex.ru/map-widget/v1/?um=constructor%3A09c7f4a4a087808079f28245bf8ab598e9609a06e555f8a5586d6e7ed9ab7da3&amp;source=constructor'></Map>
				</StyledContainer>
				<Bottom>Авторское право © 2023 KazInterStroy All rights reserved.</Bottom>
			</FooterWrapper>
		</StyledFooter>
	);
});
