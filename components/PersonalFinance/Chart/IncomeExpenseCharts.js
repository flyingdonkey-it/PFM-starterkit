import { useState } from 'react';
import { MonthlySpendingBarChart } from '../Slider/MonthlySpendingBarChart';
import { MonthlySpendingPieChart } from './MonthlySpendingPieChart';
import { MonthlyIncomeBarChart } from './MonthlyIncomeBarChart';
import { IncomeExpensePieChart } from './IncomeExpensePieChart';

const incomeExpenseIndex = 1;
const monthlySpendingPieIndex = 2;
const monthlySpendingBarIndex = 3;
const monthlyIncomeIndex = 4;

export const IncomeExpenseCharts = ({
  expenseData,
  incomeData,
  incomeMonthlyAvg,
  expenseMonthlyAvg,
  expenseMonthly,
  expenseLoading,
  incomeLoading,
  chartWidth,
}) => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const components = [
    { index: incomeExpenseIndex },
    { index: monthlySpendingPieIndex },
    { index: monthlySpendingBarIndex },
    { index: monthlyIncomeIndex },
  ];

  //Slide action to show a chart
  const handleClickIndicator = (e, index) => {
    e.preventDefault();
    setCurrentIndex(index);
  };

  return (
    <div className="sm:flex">
      {/* DESKTOP VIEW */}
      <div className="hidden w-full h-72 sm:h-96 sm:block">
        {currentIndex === incomeExpenseIndex && (
          <IncomeExpensePieChart
            incomeMonthlyAvg={incomeMonthlyAvg}
            expenseMonthlyAvg={expenseMonthlyAvg}
            incomeLoading={incomeLoading}
            expenseLoading={expenseLoading}
          />
        )}
        {currentIndex === monthlySpendingPieIndex && (
          <MonthlySpendingPieChart
            expenseData={expenseData}
            expenseLoading={expenseLoading}
            chartWidth={chartWidth}
            hideSeeMore={true}
            showInChartSlider={true}
          />
        )}
        {currentIndex === monthlySpendingBarIndex && (
          <MonthlySpendingBarChart
            expenseMonthly={expenseMonthly}
            expenseLoading={expenseLoading}
            chartWidth={chartWidth}
            showInChartSlider={true}
            minWidth={100}
            minHeight={200}
          />
        )}
        {currentIndex === monthlyIncomeIndex && (
          <MonthlyIncomeBarChart
            incomeData={incomeData}
            incomeLoading={incomeLoading}
            chartWidth={chartWidth}
            hideSeeMore={true}
            showInChartSlider={true}
            minWidth={350}
            minHeight={300}
          />
        )}
        {/* CAROUSEL INDICATOR */}
        <div className="hidden mt-8 mr-6 sm:block">
          <div className="flex justify-end">
            <div className="space-x-3">
              {components.map(item => (
                <button
                  id={'carousel-indicator-' + item.index}
                  key={item.index}
                  type="button"
                  className={
                    'w-4 h-2 rounded ' + (item.index === currentIndex ? 'bg-[#4A56E2]' : 'bg-[rgba(74,86,226,0.3)]')
                  }
                  aria-current={currentIndex === item.index}
                  onClick={e => handleClickIndicator(e, item.index)}
                  aria-label={'Slide ' + item.index}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* MOBILE VIEW */}
      <div className="overflow-hidden rounded-2xl sm:hidden">
        <div className="h-80" key={`slide-item-${currentIndex}`}>
          {currentIndex === incomeExpenseIndex && (
            <IncomeExpensePieChart
              incomeMonthlyAvg={incomeMonthlyAvg}
              expenseMonthlyAvg={expenseMonthlyAvg}
              incomeLoading={incomeLoading}
              expenseLoading={expenseLoading}
            />
          )}
          {currentIndex === monthlySpendingPieIndex && (
            <MonthlySpendingPieChart
              expenseData={expenseData}
              expenseLoading={expenseLoading}
              chartWidth={chartWidth}
              hideSeeMore={true}
            />
          )}
          {currentIndex === monthlySpendingBarIndex && (
            <div className="ml-8 mr-8">
              <MonthlySpendingBarChart
                expenseMonthly={expenseMonthly}
                expenseLoading={expenseLoading}
                chartWidth={chartWidth}
                showInChartSlider={true}
              />
            </div>
          )}
          {currentIndex === monthlyIncomeIndex && (
            <div className="ml-8 mr-8">
              <MonthlyIncomeBarChart
                incomeData={incomeData}
                incomeLoading={incomeLoading}
                chartWidth={chartWidth}
                hideSeeMore={true}
                minWidth={200}
                minHeight={300}
              />
            </div>
          )}
        </div>
      </div>
      {/* CAROUSEL INDICATOR */}
      <div className="absolute z-30 flex space-x-3 -translate-x-1/2 left-1/2 sm:hidden">
        {components.map(item => (
          <button
            id={'carousel-indicator-' + item.index}
            key={item.index}
            type="button"
            className={
              'w-4 h-4 rounded-full ' + (item.index === currentIndex ? 'bg-[#4A56E2]' : 'bg-[rgba(74,86,226,0.3)]')
            }
            aria-current={currentIndex === item.index}
            onClick={e => handleClickIndicator(e, item.index)}
            aria-label={'Slide ' + item.index}
          ></button>
        ))}
      </div>
    </div>
  );
};
