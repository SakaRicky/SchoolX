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
      return (
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      )

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
    );
  };
  return getContent() 
}

export default MyApp
