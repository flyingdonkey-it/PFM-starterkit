import { useEffect, useState } from 'react';
import { useFormState } from 'react-use-form-state';
import { useAccountVerificationForm } from './AccountVerificationFormProvider';
import { StepLogo } from './StepLogo';
import { StepHeading } from './StepHeading';
import { Button } from '@/components/Button';
import { TextField } from '@/components/TextField';
import { ErrorMessage } from '@/components/ErrorMessage';
import { axios } from '@/utils/axios';

export const AccountVerificationFormStep0SignUp = () => {
  const { goToStep, updateAccountVerificationFormState, goForward } = useAccountVerificationForm();

  const [formState, { email }] = useFormState();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState();

  // Check for a current user session and if they have been directed from the consent UI & orward them to the account selection step
  useEffect(() => {
    // document.referrer will be null if directed to a page using http, so skip that check for development
    if (process.env.NODE_ENV !== 'production') {
      sessionStorage.getItem('userId') ? goToStep(2) : null;
    } else {
      sessionStorage.getItem('userId') && document.referrer === 'https://consent.basiq.io/' ? goToStep(2) : null;
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitting(true);
    axios
      .post('/api/create-user', formState.values)
      .then(async res => {
        setSubmitting(false);
        updateAccountVerificationFormState({ user: res.data });
        sessionStorage.setItem('userId', res.data.id);
        sessionStorage.setItem('email', formState.values.email);
        goForward();
      })
      .catch(error => {
        setSubmitting(false);
        setError(error);
      });
  };

  return (
    <div className="relative flex flex-col h-screen sm:w-[36rem] space-y-6 sm:h-fit sm:static">
      {/* STEP LOGO */}
      {/* To help the user keep context of what product they're using, */}
      {/* and what bank they're about to connect to. */}
      <div className="flex flex-row justify-center">
        <StepLogo src="/user.svg" alt="User logo" />
      </div>

      <div className="flex flex-col space-y-8">
        {/* STEP HEADING */}
        {/* A short as possible heading to help the user quickly recognise the task at hand. */}
        {/* PRODUCT-COPY: Depending on your product (if you're adding a real user account creation e.g.) */}
        <StepHeading>Sign up with your e-mail to get started</StepHeading>

        {/* CREATE USER FORM */}
        {/* This form is just a fake sign up form, with the purpose of creating a user in Basiq's API 
        (needed to Create Connections). If your app needs to have users, it's a great idea to replace 
        or build out this form, and then use the email address from your app's user to Create User in the API.
        PS. You can also use mobile number to Create User in the API */}
        <form onSubmit={handleSubmit}>
          {/** Error state */}
          {error && <ErrorMessage message={error.message} />}
          <TextField {...email('email')} id="email" label="E-mail" placeholder=" " disabled={submitting} required />

          {/* Terms and Conditions */}
          {/* PRODUCT-COPY: Depending on your product (if you're adding a real user account creation e.g.) */}
          <div className="absolute bottom-16 w-full sm:static">
            <p className="max-w-xs mx-auto mb-8 text-xs leading-relaxed text-center sm:text-white sm:!mt-20 sm:mb-4">
              By continuing you agree to the Terms and Conditions and our Privacy Policy.
            </p>

            {/* Actions */}
            <div className="mx-auto space-y-2 sm:w-64">
              <Button type="submit" loading={submitting} variant="bold" block data-cy="current-step">
                Continue
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
