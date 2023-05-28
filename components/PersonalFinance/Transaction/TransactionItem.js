import { useState, useEffect } from 'react';
import { formatCurrency } from '@/utils/formatCurrency';

export const TransactionItem = ({ item }) => {
  const [randomInt, setRandomInt] = useState(0);

  useEffect(() => {
    setRandomInt(parseInt((Math.random() * 100) % 4));
  });

  return (
    <div className="sm:bg-[#F5F7F8] bg-[#FEFEFE] sm:p-4">
      <div className="flex justify-between ml-6 mr-6">
        <div className="flex">
          <div>
            <img className="w-9 h-9" src={`/merchant-${randomInt}.svg`} alt="Merchant" />
          </div>
          <div className="ml-2 text-sm2 sm:text-sm3">
            <div className="font-medium">
              {item.description.length > 28 ? item.description.slice(0, 25) + '...' : item.description}
            </div>
            <div className="text-xs font-normal sm:text-sm2">at {item.postDate.slice(11, 16)}</div>
          </div>
        </div>
        <div className="font-semibold text-blue">{formatCurrency(item.amount)}</div>
      </div>
    </div>
  );
};
