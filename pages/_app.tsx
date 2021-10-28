import '/styles/globals.scss'
import { FC } from 'react';
import type { AppProps } from 'next/app';
import { theme } from 'theme';
import { ThemeProvider } from '@material-ui/styles';
import { Layout } from 'components';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useRouter } from 'next/router'

import { StateProvider } from 'state';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  
  const router = useRouter()  

  const getContent = () => {
    if (router.pathname === '/')
      return <Component {...pageProps} />;

    return (
      <Layout>
        <Component {...pageProps} />{" "}
      </Layout>
    );
  };
  return (
    <StateProvider>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          </MuiPickersUtilsProvider>
      </ThemeProvider>
    </StateProvider>
  )
}

export default MyApp
