import { formatCurrency } from '@/utils/formatCurrency';

export const AccountItemDetail = ({ onClose, selectedAccount }) => {
  //Close account detail page
  const onBackButtonClick = () => {
    onClose();
  };

  //Formatting date field
  const getDateAsFormatted = updateDate => {
    return `${updateDate.slice(8, 10)}/${updateDate.slice(5, 7)}/${updateDate.slice(0, 4)} ${updateDate.slice(11, 16)}`;
  };

  return (
    <div>
      <div className="flex justify-between mt-24 ml-5 mr-5 sm:mt-12 sm:ml-96 sm:mr-96">
        <div>
          <img className="w-8 h-8" src="/back-button.svg" alt="Back" onClick={onBackButtonClick} />
        </div>
        <div className="flex flex-col items-center">
          <div>
            <img className="w-16 h-16 rounded-full" src={selectedAccount.accountDetail.logo.links.square} alt="logo" />
          </div>
          <div className="flex flex-col items-center mt-8 font-semibold text-center">
            <div className="text-2xl2 text-primary-bold">{selectedAccount.accountItem.institution}</div>
            <div className="text-green-link">{selectedAccount.accountsType}</div>
          </div>
        </div>
        <div>
          <img className="w-8 h-8" src="/share-button.svg" alt="Share" />
        </div>
      </div>
      <div className="ml-6 mr-6 sm:ml-96 sm:mr-96">
        <div className="flex justify-between mt-8 font-semibold sm:hidden text-2xl2 text-primary-bold">
          <div>Total:</div>
          <div>{formatCurrency(selectedAccount.accountItem.availableFunds)}</div>
        </div>
        <div className="justify-between hidden p-6 mt-8 font-semibold sm:flex text-2xl2 text-primary-bold bg-[#F5F7F8]">
          <div>Total:</div>
          <div>{formatCurrency(selectedAccount.accountItem.availableFunds)}</div>
        </div>
        <div className="sm:flex sm:mt-8 ">
          <div className="sm:ml-16">
            <div className="mt-7 text-base2">
              <div>Account number</div>
              <div className="mt-1 font-semibold">{selectedAccount.accountItem.accountNo}</div>
            </div>
            <div className="mt-7 text-base2">
              <div>Account holder</div>
              <div className="mt-1 font-semibold">{selectedAccount.accountItem.accountHolder}</div>
            </div>
            <div className="mt-7 text-base2">
              <div>Date and time</div>
              <div className="mt-1 font-semibold">{getDateAsFormatted(selectedAccount.accountItem.lastUpdated)}</div>
            </div>
            <div className="mt-7 text-base2">
              <div>Phone number</div>
              <div className="mt-1 font-semibold">(03) 94******</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
