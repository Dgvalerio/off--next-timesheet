/* eslint-disable @next/next/no-document-import-in-page, @next/next/no-title-in-document-head, @typescript-eslint/explicit-module-boundary-types */
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          // eslint-disable-next-line react/display-name
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="pt-br">
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="fav.png" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <meta name="theme-color" content="#303030" />
          <meta name="description" content="Next Timesheet" />
          <link rel="apple-touch-icon" href="fav.png" />
          <title>Next TimeSheet</title>
          <style>
            {/* eslint-disable-next-line */}
            @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
