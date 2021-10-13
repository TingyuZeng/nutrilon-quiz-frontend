import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <script id="adobe-font" />
        </Head>
        <body>
          <div data-notification />
          <div data-fixed />

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
