import { Button } from '@/components/Button';
import { formatCurrency } from '@/utils/formatCurrency';

export function TransactionItemDetail({ detail, closeTransactionDetailClick, currentAccount }) {
  function onBackButtonClick() {
    closeTransactionDetailClick();
  }

  function getPostDateAsFormatted(postDate) {
    return `${postDate.slice(8, 10)}/${postDate.slice(5, 7)}/${postDate.slice(0, 4)} ${postDate.slice(11, 16)}`;
  }

  return (
    <div className="sm:flex sm:items-center sm:justify-center">
      <div className="ml-6 mr-6">
        <div className="flex justify-between mt-10 sm:mt-12">
          <div>
            <img className="w-8 h-8" src="/back-button.svg" alt="Back" onClick={onBackButtonClick} />
          </div>
          <div className="flex flex-col items-center">
            <div>
              <img
                className="w-12 h-12 sm:w-16 sm:h-16"
                src={`/merchant-${parseInt((Math.random() * 100) % 4)}.svg`}
                alt="Merchant"
              />
            </div>
            <div className="flex flex-col items-center mt-4 font-semibold text-center sm:mt-8">
              <div className="text-base sm:text-2xl2 text-primary-bold">
                {detail.enrich?.merchant?.businessName || detail.description.slice(0, 28)}
              </div>
              <div className="text-green-link">{detail.enrich?.category?.anzsic.division.title || 'Shopping'}</div>
            </div>
          </div>
          <div>
            <img className="w-8 h-8" src="/share-button.svg" alt="Share" />
          </div>
        </div>
        <div className="sm:ml-44 sm:mr-44">
          <div className="flex justify-between mt-8 text-base font-semibold sm:hidden text-primary-bold">
            <div>Amount:</div>
            <div>{formatCurrency(detail.amount)}</div>
          </div>
          <div className="justify-between hidden p-6 mt-8 font-semibold sm:flex sm:text-2xl2 text-primary-bold bg-[#F5F7F8]">
            <div>Amount:</div>
            <div>{formatCurrency(detail.amount)}</div>
          </div>
          <div className="justify-around sm:flex sm:mt-8">
            <div>
              <div className="mt-3 text-xs">
                <div>Date and time</div>
                <div className="mt-1 font-semibold">{getPostDateAsFormatted(detail.postDate)}</div>
              </div>
              <div className="mt-3 text-xs">
                <div>Account used</div>
                <div className="mt-1 font-semibold">{currentAccount.name}</div>
              </div>
              <div className="mt-3 text-xs">
                <div>Phone number</div>
                <div className="mt-1 font-semibold">
                  {detail.enrich?.merchant?.phoneNumber.local || '(03) 94******'}
                </div>
              </div>
              <div className="mt-3 text-xs">
                <div>Location</div>
                <div className="mt-1 font-semibold">
                  {detail.enrich?.location?.formattedAddress || '301 Spring St, VIC Australia'}
                </div>
              </div>
            </div>
            <div className="hidden mt-4 sm:block">
              <img className="h-40 w-96" src="/location.svg" alt="Share" />
            </div>
          </div>
          <div className="mt-4 sm:hidden">
            <img className="h-40 w-96" src="/location.svg" alt="Share" />
          </div>
          <div className="flex flex-col mt-4 sm:mt-10 sm:hidden">
            <div>
              <Button style={{ width: '100%' }}>All transactions with this merchant</Button>
            </div>
            <div className="mt-1">
              <Button style={{ width: '100%' }}>More from this category</Button>
            </div>
          </div>
          <div className="items-baseline hidden mt-10 mb-32 sm:flex">
            <div>
              <Button>All transactions with this merchant</Button>
            </div>
            <div className="ml-5">
              <Button>More from this category</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
