import { IncomeExpenseItemDetail } from './IncomeAndExpensesItemDetail';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { dateConverter } from '@/utils/dateConverter';
import { formatCurrency } from '@/utils/formatCurrency';

export const IncomeExpenseItem = ({
  incomeLoading,
  expenseLoading,
  selectedDate,
  incomeDetails,
  expenseDetails,
  closeIncomeExpenseDetailClick,
}) => {
  const dateTitle = dateConverter(selectedDate);

  const onBackButtonClick = () => {
    closeIncomeExpenseDetailClick();
  };

  return (
    <div>
      <div className="flex justify-between ml-5 mr-5 sm:mt-12 sm:ml-96 sm:mr-96">
        <div>
          <img className="w-8 h-8" src="/back-button.svg" alt="Back" onClick={onBackButtonClick} />
        </div>
        <div className="flex flex-col items-center">
          <div className="font-semibold text-2xl2">{dateTitle}</div>
        </div>
        <div>
          <img className="w-8 h-8" src="/share-button.svg" alt="Share" />
        </div>
      </div>
      {incomeLoading ? (
        <div className="flex items-center justify-center sm:mt-20">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="ml-6 mr-6 sm:ml-96 sm:mr-96">
          <div className="flex flex-col p-6 mt-8 font-semibold border-b-2 border-solid border-[#E0EAFF]">
            <div className="text-base2 sm:text-xl">Income</div>
            <div className="mt-2 font-bold text-primary-bold text-2xl2">
              {formatCurrency(
                incomeDetails.length > 0
                  ? incomeDetails.map(x => x.amount).reduce((partialSum, a) => parseInt(partialSum) + parseInt(a), 0)
                  : 0
              )}
            </div>
          </div>
          {incomeDetails?.map((item, index) => (
            <IncomeExpenseItemDetail key={index} item={item} />
          ))}
        </div>
      )}
      {expenseLoading ? (
        <div className="flex items-center justify-center sm:mt-20">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="ml-6 mr-6 sm:ml-96 sm:mr-96">
          <div className="flex flex-col border-b-2 border-solid border-[#E0EAFF]">
            <div className="flex flex-col p-6 mt-8 font-semibold text-2xl2 ">
              <div className="text-base2 sm:text-xl">Expenses</div>
              <div className="mt-2 text-2xl font-bold text-primary-bold sm:text-2xl2">
                {formatCurrency(
                  expenseDetails.length > 0
                    ? expenseDetails.map(x => x.amount).reduce((partialSum, a) => parseInt(partialSum) + parseInt(a), 0)
                    : 0
                )}
              </div>
            </div>
          </div>
          {expenseDetails?.map((item, index) => (
            <IncomeExpenseItemDetail key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
