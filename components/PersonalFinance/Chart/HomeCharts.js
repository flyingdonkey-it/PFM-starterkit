import { useState } from 'react';
import { MonthlySpendingPieChart } from './MonthlySpendingPieChart';
import { MonthlyIncomeBarChart } from './MonthlyIncomeBarChart';
import { ListItem } from '@/components/ListItem';

const expensesIndex = 1;
const upcomingPaymentsIndex = 2;
const incomeIndex = 3;

const items = [
  { index: expensesIndex, title: 'Expenses' },
  { index: upcomingPaymentsIndex, title: 'Upcoming payments' },
  { index: incomeIndex, title: 'Income' },
];

const upcomingPayments = [
  {
    description: 'Disney+',
    dateDescription: '5th of every month',
    amount: '-20.00',
    index: '0',
  },
  {
    description: 'Spotify',
    dateDescription: '18th of every month',
    amount: '-11.00',
    index: '1',
  },
  {
    description: 'Amazon',
    dateDescription: '10th of May, every year',
    amount: '-20.00',
    index: '2',
  },
];

export function HomeCharts({ expenseData, incomeData, expenseLoading, incomeLoading }) {
  const [selectedChartItem, setSelectedChartItem] = useState(1);

  //Click title to show a chart
  function onItemClick(itemIndex) {
    setSelectedChartItem(itemIndex);
  }

  //Slide action to show a chart
  function handleClickIndicator(e, index) {
    e.preventDefault();
    setSelectedChartItem(index);
  }

  return (
    <div className="flex flex-col mt-12 mb-12 sm:w-2/5 sm:mt-1">
      {/* CHART TITLES */}
      <div className="flex items-center ml-8 mr-8 overflow-hidden border-2 rounded-3xl border-[#4A56E2] sm:hidden">
        {items &&
          items.map((item, i) => {
            return (
              <div
                key={'chart-title-' + i}
                className={`self-stretch flex items-center justify-center justify-items-center text-center p-2 text-xs grow
              ${
                selectedChartItem === item.index
                  ? 'text-white rounded-xl bg-[#4A56E2]'
                  : 'text-black bg-white rounded-3xl'
              }`}
                onClick={() => onItemClick(item.index)}
              >
                {item.title}
              </div>
            );
          })}
      </div>
      {/* CAROUSEL */}
      <div className="flex flex-col sm:mt-0 h-80 min-w-fit mt-4 sm:mt-0 h-80 min-w-fit w-96">
        {/* Expenses pie chart */}
        {selectedChartItem && selectedChartItem === expensesIndex && (
          <div className="flex flex-col justify-between h-80">
            <div className="justify-center hidden mb-4 sm:flex">
              <div>
                <img className="w-6 h-6" src="/upload.svg" alt="Upload" />
              </div>
              <div className="ml-2 font-semibold text-blue text-2xl2">Expenses</div>
            </div>
            <MonthlySpendingPieChart expenseData={expenseData} expenseLoading={expenseLoading} />
          </div>
        )}
        {/* Upcoming payments list */}
        {selectedChartItem && selectedChartItem === upcomingPaymentsIndex && (
          <div className="flex flex-col justify-between h-80">
            <div className="justify-center hidden mb-4 sm:flex">
              <div>
                <img className="w-6 h-6" src="/calendar.svg" alt="Calendar" />
              </div>
              <div className="ml-2 font-semibold text-blue text-2xl2">Upcoming payments</div>
            </div>
            <div className="ml-12 mr-12 lg:mx-36 md:mx-0">
              {upcomingPayments &&
                upcomingPayments.map((item, i) => {
                  return (
                    <ListItem
                      key={'upcoming-payment-' + i}
                      item={item}
                      imagePrefix={'payee-company'}
                      randomDivider={3}
                    />
                  );
                })}
            </div>
            <div className="flex justify-center">
              <p className="font-semibold underline text-sm2 text-blue bg-[#FEFEFE]">See more</p>
            </div>
          </div>
        )}
        {/* Income bar chart */}
        {selectedChartItem && selectedChartItem === incomeIndex && (
          <div className="flex flex-col justify-between ml-8 mr-8 h-80">
            <div className="justify-center hidden sm:flex">
              <div>
                <img className="w-6 h-6" src="/download.svg" alt="Income" />
              </div>
              <div className="ml-2 font-semibold text-blue text-2xl2">Income</div>
            </div>
            <MonthlyIncomeBarChart
              incomeData={incomeData}
              incomeLoading={incomeLoading}
              minWidth={200}
              minHeight={250}
            />
          </div>
        )}
      </div>
      {/* CAROUSEL INDICATOR */}
      <div className="hidden mt-7 sm:block">
        <div className="flex justify-end">
          <div className="space-x-3">
            {items.map(item => (
              <button
                id={'carousel-indicator-' + item.index}
                key={item.index}
                type="button"
                className={
                  'w-4 h-2 rounded ' + (item.index === selectedChartItem ? 'bg-[#4A56E2]' : 'bg-[rgba(74,86,226,0.3)]')
                }
                aria-current={selectedChartItem === item.index}
                onClick={e => handleClickIndicator(e, item.index)}
                aria-label={'Slide ' + item.index}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
