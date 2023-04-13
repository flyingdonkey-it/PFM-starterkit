import { useEffect, useState } from 'react';
import { IncomeExpenseItem } from './IncomeExpenseItem';
import { useToggleState } from '@/utils/useToggleState';
import { Calendar } from '@/components/Calendar';

export function IncomeExpensePage({ incomeLoading, expenseLoading, incomesByDate, expensesByDate, manageDetailPages }) {
  const [showCalendar, setShowCalendar] = useToggleState(false);
  const [incomeExpenseByDate, setIncomeExpenseByDate] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedIncomes, setSelectedIncomes] = useState([]);
  const [selectedExpenses, setSelectedExpenses] = useState([]);

  //When any date clicked on calendar aggregate the income & expense items on this date
  function onCalendarItemClick(date) {
    setShowDetail(true);
    manageDetailPages(true, true, false);

    setSelectedDate(date);

    let incomes = [];
    const selectedIncomeValues = incomesByDate.find(item => item[0] === date);
    if (selectedIncomeValues) {
      selectedIncomeValues[1].map(x => incomes.push(x));
    }
    setSelectedIncomes(incomes);

    let expenses = [];
    const selectedExpenseValues = expensesByDate.find(item => item[0] === date);
    if (selectedExpenseValues) {
      selectedExpenseValues[1].map(x => expenses.push(x));
    }
    setSelectedExpenses(expenses);
  }

  //Close income expense detail page
  function onCloseIncomeExpenseDetailClick() {
    manageDetailPages(false, false, false);
    setSelectedIncomes({});
    setSelectedExpenses({});
    setShowDetail(false);
  }

  //Aggregate income & expense data to show in calendar
  useEffect(() => {
    if (incomesByDate.length > 0 && expensesByDate.length > 0) {
      const incomeExpenseAggregatedData = [];
      incomeExpenseAggregatedData.push(...incomesByDate);
      incomeExpenseAggregatedData.push(...expensesByDate);
      setIncomeExpenseByDate(incomeExpenseAggregatedData);
    }
  }, [incomesByDate, expensesByDate]);

  return (
    <>
      {/* If not any income & expense item selected */}
      {!showDetail && (
        <div className="flex justify-between ml-6 mr-6 sm:mt-12 sm:ml-52 sm:mr-80 sm:min-w-max">
          <div className="flex sm:min-w-max">
            <div className="hidden mr-4 sm:block">
              <img className="w-6 h-6" src="/upload.svg" alt="Upload" />
            </div>
            <div className="font-semibold text-blue text-2xl2">Income and Expenses</div>
          </div>
          <div className="flex items-center justify-center pr-4">
            <div className="h-14">
              <img className="w-7 h-7" src="/calendar.svg" alt="Calendar" onClick={setShowCalendar} />
              {/* INCOME & EXPENSE CALENDAR */}
              {showCalendar && (
                <Calendar
                  data={incomeExpenseByDate || []}
                  open={showCalendar}
                  onCalendarItemClick={onCalendarItemClick}
                />
              )}
            </div>
          </div>
        </div>
      )}
      {/* If any income & expense item selected */}
      {showDetail && (
        <IncomeExpenseItem
          incomeLoading={incomeLoading}
          expenseLoading={expenseLoading}
          selectedDate={selectedDate}
          incomeDetails={selectedIncomes}
          expenseDetails={selectedExpenses}
          closeIncomeExpenseDetailClick={onCloseIncomeExpenseDetailClick}
        />
      )}
    </>
  );
}
