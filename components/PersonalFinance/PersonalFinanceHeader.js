import { useRouter } from 'next/router';
import { useAccountVerificationForm } from '../AccountVerificationForm/AccountVerificationFormProvider';

export function PersonalFinanceHeader({ isMenuOpen, menuIconClick, profileMenuOpenClick, showProfileLine }) {
  const { resetForNewAccount } = useAccountVerificationForm();

  const router = useRouter();

  //Redirecting to account verification for adding new account
  function onAddAccountClick() {
    resetForNewAccount();
  }

  //Redirecting to profile page
  function onViewProfileClick() {
    router.push('/profile');
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-30 bg-header shadow-shead">
      {/* DESKTOP VIEW */}
      <div className="flex items-center justify-between hidden h-[9.5rem] sm:flex">
        <div className="flex justify-center w-1/4">
          <img
            className="h-12 w-15"
            onClick={menuIconClick}
            src={`${isMenuOpen ? '/left-menu-open.svg' : '/left-menu-close.svg'}`}
            alt="Menu"
          />
        </div>
        <div className="flex items-center w-1/4">
          <div className="mr-6">
            <img className="w-16 h-14" src="/add-account.svg" alt="Add Account" onClick={onAddAccountClick} />
          </div>
          <div>
            <img className="w-16 h-14" src="/view-profile.svg" alt="View Profile" onClick={profileMenuOpenClick} />
          </div>
        </div>
      </div>
      {/* MOBILE VIEW */}
      {/* If this is Home Page */}
      {showProfileLine && (
        <div className="flex justify-between h-20 mt-8 ml-6 mr-6 sm:hidden">
          <div>
            <img className="w-12 h-12" src="/view-profile.svg" alt="View Profile" onClick={onViewProfileClick} />
          </div>
          <div>
            <img className="w-12 h-12" src="/add-account.svg" alt="Add Account" onClick={onAddAccountClick} />
          </div>
        </div>
      )}
    </div>
  );
}
