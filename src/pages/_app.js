import StoreProvider from '../lib/store';
import globalStyles from '../lib/styles';
// components
import { Global } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import Layout from '../components/layout';

/*
	! every page must have meta tags! such as:
	description
	keywords
	* meta tags for open graph:
	og:title
	og:description
	og:image
	* meta tags for twitter:
	twitter:title
	twitter:description
	twitter:image
*/

// variants of animations when change page
const variants = {
	initialState: { opacity: 0, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
	animateState: { opacity: 1, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
	exitState: { clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)' },
};

// every page must to have props like => contactData, cartData, catalogData, menuData

const App = ({ Component, pageProps, router }) => {
	return (
		<>
			<Head>
				<meta charSet='utf-8' />
				<meta name='robots' content='all' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />

				<meta name='author' content='KazInterStroy' />
				<meta name='copyright' content='KazInterStroy' />
				<meta name='address' content='улица Масанчи 78 офис 400' />
				<meta name='description' content='KazInterStroy - Интернет магазин' />
				<meta name='keywords' content='kazinterstroy, интернет магазин, kazstroy, казинтерстрой, казстрой' />
				<meta name='msapplication-TileColor' content='#228ada' />
				<meta name='theme-color' content='#fbfefd' />

				<meta property='og:locale' content='ru_RU' />
				<meta property='og:type' content='article' />
				<meta property='og:title' content='KazInterStroy' />
				<meta property='og:site_name' content='KazInterStroy' />
				<meta property='og:description' content='KazInterStroy - Интернет магазин' />
				<meta property='og:image' content='/logo.png' />
				<meta property='og:url' content={process.env.NEXT_PUBLIC_SELF_DOMAIN + router.asPath} />

				<meta name='twitter:card' content='summary' />
				<meta name='twitter:site' content='KazInterStroy' />
				<meta name='twitter:title' content='KazInterStroy' />
				<meta name='twitter:description' content='KazInterStroy - Интернет магазин' />
				<meta name='twitter:image' content='/logo.png' />

				<title>KazInterStroy - Интернет магазин</title>
			</Head>
			<StoreProvider contactData={pageProps.contactData} catalogData={pageProps.catalogData} menuData={pageProps.menuData}>
				<AnimatePresence mode='wait'>
					<motion.div
						key={router.route}
						initial='initialState'
						animate='animateState'
						exit='exitState'
						transition={{
							duration: 0.75,
						}}
						variants={variants}>
						<Global styles={globalStyles} />
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</motion.div>
				</AnimatePresence>
			</StoreProvider>
		</>
	);
};

export default App;
