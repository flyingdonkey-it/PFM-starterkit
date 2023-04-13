import { formatCurrency } from '@/utils/formatCurrency';

export function ListItem({ item, imagePrefix }) {
  return (
    <div className="p-2 mb-2 sm:bg-[#F5F7F8] bg-list-item-color sm:p-4 rounded-[20px] sm:overflow-hidden">
      <div className="flex justify-between">
        <div className="flex">
          <div className="w-9 h-9 self-center">
            <img src={`/${imagePrefix}-${item?.index}.svg`} alt={imagePrefix} />
          </div>
          <div className="ml-2 text-sm2 sm:text-sm3 truncate">
            <div className="font-medium">{item.description}</div>
            <div className="text-xs font-normal sm:text-sm2 truncate">{item.dateDescription}</div>
          </div>
        </div>
        <div className="self-center font-semibold text-blue truncate">{formatCurrency(item.amount)}</div>
      </div>
    </div>
  );
}
