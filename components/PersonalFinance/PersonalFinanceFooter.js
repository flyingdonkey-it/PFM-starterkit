export const PersonalFinanceFooter = ({ menuItems, middleMenuItems, onMenuItemClick }) => {
  //When any page item clicked
  const onItemClick = selectedPageIndex => {
    onMenuItemClick(selectedPageIndex);
  };

  //DESKTOP VIEW ONLY
  return (
    <div className="bottom-0 left-0 right-0 hidden top-72 bg-footer sm:flex">
      <div className="flex justify-around w-full mt-14 mb-14">
        <div className="flex justify-center w-2/5 sm:min-w-max">
          <div className="w-1/2 text-2xl2 text-header">
            {/* MENU ITEMS ON LEFT */}
            {menuItems.map((m, i) => {
              return (
                <div key={`menu-item-${i}`} className="flex items-center pb-8" onClick={() => onItemClick(m.pageIndex)}>
                  <div>
                    <img className="w-5 h-5" src={`${m.image}`} alt={`${m.title}`} />
                  </div>
                  <div className="ml-4 font-normal">{m.title}</div>
                </div>
              );
            })}
          </div>
          <div className="text-2xl2 text-header">
            {/* MENU ITEMS IN MIDDLE */}
            {middleMenuItems.map((m, i) => {
              return (
                <div key={`menu-item-${i}`} className="flex items-center pb-8">
                  <div>
                    <img className="w-5 h-5" src={`${m.image}`} alt={`${m.title}`} />
                  </div>
                  <div className="ml-4">{m.title}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col mt-16">
          <div className="flex self-end w-1/4">
            <img className="w-16 h-16" src="/product-logo-square.svg" alt="Logo" />
          </div>
          <div className="flex self-end mt-4 font-medium text-white text-base2">Personal Finance Management</div>
          <div className="flex self-end mt-8 text-sm2 text-header">
            <div className="font-normal">
              Powered by open data platform{' '}
              <a href="https://basiq.io" className="underline text-green-link">
                basiq.io
              </a>{' '}
              to securely connect your bank account.
            </div>
            <div className="font-medium underline ml-3.5">Privacy Policy</div>
          </div>
        </div>
      </div>
    </div>
  );
};
