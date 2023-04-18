import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

// every page must have:
// <title>PAGE TITLE</title>
// <meta name='description' content="homepage" />

export default class Document extends NextDocument {
	render() {
		return (
			<Html lang='ru'>
				<Head>
					<link rel='icon' type='image/x-icon' href='/favicon.ico' />
					<link rel='apple-touch-icon' type='image/x-icon' href='/favicon.ico' />
					<link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />

					<link rel='preconnect' href='https://fonts.googleapis.com' />
					<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
					<link
						href='https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap'
						rel='stylesheet'
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
