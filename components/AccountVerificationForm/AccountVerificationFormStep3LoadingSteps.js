import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AccountVerificationFormResumeInBackgroundModal } from './AccountVerificationFormResumeInBackgroundModal';
import { useAccountVerificationForm } from './AccountVerificationFormProvider';
import { useTernaryState } from '@/utils/useTernaryState';
import { fetchUserTransactions, userTransactionsLoading } from '@/store/actions/userTransactionsActions';
import { Button } from '@/components/Button';
import { CircularProgressBar } from '@/components/CircularProgressBar';

export const AccountVerificationFormStep3LoadingSteps = () => {
  const [isResumeModalOpen, openResumeModal, closeResumeModal] = useTernaryState(false);
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [progressInterval, setProgressInterval] = useState(null);
  const [transactionLoadingDispatched, setTransactionLoadingDispatched] = useState(false);

  useDispatch(userTransactionsLoading());
  const { isCompleted, transactionsError } = useSelector(state => state.userTransactions);
  const { basiqConnection, finish } = useAccountVerificationForm();
  const { error, progress, completed, stepNameInProgress, reset, setJobId } = basiqConnection;

  const { data } = useAccountsData({
    userId: sessionStorage.getItem('userId'),
  });

  let userTransactionsRequestSuccessful = isCompleted && transactionLoadingDispatched;

  let userTransactionsRequestError = transactionsError && transactionLoadingDispatched;

  const errorOrNoData = error || !data || data.length === 0;

  const displayError = (error && errorOrNoData) || userTransactionsRequestError;

  const submit = async () => {
    if (!errorOrNoData) {
      finish();
    }
  };

  const updateProgressBarValue = () => {
    let value = (progress + (userTransactionsRequestSuccessful ? 100 : 0)) / 2;
    if (isNaN(value)) value = 0;
    if (value > 100) value = 100;
    if (value === 100) setProgressBarValue(value);
  };

  //this is to provide a more reactive interface for the users
  const incrementProgressBarValueGradually = () => {
    let interval = setInterval(() => {
      setProgressBarValue(currentValue => currentValue + Math.floor(Math.random() * 4));
    }, 250);
    setProgressInterval(interval);
  };

  useEffect(() => {
    if (progressBarValue > 90) clearInterval(progressInterval);
  }, [progressInterval, progressBarValue]);

  useEffect(() => {
    const newJobId = new URLSearchParams(window.location.search).get('jobId');
    setJobId(newJobId);
    incrementProgressBarValueGradually();
  }, []);

  useEffect(() => {
    if (isCompleted === false) setTransactionLoadingDispatched(true);
    updateProgressBarValue();
  }, [progress, isCompleted]);

  useEffect(() => {
    if (displayError) setProgressBarValue(100);
  }, [displayError]);

  return (
    <div className="flex flex-col space-y-10 sm:space-y-12 min-w-[22rem]">
      <div className="flex flex-col items-center text-center space-y-8">
        <CircularProgressBar value={progressBarValue} error={displayError} />
        {error ? (
          <div className="w-full space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{error?.name}</h2>
              <p className="text-sm sm:text-base text-neutral-muted-darker">{error?.message}</p>
            </div>
            <Button block onClick={reset}>
              Try again
            </Button>
          </div>
        ) : completed && userTransactionsRequestSuccessful && !displayError ? (
          <div className="w-full space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">Connected 🎉</h3>
            </div>
            <Button block onClick={submit}>
              Continue
            </Button>
          </div>
        ) : (
          <div className="w-full space-y-8">
            <div className="space-y-3 sm:space-y-4">
              {displayError ? (
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Something went wrong, please try again.
                </h2>
              ) : (
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  {STEP_NAME_MAP[stepNameInProgress] ?? STEP_NAME_MAP['retrieve-transactions']}
                </h2>
              )}
            </div>
            <Button block variant="subtle" onClick={openResumeModal}>
              Resume in background
            </Button>
          </div>
        )}
      </div>
      <AccountVerificationFormResumeInBackgroundModal isOpen={isResumeModalOpen} onClose={closeResumeModal} />
    </div>
  );
};
const useAccountsData = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  const { updateAccountVerificationFormState } = useAccountVerificationForm();

  let dispatch = useDispatch();
  const fetchAccounts = useCallback(() => {
    axios
      .get('/api/accounts', { params: { userId } })
      .then(res => {
        let account = res.data.find(account => !account.disabled);
        updateAccountVerificationFormState({ account });
        sessionStorage.setItem('currentAccountId', account.id);

        dispatch(fetchUserTransactions(userId));

        setData(res.data);
        setError(undefined);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const refetch = useCallback(() => {
    setLoading(true);
    fetchAccounts();
  }, [fetchAccounts]);

  return { data, loading, error, refetch };
};

const STEP_NAME_MAP = {
  'verify-credentials': 'Verifying credentials...',
  'retrieve-accounts': 'Retrieving accounts...',
  'retrieve-transactions': 'Retrieving transaction details...',
};
