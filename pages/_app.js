import Layout from '../components/layout';
import globalStyles from '../helpers/styles';
// components
import Head from 'next/head';
import { Global } from '@emotion/react';
import { AppContextProvider } from '../components/context';

const App = ({ Component, pageProps }) => {
	return (
		<>
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
			<AppContextProvider menu={pageProps.menu}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</AppContextProvider>
		</>
	);
};

export default App;
