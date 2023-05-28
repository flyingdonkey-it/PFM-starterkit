import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { AccountItemDetail } from './AccountItemDetail';
import { AccountType } from './AccountType';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useAccountVerificationForm } from '@/components/AccountVerificationForm/AccountVerificationFormProvider';

const accountTypes = [
  { type: 'savings', title: 'Savings accounts' },
  { type: 'credit-card', title: 'Credit cards' },
];

export const AccountPage = () => {
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState({});
  const [accountsData, setAccountsData] = useState(new Map());
  const [institutionData, setInstitutionsData] = useState([]);

  const { resetForNewAccount } = useAccountVerificationForm();

  //Redirecting to account verification for adding new account
  const onAddAccountClick = () => {
    resetForNewAccount();
  };

  //Getting accounts data of user with matching institutions
  const getData = () => {
    setLoading(true);

    const userId = sessionStorage.getItem('userId');

    //Get all accounts of user
    axios
      .get(`/api/accounts`, { params: { userId } })
      .then(response => {
        const groupBy = (list, keyGetter) => {
          const map = new Map();
          list.forEach(item => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
              map.set(key, [item]);
            } else {
              collection.push(item);
            }
          });
          return map;
        };

        setAccountsData(groupBy(response.data, item => item.class.type));

        //Get all institutions
        axios
          .get('/api/institutions')
          .then(res => {
            setInstitutionsData(res.data);
            setLoading(false);
          })
          .catch(error => {
            console.warn('error', error);
            setInstitutionsData([]);
            setLoading(false);
          });
      })
      .catch(error => {
        console.warn(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  //Showing account detail page
  const onAccountItemClick = e => {
    setShowDetail(true);
    setSelectedAccount({ accountDetail: e.accountDetail, accountItem: e.item, accountsType: e.accountsType });
  };

  //Closing account detail page
  const onCloseAccountDetailClick = () => {
    setSelectedAccount({});
    setShowDetail(false);
  };

  return (
    <div className={`sm:min-w-max ${!showDetail && 'xl:pl-80 xl:pr-80'}`}>
      {/* Show account list if not any account selected */}
      {!showDetail && (
        <>
          <div className="flex justify-between mt-8 ml-6 mr-6 sm:mt-16 items-center">
            <div className="flex">
              <div className="hidden mr-4 sm:block">
                <img className="hidden mr-3 w-7 h-7 sm:block" src="/wallet.svg" alt="My accounts" />
              </div>
              <div className="font-semibold text-2xl2 text-blue">My Accounts</div>
            </div>
            <div className="flex items-center justify-center sm:hidden">
              <img className="w-12 h-12" src="/add-account.svg" alt="Add Account" onClick={onAddAccountClick} />
            </div>
          </div>
          <div className="min-h-screen mt-6 bg-[#FCFCFC]">
            {loading ? (
              <div className="flex justify-center">
                <div className="mt-16">
                  {loading} {loading && <LoadingSpinner />}
                </div>
              </div>
            ) : (
              <>
                {/* List all accounts of user */}
                {accountTypes.map((accountType, i) => {
                  return (
                    <AccountType
                      key={'account-type-' + i}
                      accounts={accountsData.get(accountType.type)}
                      institutions={institutionData}
                      accountsType={accountType.title}
                      onAccountItemClick={onAccountItemClick}
                      onCloseAccountDetailClick={onCloseAccountDetailClick}
                      loading={loading}
                      showDetail={showDetail}
                    />
                  );
                })}
              </>
            )}
          </div>
        </>
      )}
      {/* Show account detail if any account selected */}
      {showDetail && <AccountItemDetail onClose={onCloseAccountDetailClick} selectedAccount={selectedAccount} />}
    </div>
  );
};
