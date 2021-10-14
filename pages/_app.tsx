import '/Users/rickysaka/Desktop/Work_Desk/SchoolX/styles/globals.scss'
import { FC } from 'react';
import type { AppProps } from 'next/app';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default MyApp