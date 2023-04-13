import { useEffect, useState } from 'react';
import { SimplePieChart } from '@/components/SimplePieChart';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { formatCurrency } from '@/utils/formatCurrency';

export function IncomeExpensePieChart({ incomeMonthlyAvg, expenseMonthlyAvg, incomeLoading, expenseLoading }) {
  const [incomeExpenseChartData, setIncomeExpenseChartData] = useState([]);

  //Using monthly averages of income & expense in pie chart
  useEffect(() => {
    if (!incomeLoading && !expenseLoading) {
      setIncomeExpenseChartData([
        { name: 'Income', value: Math.abs(incomeMonthlyAvg) },
        { name: 'Expense', value: Math.abs(expenseMonthlyAvg) },
      ]);
    }
  }, [incomeLoading, expenseLoading]);

  return (
    <div className="flex h-72 sm:h-80 sm:w-full sm:min-w-max sm:p-3">
      <div className="flex flex-col w-1/2 sm:w-full">
        <div className="mt-6 font-semibold ml-14 h-1/6 text-base2 sm:text-2xl text-blue sm:min-w-max">This month</div>
        <div className="h-5/6">
          {incomeExpenseChartData && incomeExpenseChartData.length > 0 ? (
            <SimplePieChart data={incomeExpenseChartData} />
          ) : (
            <div className="flex justify-center h-80">
              <div className="mt-16">
                {incomeLoading && expenseLoading}{' '}
                {incomeLoading && expenseLoading ? <LoadingSpinner /> : 'Income & Expense data not found'}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col w-1/2 sm:w-full">
        <div className="mr-10 mt-28 flex flex-col justify-end items-end">
          <div className="flex flex-col items-end pt-2 pb-2 mb-1 sm:rounded-2xl sm:border-2 sm:border-[#F5F5F5] sm:bg-[#FEFEFE] sm:w-max">
            <div className="mr-2">
              <p className="text-xs font-medium text-right text-blue">Total Income:</p>
              <span className="text-xl font-bold text-transparent 2xl:text-3xl xl:text-2xl lg:text-xl sm:text-base2 bg-clip-text bg-gradient-to-r from-[#4A56E2] to-[#24CCA7]">
                {formatCurrency(incomeMonthlyAvg || '')}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end pt-2 pb-2 sm:rounded-2xl sm:border-2 sm:border-[#F5F5F5] sm:bg-[#FEFEFE] sm:w-max">
            <div className="mr-2">
              <p className="text-xs font-medium text-right text-blue">Total Expense:</p>
              <span className="text-xl font-bold text-transparent 2xl:text-3xl xl:text-2xl lg:text-xl sm:text-base2 bg-clip-text bg-gradient-to-r from-[#D96C6C] to-[#4A56E2]">
                {formatCurrency(Math.abs(expenseMonthlyAvg) || '')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
