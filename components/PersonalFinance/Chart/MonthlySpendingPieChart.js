import { ActiveShapePieChart } from '@/components/ActiveShapePieChart';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export function MonthlySpendingPieChart({ expenseData, expenseLoading, hideSeeMore, showInChartSlider }) {
  return (
    <div className="h-80 sm:p-4 flex items-center justify-center">
      {expenseData && expenseData.length > 0 ? (
        <div className="flex flex-col justify-between h-80 sm:h-64">
          <div className={`${showInChartSlider && 'sm:mb-2'}`}>
            <ActiveShapePieChart data={expenseData} />
          </div>
          {/* Hide this if this is Income & Expense page */}
          {!hideSeeMore && (
            <div className="flex justify-center">
              <p className="font-semibold underline text-sm2 text-blue bg-[#FEFEFE] sm:mt-2">See more</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center h-80">
          <div className="mt-16">
            {expenseLoading} {expenseLoading ? <LoadingSpinner /> : 'Expense data not found'}
          </div>
        </div>
      )}
    </div>
  );
}
