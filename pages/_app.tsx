import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from "../redux/store/store";
import { appWithTranslation } from 'next-i18next';
import {SnackbarProvider} from "notistack";

function SafeHydrate({ children }: any) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <SafeHydrate>
          <Component {...pageProps} />
        </SafeHydrate>
      </Provider>
    </SnackbarProvider>
      )
}

export default appWithTranslation(MyApp);
