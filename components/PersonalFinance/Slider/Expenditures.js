import { useState } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { formatCurrency } from '@/utils/formatCurrency';

export function Expenditures({ payments, expenseLoading }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  //Getting click to left or right action and slide category
  function handleClick(e) {
    e.preventDefault();
    if (e.currentTarget.name === 'next') {
      if (currentIndex + 1 < payments.length) {
        setCurrentIndex(currentIndex + 1);
      }
    }
    if (e.currentTarget.name === 'prev') {
      if (currentIndex - 1 >= 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  }

  return (
    <div className="mt-20 mb-8 ml-7 mr-7 sm:ml-4 m:mb-5 sm:mt-8">
      <p className="text-base font-semibold sm:text-2xl text-blue">Categorization of Expenditures</p>
      {expenseLoading ? (
        <div className="flex justify-center">
          <div className="mt-16">
            {expenseLoading} {expenseLoading && <LoadingSpinner />}
          </div>
        </div>
      ) : (
        <>
          {/* DESKTOP VIEW */}
          <div className="flex-col hidden mt-5 sm:flex">
            <div className="flex w-full">
              {/* FIRST TWO CATEGORIES ON TOP */}
              {payments.slice(0, 2).map((item, index) => {
                return (
                  <div key={'expenditure-card-' + index} className="w-1/2 m-2">
                    <div className="h-32 p-1 bg-white border rounded-lg shadow-md border-[#E0EAFF] dark:bg-[#E0EAFF] dark:border-gray-700 ">
                      <div className="flex flex-col justify-between h-28">
                        <div className="flex mt-3 ml-2 h-1/2">
                          <div>
                            <img className="w-7 h-7" src={`/expenditure/expenditure-${index}.svg`} alt="Expenditure" />
                          </div>
                          <h5 className="mb-2 ml-2 2xl:text-xl xl:text-base2 sm:text-sm2  font-semibold tracking-tight text-[#24CCA7]">
                            {item.division?.length > 25 ? item.division?.slice(0, 22) + '...' : item.division}
                          </h5>
                        </div>
                        <div className="flex justify-end mr-4">
                          <p className="mb-1 text-base font-medium sm:text-2xl text-blue leading-[19px]">
                            {formatCurrency(item.avgMonthly)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex w-full">
              {/* SECOND TWO CATEGORIES ON BOTTOM */}
              {payments.slice(2, 4).map((item, index) => {
                return (
                  <div key={'expenditure-card-' + index} className="w-1/2 m-2">
                    <div className="h-32 p-1 bg-white border rounded-lg shadow-md border-[#E0EAFF] dark:bg-[#E0EAFF] dark:border-gray-700">
                      <div className="flex flex-col justify-between h-28">
                        <div className="flex mt-3 ml-2 h-1/2">
                          <div className="sm:min-w-max">
                            <img
                              className="w-7 h-7"
                              src={`/expenditure/expenditure-${index + 2}.svg`}
                              alt="Expenditure"
                            />
                          </div>
                          <h5 className="mb-2 ml-2 2xl:text-xl xl:text-base2 sm:text-sm2 font-semibold tracking-tight text-[#24CCA7]">
                            {item.division?.length > 25 ? item.division?.slice(0, 22) + '...' : item.division}
                          </h5>
                        </div>
                        <div className="flex justify-end mr-4">
                          <p className="mb-1 text-base font-medium sm:text-2xl text-blue leading-[19px]">
                            {formatCurrency(item.avgMonthly)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* MOBILE VIEW */}
          <div className="flex items-center w-full mt-5 sm:hidden">
            <div id="controls-carousel" className="relative w-full" data-carousel="static">
              <div>
                {/* ALL CATEGORIES */}
                {payments.map((item, index) => (
                  <div
                    key={'expenditure-card-' + index}
                    className={index === currentIndex ? 'duration-200 ease-in-out' : 'hidden duration-700 ease-in-out'}
                    data-carousel-item={index === currentIndex ? 'active' : ''}
                  >
                    <div className="w-full p-3 bg-white border rounded-lg shadow-md h-36 border-[#E0EAFF] dark:bg-[#E0EAFF] dark:border-gray-700">
                      <div className="flex flex-col items-center justify-between h-32">
                        <div className="flex mt-6 h-1/2">
                          <div>
                            <img
                              className="w-7 h-7"
                              src={`/expenditure/expenditure-${parseInt((Math.random() * 100) % 4)}.svg`}
                              alt="Expenditure"
                            />
                          </div>
                          <h5 className="mb-2 ml-2 text-xl font-semibold tracking-tight text-[#24CCA7]">
                            {item.division?.length > 25 ? item.division?.slice(0, 22) + '...' : item.division}
                          </h5>
                        </div>
                        <div>
                          <p className="mb-5 text-base font-medium text-blue leading-[19px]">
                            {formatCurrency(item.avgMonthly)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* PREV BUTTON */}
                <button
                  className="absolute top-0 left-0 flex items-center justify-center h-full px-2 cursor-pointer group focus:outline-none"
                  type="button"
                  name={'prev'}
                  onClick={handleClick}
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/10 dark:bg-gray-800/30 group-hover:bg-black/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-white dark:text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    <span className="sr-only">Previous</span>
                  </span>
                </button>
                {/* NEXT BUTTON */}
                <button
                  type="button"
                  name={'next'}
                  onClick={handleClick}
                  className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-2 cursor-pointer group focus:outline-none"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/10 dark:bg-gray-800/30 group-hover:bg-black/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-white dark:text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                    <span className="sr-only">Next</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
