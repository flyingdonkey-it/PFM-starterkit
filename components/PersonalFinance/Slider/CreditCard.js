import { formatCurrency } from '@/utils/formatCurrency';

export function CreditCard({ balance }) {
  return (
    <div className="border-2 shadow-md h-44 sm:h-64 bg-[#fbfbfb] rounded-2xl border-[#e0eaff] sm:bg-[#F5F7F8]">
      <div className="mt-4 mb-2 ml-7 mr-9 sm:mb-5">
        <div className="flex items-center">
          <div className="ml-2">
            <p className="text-sm font-bold sm:text-2xl2 text-blue">Credit cards</p>
          </div>
        </div>
        <div className="flex flex-col m-4 sm:m-6">
          <div className="sm:rounded-2xl sm:border-2 sm:min-w-max lg:w-96 sm:border-[#F5F5F5] sm:bg-[#FEFEFE]">
            <div className="flex items-center w-full mb-2 sm:mt-3 sm:mb-3">
              <div className="w-3/5 md:ml-4 sm:min-w-max">
                <img className="w-24 h-24" src="/slider/money-horizontal.svg" alt="Money" />
              </div>
              {/* CREDIT CARD BALANCE */}
              <div className="flex flex-col items-end sm:mr-6">
                <div className="text-xs font-medium text-blue sm:text-base2">Total amount</div>
                <div className="mt-1 text-xl font-bold sm:mt-3 2xl:text-3xl xl:text-2xl lg:text-xl sm:text-base2 text-blue">
                  {formatCurrency(balance || '')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
