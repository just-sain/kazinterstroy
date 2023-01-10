import Layout from '../components/layout';
import globalStyles from '../utils/styles';
import StoreProvider from '../utils/store';
// components
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Global } from '@emotion/react';

const variants = {
	initialState: { opacity: 0, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
	animateState: { opacity: 1, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
	exitState: { clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)' }
};

// ! every page must have meta tags! such as:
// description
// keywords
// * meta tags for open graph:
// og:title
// og:description
// og:image
// * meta tags for twitter:
// twitter:title
// twitter:description
// twitter:image

const App = ({ Component, pageProps, router }) => {
	return (
		<StoreProvider>
			<AnimatePresence mode='wait'>
				<motion.div
					key={router.route}
					initial='initialState'
					animate='animateState'
					exit='exitState'
					transition={{
						duration: 0.75
					}}
					variants={variants}>
					<Head>
						<meta charset='utf-8' />
						<meta name='robots' content='all' />
						<meta
							name='viewport'
							content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
						/>

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

						<link rel='icon' type='image/x-icon' href='/favicon.ico' />
						<link rel='apple-touch-icon' type='image/x-icon' href='/favicon.ico' />
						<link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />

						<link rel='preconnect' href='https://fonts.googleapis.com' />
						<link rel='preconnect' href='https://fonts.gstatic.com' />
						<link href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap' />

						<title>KazInterStroy - Интернет магазин</title>
					</Head>
					<Global styles={globalStyles} />
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</motion.div>
			</AnimatePresence>
		</StoreProvider>
	);
};

export default App;
