import '/styles/globals.scss'
import { FC } from 'react';
import type { AppProps } from 'next/app';
import { theme } from 'theme';
import { ThemeProvider } from '@material-ui/styles';
import Layout from 'components/Layout';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useRouter } from 'next/router'


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
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {getContent()}
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  )
}

export default MyApp