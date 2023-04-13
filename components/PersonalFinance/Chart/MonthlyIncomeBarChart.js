import { CustomBarChart } from '@/components/CustomBarChart';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export function MonthlyIncomeBarChart({ incomeData, incomeLoading, chartWidth, hideSeeMore, minWidth, minHeight }) {
  return (
    <div className="h-80 sm:p-6">
      {incomeData && incomeData.length > 0 ? (
        <div className="flex flex-col justify-between h-80 sm:h-64 sm:ml-0">
          <div className="w-72 lg:w-96 sm:w-64">
            <CustomBarChart data={incomeData} width={chartWidth} minWidth={minWidth} minHeight={minHeight} />
          </div>
          {/* Hide this if this is Income & Expense page */}
          {!hideSeeMore && (
            <div className="flex justify-center">
              <p className="font-semibold underline text-sm2 text-blue bg-[#FEFEFE] sm:mt-6">See more</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center h-80">
          <div className="mt-16">
            {incomeLoading} {incomeLoading ? <LoadingSpinner /> : 'Income data not found'}
          </div>
        </div>
      )}
    </div>
  );
}
