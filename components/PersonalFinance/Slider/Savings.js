import { LoadingSpinner } from '../../LoadingSpinner';
import { formatCurrency } from '@/utils/formatCurrency';

export const Savings = ({ balance, accountsLoading, institutionCode }) => {
  return (
    <div className="border-2 shadow-md h-44 sm:h-64 bg-[#fbfbfb] rounded-2xl border-[#e0eaff] sm:bg-[#F5F7F8]">
      <div className="mt-4 mb-2 ml-7 mr-9 sm:mb-5">
        <div className="flex items-center">
          <div className="sm:min-w-max">
            {accountsLoading}{' '}
            {accountsLoading ? <LoadingSpinner /> : <img className="w-7 h-7" src={`/bank/${institutionCode}.svg`} />}
          </div>
          <div className="ml-2">
            <p className="text-sm font-bold sm:text-2xl2 text-blue sm:min-w-max">Savings account</p>
          </div>
        </div>
        <div className="flex flex-col m-4 sm:m-6">
          <div className="sm:rounded-2xl sm:border-2 sm:min-w-max lg:w-96 sm:border-[#F5F5F5] sm:bg-[#FEFEFE]">
            <div className="flex items-center w-full mb-2 sm:mt-3 sm:mb-3">
              <div className="w-3/5 sm:ml-4 sm:min-w-max">
                <img className="w-16 h-16" src="/slider/money-vertical.svg" alt="Money" />
              </div>
              {/* SAVINGS ACCOUNT BALANCE */}
              <div className="flex  flex-col items-end sm:mr-6">
                <div className="text-xs font-medium text-blue sm:text-base2">Total amount</div>
                <div className="mt-1 text-xl font-bold sm:mt-3 2xl:text-3xl xl:text-2xl lg:text-xl sm:text-base2 text-blue  ">
                  {formatCurrency(balance || '')}
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/6 mt-2 border-t-8 rounded-l-md border-blue sm:mt-4"></div>
            <div className="w-1/6 mt-2 border-t-8 border-[#436BD7] sm:mt-4"></div>
            <div className="w-1/6 mt-2 border-t-8 border-[#398CC7] sm:mt-4"></div>
            <div className="w-1/6 mt-2 border-t-8 border-[#32A1BC] sm:mt-4"></div>
            <div className="w-1/6 mt-2 border-t-8 border-[#2BB7B2] sm:mt-4"></div>
            <div className="w-1/6 mt-2 border-t-8 border-white rounded-md sm:mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
