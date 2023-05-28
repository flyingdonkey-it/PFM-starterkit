import { SingleBarChart } from '@/components/SingleBarChart';
import { formatCurrency } from '@/utils/formatCurrency';

export const IncomeExpense = ({ incomeMonthlyAvg, expenseMonthlyAvg }) => {
  const data = [
    {
      avgData: incomeMonthlyAvg,
      text: 'Income',
    },
    {
      avgData: expenseMonthlyAvg < 0 ? -expenseMonthlyAvg : expenseMonthlyAvg,
      text: 'Expense',
    },
  ];
  return (
    <div className="border-2 shadow-md h-44 sm:h-64 bg-[#fbfbfb] rounded-2xl border-[#e0eaff] sm:bg-[#F5F7F8] sm:min-w-max">
      <div className="mt-3 ml-4 mr-4 sm:mr-16 sm:ml-8 sm:mb-5 sm:mt-5">
        <div className="flex items-center">
          <div>
            <img className="w-6 h-6" src="/activity.svg" alt="Activity" />
          </div>
          <div className="ml-2">
            <p className="text-sm font-bold sm:text-2xl2 text-blue">Income vs Expenses</p>
          </div>
        </div>
        <div className="flex flex-col m-2 lg:w-96">
          <div className="flex items-center justify-center">
            {(!!incomeMonthlyAvg || !!expenseMonthlyAvg) && (
              <div className="flex flex-col w-1/2 mr-2 sm:rounded-2xl sm:border-2 sm:border-[#F5F5F5] sm:bg-[#FEFEFE] sm:min-w-max">
                <div className="ml-2">
                  <span className="text-xs font-medium text-blue">This month</span>
                </div>
                {/* DESKTOP VIEW */}
                <div className=" hidden sm:justify-center sm:ml-0 sm:block">
                  <SingleBarChart data={data} width={110} height={120} left={40} right={40} />
                </div>
                {/* MOBILE VIEW */}
                <div className="sm:hidden flex items-end ml-2">
                  <SingleBarChart data={data} width={110} height={100} left={10} right={10} />
                </div>
              </div>
            )}
            <div className="flex flex-col w-1/2">
              <div className="flex flex-col items-end pt-2 pb-2 mb-1 sm:rounded-2xl sm:border-2 sm:border-[#F5F5F5] sm:bg-[#FEFEFE] sm:min-w-max">
                <div className="mr-2">
                  <p className="text-xs font-medium text-right">Total Income:</p>
                  <span className="text-xl font-bold text-transparent 2xl:text-3xl xl:text-2xl lg:text-xl sm:text-base2 bg-clip-text bg-gradient-to-r from-[#4A56E2] to-[#24CCA7]">
                    {formatCurrency(incomeMonthlyAvg || '')}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end pt-2 pb-2 sm:rounded-2xl sm:border-2 sm:border-[#F5F5F5] sm:bg-[#FEFEFE] sm:min-w-max">
                <div className="mr-2">
                  <p className="text-xs font-medium text-right">Total Expense:</p>
                  <span className="text-xl font-bold text-transparent 2xl:text-3xl xl:text-2xl lg:text-xl sm:text-base2 bg-clip-text bg-gradient-to-r from-[#D96C6C] to-[#4A56E2]">
                    {formatCurrency(Math.abs(expenseMonthlyAvg) || '')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
