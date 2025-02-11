import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { TeamProvider } from '../context/TeamContext';
import Head from 'next/head';
import '../styles/globals.css';
import { ChatProvider } from '@/context/ChatContext';
import Chat from './chat';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Connect | Student Collaboration Platform</title>
      </Head>
      <TeamProvider>
        <ChatProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Chat />
        </ChatProvider>
      </TeamProvider>
    </>
  );
}

export default MyApp; 