import { Button } from '../Button';
import { useAccountVerificationForm } from './AccountVerificationFormProvider';
import { StepHeading } from './StepHeading';
import { StepDescription } from './StepDescription';
import { formatCurrency } from '@/utils/formatCurrency';

export const AccountVerificationFormStep5Summary = () => {
  const { finish, accountVerificationFormState } = useAccountVerificationForm();

  const { selectedAccount } = accountVerificationFormState;
  if (!selectedAccount) return null;

  return (
    <div className="flex flex-col flex-grow space-y-8 sm:space-y-12">
      {/* SUCCESS ANIMATION */}
      <div className="flex justify-center">
        {/* Icon: check-circle (outline) */}
        <svg
          className="w-[68px] h-[68px] -m-1.5 sm:w-20 sm:h-20 sm:-mx-2 sm:-my-2 text-secondary-bold-darker checkmark"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            className="checkmark__circle"
            d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            stroke="url(#gradient)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={56}
            strokeDashoffset={56}
          />
          <path
            className="checkmark__check"
            d="m9 12 2 2 4-4"
            stroke="url(#gradient)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={10}
            strokeDashoffset={10}
          />
          <defs>
            <linearGradient id="gradient" x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--color-primary-bold)" />
              <stop offset="1" stopColor="var(--color-secondary-bold)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex flex-col space-y-8">
        <div className="space-y-3 sm:space-y-4">
          {/* STEP HEADING */}
          <StepHeading>You&rsquo;re all set!</StepHeading>

          {/* STEP DESCRIPTION */}
          {/* PRODUCT-COPY: Re-iterate the value exchange to the user. */}
          <StepDescription>
            We have verified the details of the bank account below, and you&rsquo;re good to go.
          </StepDescription>
        </div>

        {/* SUMMARY */}
        <ul role="list" className="border-t border-b divide-y border-neutral-dim">
          <li className="flex items-center py-3 space-x-4">
            <div className="flex flex-col flex-grow">
              <span className="font-medium">{selectedAccount.name}</span>
              <span className="text-xs font-medium">{formatCurrency(selectedAccount.balance)}</span>
            </div>

            {/* Connected bank logo */}
            <div className="relative">
              {/* Icon: check-circle (solid) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute w-6 h-6 bg-white border-white rounded-full -top-2 -right-2 text-success-bold"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </li>
        </ul>

        {/* PRODUCT-COPY */}
        {/* It's recommended to give the user the ability to remove their 
        bank connection should they wish to. This paragraph is just a mock example. */}
        <p className="text-xs text-center sm:text-sm text-neutral-muted-darker">
          You can manage your bank connections <br />
          in the app settings later.
        </p>

        {/* Action */}
        <Button variant="bold" block onClick={finish}>
          Done
        </Button>
      </div>
    </div>
  );
};
