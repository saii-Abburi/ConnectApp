import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { TeamProvider } from '../context/TeamContext';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Connect | Student Collaboration Platform</title>
      </Head>
      <TeamProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TeamProvider>
    </>
  );
}

export default MyApp; 