import '/styles/globals.scss'
import { FC } from 'react';
import type { AppProps } from 'next/app';
import { theme } from 'theme';
import { ThemeProvider } from '@material-ui/styles';
import Layout from 'components/Layout';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        </MuiPickersUtilsProvider>
    </ThemeProvider>
  )
}

export default MyApp