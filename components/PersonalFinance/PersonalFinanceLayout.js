import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Menu } from './Menu';
import { HomeCharts } from './Chart/HomeCharts';
import { IncomeExpenseCharts } from './Chart/IncomeExpenseCharts';
import { PersonalFinanceFooter } from './PersonalFinanceFooter';
import { PersonalFinanceHeader } from './PersonalFinanceHeader';
import { ProfileLayout } from './ProfileLayout';
import { TransactionPage } from './Transaction';
import { HomeSlider, Expenditures } from './Slider';
import { AccountPage } from './Account';
import { IncomeExpensePage } from './IncomeExpense';
import { useAccountVerificationForm } from '../AccountVerificationForm/AccountVerificationFormProvider';

const homePageIndex = 1;
const accountPageIndex = 2;
const incomeExpensePageIndex = 3;
const transactionPageIndex = 4;

const colorPallette = [
  '#4A56E2',
  '#4761DD',
  '#436BD7',
  '#4076D2',
  '#3C81CD',
  '#398CC7',
  '#3596C2',
  '#32A1BC',
  '#2EACB7',
  '#2BB7B2',
  '#27C1AC',
  '#24CCA7',
];

export function PersonalFinanceLayout() {
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [selectedPageIndex, setSelectedPageIndex] = useState(1);
  const [selectedMenuTitle, setSelectedMenuTitle] = useState('Home');
  const [hideHomePageItems, setHideHomePageItems] = useState(false);
  const [hideTransactionPageItems, setHideTransactionPageItems] = useState(false);
  const [hideIncomeExpensePageItems, setHideIncomeExpensePageItems] = useState(false);
  const [refreshConnectionApiCalled, setRefreshConnectionApiCalled] = useState(false);
  const [incomeExpenseApiCalled, setIncomeExpenseApiCalled] = useState(false);

  //Monthly sum of payments in categories
  const [expenseMonthlyData, setExpenseMonthlyData] = useState([]);
  //Sum of monthly average incomes
  const [incomeMonthlyAvgData, setIncomeMonthlyAvgData] = useState(0);
  //Monthly income values for bar chart
  const [incomeData, setIncomeData] = useState([]);
  //Income values grouped by day
  const [incomesByDate, setIncomesByDate] = useState([]);
  //Expense values grouped by day
  const [expensesByDate, setExpensesByDate] = useState([]);
  //All payments by categories
  const [paymentsData, setPaymentsData] = useState([]);
  //Payments percentage values of categories for pie chart
  const [expenseData, setExpenseData] = useState([]);
  //Sum of monthly average expenses
  const [expenseMonthlyAvgData, setExpenseMonthlyAvgData] = useState(0);
  const [expenseLoading, setExpenseLoading] = useState(true);
  const [incomeLoading, setIncomeLoading] = useState(true);

  const { refreshBasiqConnection, basiqConnection } = useAccountVerificationForm();
  const { completed } = basiqConnection;

  let { dateGroupedTransactions } = useSelector(state => state.userTransactions);

  const userId = sessionStorage.getItem('userId');

  async function setIncomeExpenseData() {
    //Before creating income & expense summary, creating or refreshing the relevant connections is required
    //Creating expense summary between 2020-01 - 2021-01
    axios
      .post(`/api/create-expense?userId=${userId}`, { fromMonth: '2022-03', toMonth: '2023-02' })
      .then(function (response) {
        const data = response.data;
        const paymentsTotal = data.payments.reduce((sum, p) => {
          return sum + parseInt(p.avgMonthly);
        }, 0);

        setExpenseMonthlyAvgData(
          parseInt(data.bankFees?.avgMonthly || '0') +
            parseInt(data.cashWithdrawals?.avgMonthly || '0') +
            parseInt(data.loanInterests?.avgMonthly || '0') +
            parseInt(data.loanRepayments?.avgMonthly || '0') +
            paymentsTotal
        );
        setExpenseData(
          data.payments.map((x, i) => {
            return { name: x.division, value: x.percentageTotal, fill: colorPallette[parseInt(i % 12)] };
          })
        );

        setPaymentsData(data.payments);

        let paymentsChangeHistory = [];
        data.payments.forEach(x =>
          x.subCategory[0].changeHistory.forEach(y =>
            paymentsChangeHistory.push({ date: y.date, amount: y.amount, description: x.division })
          )
        );
        setExpenseMonthlyData(prepareExpenseMonthly(paymentsChangeHistory));

        let expenseChangeHistory = [];

        expenseChangeHistory.push(
          ...(data.bankFees?.changeHistory.map(x => {
            return { date: x.date, amount: x.amount, description: 'Bank fee' };
          }) ?? [])
        );
        expenseChangeHistory.push(
          ...(data.cashWithdrawals?.changeHistory.map(x => {
            return { date: x.date, amount: x.amount, description: 'Cash withdrawal' };
          }) ?? [])
        );
        expenseChangeHistory.push(
          ...(data.loanInterests?.changeHistory.map(x => {
            return { date: x.date, amount: x.amount, description: 'Loan interest' };
          }) ?? [])
        );
        expenseChangeHistory.push(
          ...(data.loanRepayments?.changeHistory.map(x => {
            return { date: x.date, amount: x.amount, description: 'Loan repayment' };
          }) ?? [])
        );

        expenseChangeHistory.push(...paymentsChangeHistory);

        setExpensesByDate(prepareExpenseByDate(expenseChangeHistory));

        setExpenseLoading(false);
      })
      .catch(function (error) {
        console.warn(error);
        setExpenseMonthlyAvgData(0);
        setExpenseData([]);
        setExpenseMonthlyData([]);
        setPaymentsData([]);
        setExpenseLoading(false);
      });

    //Creating income summary between 2020-01 - 2021-01
    axios
      .post(`/api/create-income?userId=${userId}`, { fromMonth: '2022-03', toMonth: '2023-02' })
      .then(function (response) {
        const data = response.data;

        setIncomeMonthlyAvgData(parseInt(data.summary.regularIncomeAvg) + parseInt(data.summary.irregularIncomeAvg));

        let regularAndIrregularIncomes = [];

        data.regular?.forEach(source => {
          regularAndIrregularIncomes.push(...(source.changeHistory ?? []));
        });

        data.irregular?.forEach(source => {
          regularAndIrregularIncomes.push(...(source.changeHistory ?? []));
        });

        setIncomeData(
          aggregateChangeHistoryAmountByMonth(regularAndIrregularIncomes).map(x => ({
            key: x.month,
            value: x.aggregatedAmount,
            normalizedValue: x.aggregatedAmount * 1.25,
          }))
        );

        let incomeChangeHistory = [];
        incomeChangeHistory.push(...data.irregular[0].changeHistory);
        incomeChangeHistory.push(...data.otherCredit[0].changeHistory);
        incomeChangeHistory.push(...data.regular[0].changeHistory);

        setIncomesByDate(groupChangeHistoryByDay(incomeChangeHistory));

        setIncomeLoading(false);
      })
      .catch(function (error) {
        console.warn(error);
        setIncomeMonthlyAvgData(0);
        setIncomeData([]);
        setIncomeLoading(false);
      });

      setIncomeExpenseApiCalled(true);
  }

  useEffect(() => {
    const refreshConnectionFunc = async () => {
      await refreshBasiqConnection(userId);

      setRefreshConnectionApiCalled(true);
    }

    if (dateGroupedTransactions?.length) {
      refreshConnectionFunc();
    }
  }, [dateGroupedTransactions]);

  useEffect(() => {
    if (refreshConnectionApiCalled && !incomeExpenseApiCalled && completed) {
      setIncomeExpenseData();
    }
  }, [completed, incomeExpenseApiCalled, refreshConnectionApiCalled]);

  function aggregateChangeHistoryAmountByMonth(changeHistory) {
    return Object.entries(
      changeHistory.reduce(function (r, a) {
        if (a.date) {
          let date = new Date(a.date).toLocaleString('en-us', { month: 'short' });
          r[date] = r[date] || [];
          if (!r[date].aggregatedAmount) r[date].aggregatedAmount = 0;
          r[date].aggregatedAmount += parseInt(a.amount);
          return r;
        }
      }, Object.create(null))
    ).map(([key, value]) => {
      return { month: key, aggregatedAmount: value.aggregatedAmount };
    });
  }

  //Grouping change history values as amount or object by month
  function groupChangeHistoryByMonth(changeHistory, absoluteValue) {
    return Object.entries(
      changeHistory.reduce(function (r, a) {
        if (a.date) {
          r[a.date] = r[a.date] || [];
          r[a.date].push(absoluteValue ? Math.abs(a.amount) : { amount: a.amount, description: a.description });
          return r;
        }
      }, Object.create(null))
    );
  }

  //Grouping change history values as object by day
  function groupChangeHistoryByDay(changeHistory) {
    return Object.entries(
      changeHistory.reduce(function (r, a) {
        if (a.date) {
          r[a.date.slice(0, 10)] = r[a.date.slice(0, 10)] || [];
          r[a.date.slice(0, 10)].push({ amount: a.amount, description: a.source });
          return r;
        }
      }, Object.create(null))
    );
  }

  //Grouping, ordering and getting sum of payments change histories by day
  function prepareExpenseMonthly(paymentsChangeHistory) {
    const groupedByMonthExpenses = groupChangeHistoryByMonth(paymentsChangeHistory, true);

    const orderedExpenseTotalByMonth = groupedByMonthExpenses
      .map(x => {
        return {
          key: x[0],
          value: x[1]
            .reduce((sum, p) => {
              return sum + parseInt(p);
            }, 0)
            .toString(),
          normalizedValue:
            x[1].reduce((sum, p) => {
              return sum + parseInt(p);
            }, 0) * 2.5,
        };
      })
      .sort((a, b) => (a.key > b.key ? 1 : b.key > a.key ? -1 : 0))
      .slice(0, 12);

    return orderedExpenseTotalByMonth.map(x => {
      return { ...x, key: new Date(x.key + '-01').toLocaleString('en-us', { month: 'short' }) };
    });
  }

  //Grouping and ordering expense change histories by day
  function prepareExpenseByDate(expenseChangeHistory) {
    const groupedChangeHistory = groupChangeHistoryByMonth(expenseChangeHistory);

    groupedChangeHistory.forEach(x => (x[0] = x[0] + '-01'));
    groupedChangeHistory.sort((a, b) => (a[0] > b[0] ? 1 : b[0] > a[0] ? -1 : 0));

    return groupedChangeHistory;
  }

  //Manage main and profile menus on desktop
  function manageMenus(isMainMenu) {
    if (isMainMenu) {
      setProfileMenuOpen(false);
      setMainMenuOpen(!mainMenuOpen);
      return;
    }

    setMainMenuOpen(false);
    setProfileMenuOpen(!profileMenuOpen);
  }

  //When any page item is clicked to show
  function managePages(selectedPageIndex, selectedMenuTitle) {
    setSelectedMenuTitle(selectedMenuTitle);
    setMainMenuOpen(false);
    setSelectedPageIndex(selectedPageIndex);
    manageDetailPages(false, false, false);
  }

  //Hide or show detail pages depending on context
  function manageDetailPages(hideHomePageItems, hideTransactionPageItems, hideIncomeExpensePageItems) {
    setHideHomePageItems(hideHomePageItems);
    setHideTransactionPageItems(hideTransactionPageItems);
    setHideIncomeExpensePageItems(hideIncomeExpensePageItems);
  }

  return (
    <>
      <div className="flex flex-col">
        {/* HEADER */}
        <div>
          <PersonalFinanceHeader
            isMenuOpen={mainMenuOpen}
            showProfileLine={selectedPageIndex && selectedPageIndex === 1}
            menuIconClick={() => manageMenus(true)}
            profileMenuOpenClick={() => manageMenus(false)}
            selectedPageIndex={selectedPageIndex}
          ></PersonalFinanceHeader>
        </div>
        {/* MOBILE VIEW */}
        <div
          className={`${selectedPageIndex && selectedPageIndex === homePageIndex ? 'mt-28 mb-24' : ''} ${
            selectedPageIndex && selectedPageIndex === incomeExpensePageIndex ? 'mt-8 mb-24' : ''
          } sm:hidden h-full`}
        >
          {/* HOME PAGE */}
          {selectedPageIndex && selectedPageIndex === homePageIndex && (
            <div className="flex flex-col min-w-min">
              {!hideHomePageItems && (
                <>
                  <HomeSlider
                    incomeMonthlyAvg={incomeMonthlyAvgData}
                    expenseMonthlyAvg={expenseMonthlyAvgData}
                    expenseMonthly={expenseMonthlyData}
                    expenseLoading={expenseLoading}
                  />
                  <HomeCharts
                    expenseData={expenseData}
                    incomeData={incomeData}
                    expenseLoading={expenseLoading}
                    incomeLoading={incomeLoading}
                    chartWidth={'100%'}
                  />
                </>
              )}
              <TransactionPage
                dateGroupedTransactions={dateGroupedTransactions?.slice(0, 10)}
                inTransactionsPage={false}
                managePages={managePages}
                manageDetailPages={manageDetailPages}
              />
            </div>
          )}
          {/* ACCOUNT PAGE */}
          {selectedPageIndex && selectedPageIndex === accountPageIndex && (
            <>
              <AccountPage />
            </>
          )}
          {/* INCOME & EXPENSE PAGE */}
          {selectedPageIndex && selectedPageIndex === incomeExpensePageIndex && (
            <div className="flex flex-col">
              {!hideIncomeExpensePageItems && (
                <IncomeExpensePage
                  incomeLoading={incomeLoading}
                  expenseLoading={expenseLoading}
                  incomesByDate={incomesByDate}
                  expensesByDate={expensesByDate}
                  manageDetailPages={manageDetailPages}
                />
              )}
              {!hideHomePageItems && (
                <>
                  <IncomeExpenseCharts
                    expenseData={expenseData}
                    incomeData={incomeData}
                    incomeMonthlyAvg={incomeMonthlyAvgData}
                    expenseMonthlyAvg={expenseMonthlyAvgData}
                    expenseMonthly={expenseMonthlyData}
                    expenseLoading={expenseLoading}
                    incomeLoading={incomeLoading}
                    chartWidth={'100%'}
                  />
                  <Expenditures payments={paymentsData} expenseLoading={expenseLoading} />
                </>
              )}
              {!hideTransactionPageItems && (
                <TransactionPage
                  dateGroupedTransactions={dateGroupedTransactions?.slice(0, 10)}
                  inTransactionsPage={false}
                  managePages={managePages}
                  manageDetailPages={manageDetailPages}
                />
              )}
            </div>
          )}
          {/* TRANSACTION PAGE */}
          {selectedPageIndex && selectedPageIndex === transactionPageIndex && (
            <div className="mt-8 mb-20">
              <TransactionPage
                dateGroupedTransactions={dateGroupedTransactions?.slice(0, 20)}
                inTransactionsPage={true}
              />
            </div>
          )}
        </div>
        {/* MAIN MENU */}
        <Menu
          desktopMainMenuItems={DESKTOP_MENU_ITEMS}
          mobileMainMenuItems={MOBILE_MENU_ITEMS}
          open={mainMenuOpen}
          setMenuOpen={() => manageMenus(true)}
          onMenuItemClick={managePages}
          selectedMenuTitle={selectedMenuTitle}
        ></Menu>
        {/* PROFILE MENU */}
        <div className="hidden sm:block">
          <ProfileLayout open={profileMenuOpen} setMenuOpen={() => manageMenus(false)}></ProfileLayout>
        </div>
        {/* DESKTOP VIEW */}
        <div className="z-0 flex-col hidden w-full mb-12 overflow-y-scroll  bg-menu mt-[9.5rem] sm:flex min-h-[60rem] max-h-[60rem]">
          <div className="hidden sm:block">
            {/* HOME PAGE */}
            {selectedPageIndex && selectedPageIndex === homePageIndex && (
              <>
                {!hideHomePageItems && (
                  <div className="flex flex-col">
                    <div className="flex mt-8 ml-52">
                      <div className="mr-4">
                        <img className="w-7 h-7" src="/wallet.svg" alt="Wallet" />
                      </div>
                      <span className="font-bold text-2xl2 text-blue">Your finances at a glance</span>
                    </div>
                    <div className="flex justify-around sm:items-start mt-6 ml-24 sm:px-24 w-5/6">
                      <HomeSlider
                        incomeMonthlyAvg={incomeMonthlyAvgData}
                        expenseMonthlyAvg={expenseMonthlyAvgData}
                        expenseMonthly={expenseMonthlyData}
                        expenseLoading={expenseLoading}
                      />
                      <HomeCharts
                        expenseData={expenseData}
                        incomeData={incomeData}
                        expenseLoading={expenseLoading}
                        incomeLoading={incomeLoading}
                      />
                    </div>
                  </div>
                )}
                <TransactionPage
                  dateGroupedTransactions={dateGroupedTransactions?.slice(0, 10)}
                  inTransactionsPage={false}
                  managePages={managePages}
                  manageDetailPages={manageDetailPages}
                />
              </>
            )}
            {/* ACCOUNT PAGE */}
            {selectedPageIndex && selectedPageIndex === accountPageIndex && (
              <>
                <AccountPage />
              </>
            )}
            {/* INCOME & EXPENSE PAGE */}
            {selectedPageIndex && selectedPageIndex === incomeExpensePageIndex && (
              <>
                {!hideIncomeExpensePageItems && (
                  <IncomeExpensePage
                    incomeLoading={incomeLoading}
                    expenseLoading={expenseLoading}
                    incomesByDate={incomesByDate}
                    expensesByDate={expensesByDate}
                    manageDetailPages={manageDetailPages}
                  />
                )}
                {!hideHomePageItems && (
                  <div className="flex justify-around sm:items-start mt-6 sm:px-48">
                    <IncomeExpenseCharts
                      expenseData={expenseData}
                      incomeData={incomeData}
                      incomeMonthlyAvg={incomeMonthlyAvgData}
                      expenseMonthlyAvg={expenseMonthlyAvgData}
                      expenseMonthly={expenseMonthlyData}
                      expenseLoading={expenseLoading}
                      incomeLoading={incomeLoading}
                      chartWidth={'100%'}
                    />
                    <Expenditures payments={paymentsData} expenseLoading={expenseLoading} />
                  </div>
                )}
                {!hideTransactionPageItems && (
                  <div className="mt-12">
                    <TransactionPage
                      dateGroupedTransactions={dateGroupedTransactions?.slice(0, 10)}
                      inTransactionsPage={false}
                      managePages={managePages}
                      manageDetailPages={manageDetailPages}
                    />
                  </div>
                )}
              </>
            )}
            {/* TRANSACTION PAGE */}
            {selectedPageIndex && selectedPageIndex === transactionPageIndex && (
              <>
                <TransactionPage
                  dateGroupedTransactions={dateGroupedTransactions?.slice(0, 20)}
                  inTransactionsPage={true}
                />
              </>
            )}
          </div>
        </div>
        {/* FOOTER */}
        <PersonalFinanceFooter
          menuItems={DESKTOP_FOOTER_MENU_ITEMS}
          middleMenuItems={DESKTOP_FOOTER_MIDDLE_MENU_ITEMS}
          onMenuItemClick={managePages}
        />
      </div>
    </>
  );
}

export const MOBILE_MENU_ITEMS = [
  { pageIndex: homePageIndex, title: 'Home', image: '/home.svg', selectedImage: '/home-white.svg' },
  { pageIndex: accountPageIndex, title: 'Work', image: '/work.svg', selectedImage: '/work-white.svg' },
  { pageIndex: incomeExpensePageIndex, title: 'Chart', image: '/chart.svg', selectedImage: '/chart-white.svg' },
  { pageIndex: transactionPageIndex, title: 'Upload', image: '/upload.svg', selectedImage: '/upload-white.svg' },
];

export const DESKTOP_MENU_ITEMS = [
  { pageIndex: homePageIndex, title: 'Home', image: '/home.svg' },
  { pageIndex: accountPageIndex, title: 'My Accounts', image: '/wallet.svg' },
  { pageIndex: incomeExpensePageIndex, title: 'Income vs Expenses', image: '/activity.svg' },
  { pageIndex: transactionPageIndex, title: 'Transactions', image: '/swap.svg' },
];

export const DESKTOP_FOOTER_MENU_ITEMS = [
  { pageIndex: homePageIndex, title: 'Home', image: '/home-white.svg' },
  { pageIndex: accountPageIndex, title: 'My Accounts', image: '/wallet-white.svg' },
  { pageIndex: incomeExpensePageIndex, title: 'Income vs Expenses', image: '/activity-white.svg' },
  { pageIndex: transactionPageIndex, title: 'Transactions', image: '/swap-white.svg' },
];

export const DESKTOP_FOOTER_MIDDLE_MENU_ITEMS = [
  { title: 'Profile settings', image: '/settings-white.svg' },
  { title: 'Add account', image: '/plus-white.svg' },
];
