// components
import Head from 'next/head';
import { Catalog } from '../../components/catalog';

const Category = () => {
	return (
		<>
			<Head>
				<meta name='description' content='Рассмотрите наш каталог и выберите себе нужный товар / KazInterStroy' />
				<meta
					name='keywords'
					content='kazinterstroy, интернет магазин, kazstroy, казинтерстрой, казстрой, каталог, меню, товары'
				/>

				<meta property='og:title' content='Каталог / KazInterStroy' />
				<meta
					property='og:description'
					content='Рассмотрите наш каталог и выберите себе нужный товар / KazInterStroy'
				/>

				<meta name='twitter:title' content='Каталог / KazInterStroy' />
				<meta
					name='twitter:description'
					content='Рассмотрите наш каталог и выберите себе нужный товар  / KazInterStroy'
				/>

				<title>Каталог / KazInterStroy</title>
			</Head>
			<Catalog />
		</>
	);
};

export default Category;
