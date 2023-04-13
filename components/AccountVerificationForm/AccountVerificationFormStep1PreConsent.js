import { useState } from 'react';
import { AccountVerificationFormLearnMoreModal } from './AccountVerificationFormLearnMoreModal';
import { StepHeading } from './StepHeading';
import { StepDescription } from './StepDescription';
import { useAccountVerificationForm } from './AccountVerificationFormProvider';
import { Button } from '@/components/Button';
import { useTernaryState } from '@/utils/useTernaryState';

export function AccountVerificationFormStep1PreConsent() {
  const { goToConsent } = useAccountVerificationForm();
  const [submitting, setSubmitting] = useState(false);
  // State for managing hiding/showing of the learn more model
  const [isLearnMoreModalOpen, closeLearnMoreModal] = useTernaryState(false);

  const onContinue = () => {
    goToConsent();
    setSubmitting(true);
  };

  return (
    <div className="flex flex-col flex-grow space-y-8 sm:space-y-12">
      <div className="flex flex-col justify-center flex-grow space-y-8">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-row justify-center sm:hidden">
            <img className="w-14 h-14 sm:w-24 sm:h-24" src="/product-logo-square.svg" alt="piper logo" />
          </div>
          {/* STEP HEADING */}
          {/* A short as possible heading to help the user quickly recognise the task at hand. */}
          <StepHeading>Let&rsquo;s connect your bank account</StepHeading>

          {/* STEP DESCRIPTION */}
          {/* PRODUCT-COPY: Value exchange, e.g. a paragraph that answers the question "Why should I connect my bank account?" 
          It's important to communicate the value exchange, i.e. what will the product be able to do once 
          the user has connected their bank. */}
          <StepDescription>
            We need to verify the details of the account from which to to track your spending.
          </StepDescription>
        </div>

        {/* PRE-CONSENT */}
        {/* This section aims to build trust. It's super important to clearly state valid and truthful arguments
        for why it's 100% secure to connect to their bank through the app. */}
        <ul role="list" className="rounded-lg">
          {/* Secure argument 1 */}
          <li className="flex flex-col items-center px-4 py-3 rounded-lg sm:flex-row sm:h-20 sm:px-6 bg-gradient-to-tr from-primary-bold to-secondary-bold space-x-4">
            {/* Icon: shield-check (outline) */}
            <div className="mb-2 sm:ml-4">
              <img src="/shield.svg" alt="shield" className="h-6 sm:h-6" />
            </div>
            <div className="flex flex-grow text-base font-medium leading-snug text-white sm:text-lg sm:pl-4">
              Bank grade 256-bit SSL encryption
            </div>
          </li>

          {/* Secure argument 2 */}
          <li className="flex items-center px-4 py-3 sm:py-6 sm:px-6 space-x-4 bg-primary-subtle-accent">
            {/* Icon: key (outline) */}
            <div className="sm:ml-4">
              <img src="/key.svg" alt="key" className="h-6 sm:h-5" />
            </div>
            <div className="flex flex-grow text-sm text-primary-bold sm:!ml-8 !ml-0">
              We never save your bank login credentials in the app
            </div>
          </li>

          {/* Secure argument 3 */}
          <li className="flex items-center px-4 py-3 rounded-b-lg sm:py-6 sm:px-6 space-x-4 bg-primary-subtle-accent">
            {/* Icon: credit-card (outline) */}
            <div className="sm:ml-4">
              <img src="/wallet-opaque.svg" alt="key" className="h-6 sm:h-5" />
            </div>
            <div className="flex flex-grow text-sm text-primary-bold sm:!ml-8 !ml-8 !pr-8">
              We cannot make transactions on your behalf
            </div>
          </li>
        </ul>

        {/* POWERED BY BASIQ API */}
        <p className="max-w-xs mx-auto text-xs leading-relaxed text-center sm:text-white">
          Powered by open data platform{' '}
          <a
            target="_blank"
            href="https://basiq.io"
            rel="noopener noreferrer"
            className="underline rounded outline-none text-primary-bold-darker hover:text-opacity-90 active:text-opacity-75 focus:ring-2 focus:ring-primary-bold focus:ring-opacity-30 ring-offset-1 ring-offset-transparent"
          >
            basiq.io
          </a>{' '}
          to securely connect your bank account.
        </p>

        {/* ACTIONS */}
        <div className="w-full mx-auto space-y-2 sm:w-64">
          <Button
            variant="bold"
            block
            loading={submitting}
            disabled={submitting}
            onClick={onContinue}
            data-cy="current-step"
          >
            Continue
          </Button>
        </div>

        {/** LEARN MORE MODAL */}
        <AccountVerificationFormLearnMoreModal
          isOpen={isLearnMoreModalOpen}
          onClose={closeLearnMoreModal}
          onConfirm={() => goToConsent()}
        />
      </div>
    </div>
  );
}
