import Layout from '../components/layout';
import globalStyles from '../helpers/styles';
// components
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Global } from '@emotion/react';

const variants = {
	initialState: { opacity: 0, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
	animateState: { opacity: 1, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
	exitState: { clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)' }
};

const App = ({ Component, pageProps, router }) => {
	return (
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
					{/* <meta name='author' content='' />
					<meta name='author' content='' />

					<meta name='twitter:title' content='' />
					<meta name='twitter:card' content='summary_large_image' />
					<meta name='twitter:site' content='' />
					<meta name='twitter:creator' content='' />
					<meta name='twitter:image' content='' />

					<meta property='og:site_name' content='' />
					<meta name='og:title' content='' />
					<meta property='og:type' content='website' />
					<meta property='og:image' content='' />
					<meta name='og:url' content={process.env.NEXT_PUBLIC_SELF_DOMAIN + router.asPath} /> */}
					<meta name='og:locale' content='ru_RU' />

					<link rel='apple-touch-icon' href='/favicon.ico' />
					<link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
				</Head>
				<Global styles={globalStyles} />
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</motion.div>
		</AnimatePresence>
	);
};

export default App;
