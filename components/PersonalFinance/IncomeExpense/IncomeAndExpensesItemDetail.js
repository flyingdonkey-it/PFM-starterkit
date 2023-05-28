import React, { useState, useEffect } from 'react';
import { formatCurrency } from '@/utils/formatCurrency';

export const IncomeExpenseItemDetail = ({ item }) => {
  const [randomInt, setRandomInt] = useState(0);

  useEffect(() => {
    setRandomInt(parseInt((Math.random() * 100) % 4));
  });

  return (
    <div className="flex flex-col border-b-2 border-solid border-[#E0EAFF]">
      <div className="flex items-center justify-between p-4">
        <div>
          <img
            className="w-10 h-10 rounded-xl sm:w-14 sm:h-14"
            src={`/merchant-${randomInt}.svg`}
            alt="Income Expense"
          />
        </div>
        <div className="flex items-center">
          <div className="flex flex-col items-end mr-2">
            <div className="font-bold sm:text-2xl2 text-primary-bold text-base2">{formatCurrency(item.amount)}</div>
            <div className="text-primary-bold sm:text-xl text-base2">
              {item.description.length > 28 ? item.description.slice(0, 25) + '...' : item.description}
            </div>
          </div>
          <img className="w-6 h-8" src={'/dots-menu.svg'} alt="Dots" />
        </div>
      </div>
    </div>
  );
};
