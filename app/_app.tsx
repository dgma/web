import type { AppProps } from 'next/app';

import { Amplify, API } from "aws-amplify";

import awsconfig from "../aws-exports";

Amplify.configure({ ...awsconfig, ssr: true });
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
