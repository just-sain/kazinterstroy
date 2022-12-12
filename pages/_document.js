import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

// every page must have:
// <title>PAGE TITLE</title>
// <meta name='description' content="homepage" />

export default class Document extends NextDocument {
	render() {
		return (
			<Html lang='ru'>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
