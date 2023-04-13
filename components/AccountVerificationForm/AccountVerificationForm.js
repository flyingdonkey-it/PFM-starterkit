import { useEffect } from 'react';
import { PlanetIllustrations } from '../PlanetIllustrations';
import { StepLogo } from './StepLogo';
import { AccountVerificationFormStep0SignUp } from './AccountVerificationFormStep0SignUp';
import { AccountVerificationFormStep1PreConsent } from './AccountVerificationFormStep1PreConsent';
import { AccountVerificationFormStep4SelectAccount } from './AccountVerificationFormStep4SelectAccount';
import { AccountVerificationFormStep5Summary } from './AccountVerificationFormStep5Summary';
import { useAccountVerificationForm } from './AccountVerificationFormProvider';
import { AccountVerificationFormCancellationModal } from './AccountVerificationFormCancellationModal';
import { AccountVerificationFormStep3LoadingSteps } from './AccountVerificationFormStep3LoadingSteps';
import { useTernaryState } from '@/utils/useTernaryState';

export const FORM_COMPONENTS = [
  AccountVerificationFormStep0SignUp,
  AccountVerificationFormStep1PreConsent,
  AccountVerificationFormStep3LoadingSteps,
  AccountVerificationFormStep4SelectAccount,
  AccountVerificationFormStep5Summary,
];

export function AccountVerificationForm() {
  const { currentStep, totalSteps, cancel, cancelling } = useAccountVerificationForm();
  const Component = FORM_COMPONENTS[currentStep];

  // State for managing hiding/showing of the cancellation model
  const [isCancellationModalOpen, openCancellationModal, closeCancellationModal] = useTernaryState(false);

  // When the user changes steps, scroll to the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  return (
    <div className="flex flex-col justify-center min-h-screen sm:bg-gradient-to-tr from-primary-bold to-primary-accent">
      {/* FORM STEPS COMPONENT */}
      <div className="z-10 px-8 pb-24 mx-auto text-center sm:px-64 sm:pb-16 space-y-6 sm:space-y-8 sm:bg-neutral-subtle-alternate/50 rounded-2xl backdrop-opacity-60">
        <div className={`absolute top-0 left-6 sm:w-12 sm:h-12 w-10 ${currentStep === 1 ? 'sm:block hidden' : ''}`}>
          <StepLogo src="/product-logo-square.svg" alt="Piper logo" />
        </div>
        <Component />
      </div>

      {/* CANCEL BANK CONNECTION */}
      {/* Important to not lock the user in. They should be able to regret 
      their decision to connect with a bank at any point. */}
      {/* Show Cancel button unless the user is on the first or last step */}
      {currentStep > 0 && currentStep !== totalSteps - 1 ? (
        <div className="absolute top-0 right-0 z-20 px-4 pt-8 leading-none sm:px-6 md:px-8 sm:pt-8 md:fixed">
          <button
            className="text-xs rounded outline-none sm:text-sm text-primary-bold-darker hover:text-opacity-90 active:text-opacity-75 focus:ring-2 focus:ring-primary-bold focus:ring-opacity-30 ring-offset-1 ring-offset-transparent sm:text-white"
            onClick={openCancellationModal}
          >
            Cancel
          </button>
        </div>
      ) : null}

      {/* CANCELLATION MODAL */}
      <AccountVerificationFormCancellationModal
        isOpen={isCancellationModalOpen}
        onClose={closeCancellationModal}
        onConfirm={cancel}
        cancelling={cancelling}
      />
      <PlanetIllustrations hiddenOnMobile={true} />
    </div>
  );
}
