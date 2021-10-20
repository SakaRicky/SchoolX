import '/styles/globals.scss'
import { FC } from 'react';
import type { AppProps } from 'next/app';
import { theme } from 'theme';
import { ThemeProvider } from '@material-ui/styles';
import Layout from 'components/Layout';


const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp