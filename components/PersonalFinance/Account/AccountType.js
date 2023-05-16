import React from 'react';
import { AccountItem } from './AccountItem';

export const AccountType = ({ loading, accounts, institutions, accountsType, onAccountItemClick, showDetail }) => {
  return (
    <div className="flex-col mb-3">
      <div className="flex justify-start mb-2 bg-primary sm:pl-7 pr-7">
        <div className="mt-3 mr-6 font-semibold text-center sm:mt-6 ml-7 text-[12px] sm:text-2xl2 text-primary-bold">
          {accountsType}
        </div>
      </div>
      {/* Each account is represented by a row */}
      {!loading && accounts && accounts.length > 0
        ? accounts.map((item, index) => (
            <AccountItem
              item={item}
              key={index}
              institutions={institutions}
              onAccountItemClick={onAccountItemClick}
              showDetail={showDetail}
              accountsType={accountsType}
            />
          ))
        : !loading && (
            <div className="flex items-center justify-start font-semibold text-sm2 sm:text-2xl2 ml-7">{`You do not have any ${accountsType}.`}</div>
          )}
    </div>
  );
};
