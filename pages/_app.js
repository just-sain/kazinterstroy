import Layout from '../components/layout';
import globalStyles from '../helpers/styles';
// components
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Global } from '@emotion/react';
import { AppContextProvider } from '../context/app.context';

const variants = {
	initialState: { opacity: 0, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
	animateState: { opacity: 1, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
	exitState: { clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)' }
};

const App = ({ Component, pageProps, router }) => {
	return (
		<AppContextProvider>
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
						<meta name='viewport' content='width=device-width, initial-scale=1' />
						<meta property='og:site_name' content='KazInterStroy' />
						<meta name='og:title' content='KazInterStroy' />
						<meta property='og:type' content='website' />
						<meta property='og:image' content='/logo.png' />
						<meta name='og:url' content={process.env.NEXT_PUBLIC_SELF_DOMAIN + router.asPath} />
						<meta name='og:locale' content='ru' />

						<link rel='apple-touch-icon' href='/favicon.ico' />
						<link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />

						<title>KazInterStroy - Интернет магазин</title>
					</Head>
					<Global styles={globalStyles} />
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</motion.div>
			</AnimatePresence>
		</AppContextProvider>
	);
};

export default App;
