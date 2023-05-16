import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TransactionItem } from './TransactionItem';
import { TransactionItemDetail } from './TransactionItemDetail';
import { Calendar } from '@/components/Calendar';
import { useToggleState } from '@/utils/useToggleState';

export const TransactionPage = ({
  inTransactionsPage,
  managePages,
  manageDetailPages,
  dateGroupedTransactions = [],
}) => {
  const [showDetail, setShowDetail] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [showCalendar, setShowCalendar] = useToggleState(false);
  const [currentAccount, setCurrentAccount] = useState({});

  const getCurrentAccount = () => {
    const userId = sessionStorage.getItem('userId');
    const currentAccountId = sessionStorage.getItem('currentAccountId');

    axios
      .get(`/api/get-account`, { params: { userId, accountId: currentAccountId } })
      .then(response => {
        setCurrentAccount(response.data);
      })
      .catch(error => {
        console.warn(error);
        setCurrentAccount({});
      });
  };

  //Open transaction detail
  const onTransactionItemClick = e => {
    if (!inTransactionsPage) {
      manageDetailPages(true, false, true);
    }

    setShowDetail(true);
    setSelectedTransaction(e.transactionDetail);
  };

  //Close transaction detail
  const onCloseTransactionDetailClick = () => {
    if (!inTransactionsPage) {
      manageDetailPages(false, false, false);
    }

    setSelectedTransaction({});
    setShowDetail(false);
  };

  //Redirect to transactions page
  const onSeeAllClick = () => {
    managePages(4, 'Upload');
  };

  //When any date clicked on calendar show transaction detail
  const onCalendarItemClick = date => {
    setShowDetail(true);
    const selectedDate = dateGroupedTransactions.find(item => item[0] === date);
    selectedDate.map(item => {
      setSelectedTransaction(item[0]);
    });
  };

  useEffect(() => {
    getCurrentAccount();
  }, []);

  return (
    <>
      {/* When any transaction is not selected */}
      {!showDetail && (
        <>
          <div className="flex justify-between ml-6 mr-6 sm:mt-12 sm:ml-52 sm:mr-80">
            <div className="flex">
              <div className="hidden mr-4 sm:block">
                <img className="w-6 h-6" src="/swap.svg" alt="Swap" />
              </div>
              <div
                className={`font-semibold text-blue sm:text-2xl2 ${inTransactionsPage ? 'text-2xl2' : 'text-base2'}`}
              >
                Transactions
              </div>
            </div>
            <div className="flex items-center justify-center pr-4 lg:min-w-max sm:min-w-full">
              {inTransactionsPage ? (
                <div className="h-14">
                  <img className="w-7 h-7" src="/calendar.svg" alt="Calendar" onClick={setShowCalendar} />
                  {/* TRANSACTIONS CALENDAR */}
                  {showCalendar && (
                    <Calendar
                      data={dateGroupedTransactions || []}
                      open={showCalendar}
                      onCalendarItemClick={onCalendarItemClick}
                    />
                  )}
                </div>
              ) : (
                <p className="font-semibold underline text-sm2 text-blue bg-[#FEFEFE]" onClick={onSeeAllClick}>
                  See all
                </p>
              )}
            </div>
          </div>
          <div className="sm:ml-52 sm:mr-80 bg-[#FCFCFC] sm:min-w-max">
            {dateGroupedTransactions.length > 0 ? (
              dateGroupedTransactions.map((groupedItem, gIndex) => {
                return (
                  <div key={'grouped-transaction-' + gIndex}>
                    <div className="pt-5 pb-4 font-semibold text-sm2 text-blue bg-[#FEFEFE]">
                      <div className="ml-8">
                        {/* TRANSACTION DATE */}
                        {groupedItem[0]}
                      </div>
                    </div>
                    {/* TRANSACTION LIST ON DATE */}
                    {groupedItem[1].map((transaction, tIndex) => {
                      return (
                        <div
                          key={'transaction-item-' + gIndex + '-' + tIndex}
                          className="pt-2 pb-2"
                          onClick={e => onTransactionItemClick({ transactionDetail: transaction, ...e })}
                        >
                          <TransactionItem item={transaction} />
                        </div>
                      );
                    })}
                  </div>
                );
              })
            ) : (
              <div className="flex justify-center">
                <div className="mt-16">Transactions not Found</div>
              </div>
            )}
          </div>
        </>
      )}
      {/* When any transaction is selected */}
      {showDetail && (
        <TransactionItemDetail
          currentAccount={currentAccount}
          detail={selectedTransaction}
          closeTransactionDetailClick={onCloseTransactionDetailClick}
        />
      )}
    </>
  );
};
