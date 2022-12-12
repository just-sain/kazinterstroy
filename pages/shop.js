// components
import Head from 'next/head';
import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { Product } from '../components/product';

const ProductsContainer = styled.div`
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

const ShopPage = ({ productsData }) => {
	return (
		<>
			<Head>
				<title>Магазин / KazInterStroy</title>
			</Head>
			<section>
				<h1
					className={css`
						margin-bottom: 3rem;
						text-align: center;
					`}>
					Наши самые популярные продукты
				</h1>
				<ProductsContainer>
					{productsData.map((p, i) => (
						<Product key={i} {...p} />
					))}
				</ProductsContainer>
			</section>
		</>
	);
};

export default ShopPage;

export const getServerSideProps = async () => {
	// menu
	const { data: menu } = await axios.get(
		`${process.env.NEXT_PUBLIC_API}/categories?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
	);

	// here must be API request to get popular products data
	const productsData = [
		{
			path: '/products/rjc45',
			name: 'RJC45 - сетевой коннектор 8P8C CAT.5E.',
			image: 'https://images.satu.kz/113613494_w640_h640_rjc45-konnektor.jpg',
			inStock: false,
			description:
				'Коннектор сетевой 8P8C Cat.5E. Надежные, усиленные зубья контактов для надежного крепления провода, улучшенные фиксаторы обжима кабеля, экран от наводок, металлический',
			price: 100
		},
		{
			path: '/products/rjc45',
			name: 'RJC45 - сетевой коннектор 8P8C CAT.5E.',
			image: 'https://images.satu.kz/113613494_w640_h640_rjc45-konnektor.jpg',
			inStock: true,
			description:
				'Коннектор сетевой 8P8C Cat.5E. Надежные, усиленные зубья контактов для надежного крепления провода, улучшенные фиксаторы обжима кабеля, экран от наводок, металлический',
			price: 100
		},
		{
			path: '/products/rjc45',
			name: 'RJC45 - сетевой коннектор 8P8C CAT.5E.',
			image: 'https://images.satu.kz/113613494_w640_h640_rjc45-konnektor.jpg',
			inStock: true,
			description:
				'Коннектор сетевой 8P8C Cat.5E. Надежные, усиленные зубья контактов для надежного крепления провода, улучшенные фиксаторы обжима кабеля, экран от наводок, металлический',
			price: 100
		},
		{
			path: '/products/rjc45',
			name: 'RJC45 - сетевой коннектор 8P8C CAT.5E.',
			image: 'https://images.satu.kz/113613494_w640_h640_rjc45-konnektor.jpg',
			inStock: true,
			description:
				'Коннектор сетевой 8P8C Cat.5E. Надежные, усиленные зубья контактов для надежного крепления провода, улучшенные фиксаторы обжима кабеля, экран от наводок, металлический',
			price: 100
		},
		{
			path: '/products/rjc45',
			name: 'RJC45 - сетевой коннектор 8P8C CAT.5E.',
			image: 'https://images.satu.kz/113613494_w640_h640_rjc45-konnektor.jpg',
			inStock: true,
			description:
				'Коннектор сетевой 8P8C Cat.5E. Надежные, усиленные зубья контактов для надежного крепления провода, улучшенные фиксаторы обжима кабеля, экран от наводок, металлический',
			price: 100
		},
		{
			path: '/products/rjc45',
			name: 'RJC45 - сетевой коннектор 8P8C CAT.5E.',
			image: 'https://images.satu.kz/113613494_w640_h640_rjc45-konnektor.jpg',
			inStock: true,
			description:
				'Коннектор сетевой 8P8C Cat.5E. Надежные, усиленные зубья контактов для надежного крепления провода, улучшенные фиксаторы обжима кабеля, экран от наводок, металлический',
			price: 100
		},
		{
			path: '/products/rjc45',
			name: 'RJC45 - сетевой коннектор 8P8C CAT.5E.',
			image: 'https://images.satu.kz/113613494_w640_h640_rjc45-konnektor.jpg',
			inStock: true,
			description:
				'Коннектор сетевой 8P8C Cat.5E. Надежные, усиленные зубья контактов для надежного крепления провода, улучшенные фиксаторы обжима кабеля, экран от наводок, металлический',
			price: 100
		},
		{
			path: '/products/rjc45',
			name: 'RJC45 - сетевой коннектор 8P8C CAT.5E.',
			image: 'https://images.satu.kz/113613494_w640_h640_rjc45-konnektor.jpg',
			inStock: true,
			description:
				'Коннектор сетевой 8P8C Cat.5E. Надежные, усиленные зубья контактов для надежного крепления провода, улучшенные фиксаторы обжима кабеля, экран от наводок, металлический',
			price: 100
		},
		{
			path: '/products/rjc45',
			name: 'RJC45 - сетевой коннектор 8P8C CAT.5E.',
			image: 'https://images.satu.kz/113613494_w640_h640_rjc45-konnektor.jpg',
			inStock: true,
			description:
				'Коннектор сетевой 8P8C Cat.5E. Надежные, усиленные зубья контактов для надежного крепления провода, улучшенные фиксаторы обжима кабеля, экран от наводок, металлический',
			price: 100
		},
		{
			path: '/products/rjc45',
			name: 'RJC45 - сетевой коннектор 8P8C CAT.5E.',
			image: 'https://images.satu.kz/113613494_w640_h640_rjc45-konnektor.jpg',
			inStock: true,
			description:
				'Коннектор сетевой 8P8C Cat.5E. Надежные, усиленные зубья контактов для надежного крепления провода, улучшенные фиксаторы обжима кабеля, экран от наводок, металлический',
			price: 100
		},
		{
			path: '/products/rjc45',
			name: 'RJC45 - сетевой коннектор 8P8C CAT.5E.',
			image: 'https://images.satu.kz/113613494_w640_h640_rjc45-konnektor.jpg',
			inStock: true,
			description:
				'Коннектор сетевой 8P8C Cat.5E. Надежные, усиленные зубья контактов для надежного крепления провода, улучшенные фиксаторы обжима кабеля, экран от наводок, металлический',
			price: 100
		},
		{
			path: '/products/rjc45',
			name: 'RJC45 - сетевой коннектор 8P8C CAT.5E.',
			image: 'https://images.satu.kz/113613494_w640_h640_rjc45-konnektor.jpg',
			inStock: true,
			description:
				'Коннектор сетевой 8P8C Cat.5E. Надежные, усиленные зубья контактов для надежного крепления провода, улучшенные фиксаторы обжима кабеля, экран от наводок, металлический',
			price: 100
		},
		{
			path: '/products/rjc45',
			name: 'RJC45 - сетевой коннектор 8P8C CAT.5E.',
			image: 'https://images.satu.kz/113613494_w640_h640_rjc45-konnektor.jpg',
			inStock: true,
			description:
				'Коннектор сетевой 8P8C Cat.5E. Надежные, усиленные зубья контактов для надежного крепления провода, улучшенные фиксаторы обжима кабеля, экран от наводок, металлический',
			price: 100
		}
	];

	return {
		props: {
			menu,
			productsData
		}
	};
};
