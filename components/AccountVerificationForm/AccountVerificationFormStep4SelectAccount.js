import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { RadioGroup } from '@headlessui/react';
import { useAccountVerificationForm } from './AccountVerificationFormProvider';
import { StepHeading } from './StepHeading';
import { StepDescription } from './StepDescription';
import { Button } from '@/components/Button';
import { ErrorScene } from '@/components/ErrorScene';
import { ErrorMessage } from '@/components/ErrorMessage';
import { formatCurrency } from '@/utils/formatCurrency';
import { maskAccountNumber } from '@/utils/maskAccountNumber';
import useSessionStorage from '@/components/store/hooks/useSessionStorage';

export const AccountVerificationFormStep4SelectAccount = () => {
  const { goForward, updateAccountVerificationFormState, goToConsent, getUserConsent } = useAccountVerificationForm();
  const s_storage = useSessionStorage();
  const userId = s_storage.getItem('userId');

  const [selectedAccount, setSelectedAccount] = useState();
  const [validationError, setValidationError] = useState(false);

  const { data, error, loading } = useAccountsData({
    userId: userId,
  });

  const errorOrNoData = error || !data || data.length === 0;

  const handleSubmit = e => {
    e.preventDefault();
    if (selectedAccount) {
      updateAccountVerificationFormState({ selectedAccount });
      goForward();
    } else {
      setValidationError(true);
      window.scrollTo(0, 0);
    }
  };

  const retryConnection = async () => {
    try {
      await getUserConsent(userId);
      goToConsent('connect');
    } catch {
      goToConsent();
    }
  };

  if (!userId) return null;

  return (
    <div className="flex flex-col flex-grow space-y-8 sm:space-y-12">
      {/* STEP LOGO */}
      {/* To help the user keep context of what product they're using, */}
      {/* and what bank they're about to connect to. */}

      <div className="flex flex-col space-y-8">
        {/* STEP HEADING */}
        {/* PRODUCT-COPY: A short as possible heading to help the user quickly recognise the task at hand. */}
        <div className="space-y-3 sm:space-y-4">
          <StepHeading>
            Select your daily <br />
            spending account
          </StepHeading>

          {/* STEP DESCRIPTION */}
          {/* PRODUCT-COPY: Depending on what account features your product supports. */}
          {(loading || !errorOrNoData) && (
            <StepDescription>
              Please select an account that will allow direct debits. Many banks only allow withdrawals from transaction
              accounts.
            </StepDescription>
          )}
        </div>

        {/* ACCOUNTS RADIO GROUP */}
        {loading ? (
          <AccountsLoadingSkeleton />
        ) : errorOrNoData ? (
          <ErrorScene
            title="Failed to load accounts"
            message="There was an error fetching your accounts, please retry the connection."
            actionOnClick={() => retryConnection()}
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {validationError && (
              <ErrorMessage message="Please select an account that allows direct debits, or connect to a different bank." />
            )}
            <RadioGroup value={selectedAccount} onChange={setSelectedAccount}>
              <RadioGroup.Label className="sr-only">Select account</RadioGroup.Label>
              <div className="space-y-3">
                {data.map((acc, idx) => {
                  return (
                    <RadioGroup.Option
                      key={idx}
                      value={acc}
                      disabled={acc.disabled}
                      className={`rounded-lg outline-none ${
                        !acc.disabled &&
                        'focus:border-primary-bold focus:ring-2 focus:ring-primary-bold focus:ring-opacity-30 ring-offset-1 ring-offset-transparent'
                      }`}
                      data-cy={`account-${acc.accountNo}`}
                    >
                      {({ checked }) => (
                        <div
                          className={`relative rounded-lg p-3 flex  ${
                            acc.disabled
                              ? 'bg-neutral-subtle-darker cursor-not-allowed opacity-50'
                              : 'bg-white cursor-pointer border border-neutral-dim active:bg-primary-subtle-darker transition-colors'
                          } ${checked && 'bg-primary-subtle border-primary-bold'}`}
                        >
                          <div className="flex flex-grow space-x-3">
                            {acc.disabled ? (
                              // Icon: lock-closed (outline)
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                              </svg>
                            ) : (
                              // Radio circle
                              <span
                                className={`flex items-center justify-center w-6 h-6 rounded-full bg-white border-2  ${
                                  checked ? 'border-primary-bold' : 'border-neutral-dim-darker'
                                }`}
                              >
                                {checked && <span className={`w-2 h-2 rounded-full bg-primary-bold`} />}
                              </span>
                            )}

                            <div className="flex-grow space-y-2">
                              <RadioGroup.Label as="p" className="font-medium">
                                {acc.name}
                              </RadioGroup.Label>
                              <span className="text-xs text-neutral-muted-darker">
                                {maskAccountNumber(acc.accountNo)}
                              </span>
                              <dl className="text-xs grid grid-cols-2 gap-y-0.5 text-neutral-muted-darker">
                                <dt className="flex-1">Available:</dt>
                                <dd className="font-medium text-right text-black">
                                  {formatCurrency(acc.availableFunds)}
                                </dd>
                                <dt className="flex-1">Balance:</dt>
                                <dd className="text-right">{formatCurrency(acc.balance)}</dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                      )}
                    </RadioGroup.Option>
                  );
                })}
              </div>
            </RadioGroup>
            {/* Actions */}
            <div className="space-y-2">
              <Button type="submit" block>
                Finish
              </Button>
              <Button type="button" variant="subtle" block onClick={() => goToConsent('connect')}>
                Connect a different account
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// RETRIEVE ACCOUNTS
// Custom react hook for managing our fetch request to retrieves a list of accounts for the current user
// The code for this API route can be found in `pages/api/accounts`
const useAccountsData = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  const fetchAccounts = useCallback(() => {
    axios
      .get('/api/accounts', { params: { userId } })
      .then(res => {
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

// ACCOUNTS LOADING SKELETON
// Keeps the user visually occupied whilst loading,
// making the experience seem quicker than it might be.
const skeletonItems = [...new Array(5).keys()];
const AccountsLoadingSkeleton = () => {
  return (
    <div className="space-y-3">
      {skeletonItems.map(i => (
        <div key={i} className="flex p-3 bg-white border rounded-lg border-neutral-subtle-darker animate-pulse">
          <div className="flex space-x-3">
            <span className="w-6 h-6 border-2 rounded-full border-neutral-subtle-darker" />
            <div className="flex-grow space-y-2">
              <div className="w-48 h-6 rounded bg-neutral-subtle-darker" />
              <div className="w-32 h-4 rounded bg-neutral-subtle-darker" />
              <div className="grid gap-y-0.5">
                <div className="h-4" />
                <div className="h-4" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
