import { ToastNotification } from '@/components/ToastNotification';
import { AccountVerificationFormProvider } from '@/components/AccountVerificationForm';
import '../styles.css';
import StoreProvider, { wrapper } from '@/store/StoreProvider';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <StoreProvider>
        <AccountVerificationFormProvider>
          <Component {...pageProps} />
        </AccountVerificationFormProvider>
      </StoreProvider>

      <ToastNotification />
    </>
  );
}

export default wrapper.withRedux(MyApp);
