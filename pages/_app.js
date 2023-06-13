import { ToastNotification } from '@/components/ToastNotification';
import { AccountVerificationFormProvider } from '@/components/AccountVerificationForm';
import TransactionsDataContextProvider from '../store/context/transactionContext';
import '../styles.css'; 
import dynamic from 'next/dynamic';

function MyApp({ Component, pageProps }) {
  return (
    <> 
        <AccountVerificationFormProvider>
          <TransactionsDataContextProvider>
          <Component {...pageProps} />
          </TransactionsDataContextProvider>
        </AccountVerificationFormProvider> 

      <ToastNotification />
    </>
  );
}
export default dynamic (() => Promise.resolve(MyApp), {ssr: false})