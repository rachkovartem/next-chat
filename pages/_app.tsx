import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from "../redux/store/store";
import { appWithTranslation } from 'next-i18next';

function SafeHydrate({ children }: any) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SafeHydrate>
        <Component {...pageProps} />
      </SafeHydrate>
    </Provider>)
}

export default appWithTranslation(MyApp);
