import React, { useState, useEffect } from 'react';
import { formatCurrency } from '@/utils/formatCurrency';

export function AccountItem({ item, institutions, onAccountItemClick, showDetail, accountsType }) {
  const [selectedAccount, setSelectedAccount] = useState([]);

  //Set related institution info
  function setInstitution() {
    setSelectedAccount(institutions.filter(x => x.id === item.institution));
  }

  useEffect(() => {
    setInstitution();
  }, [item]);

  return (
    <>
      {/* Show if not any account selected */}
      {!showDetail && (
        <>
          {selectedAccount.map((account, index) => (
            <div
              className="flex pt-1 pb-1 mb-2 sm:pt-3 sm:pb-3 sm:bg-[#F5F7F8]"
              key={index}
              onClick={e => onAccountItemClick({ accountDetail: account, item, accountsType, ...e })}
            >
              <div key={index} className="flex items-center justify-between w-full px-7">
                <div className="flex items-center justify-center rounded-full sm:pl-6 sm:pr-6">
                  <img
                    className="w-10 h-10 rounded-full sm:w-14 sm:h-14"
                    src={account.logo.links.square}
                    alt={account.name}
                  />
                  <div className="ml-3 font-semibold text-sm2 sm:text-2xl2 sm:font-medium">{account.name}</div>
                </div>
                <div>
                  <div className="font-semibold text-center text-sm3 sm:text-2xl2 text-primary-accent">
                    {formatCurrency(item.availableFunds)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
