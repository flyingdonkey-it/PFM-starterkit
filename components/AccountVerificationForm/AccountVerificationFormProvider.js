import toast from 'react-hot-toast';
import { useEffect, useState, createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import { getClientToken } from '../../clientAuthentication';
import { FORM_COMPONENTS } from './AccountVerificationForm';
import { axios } from '@/utils/axios';

const AccountVerificationFormContext = createContext({
  // The current step number of the form the user on
  currentStep: undefined,
  // The total amount of steps in the form
  totalSteps: undefined,
  // Function to navigate the user to the previous step
  goBack: undefined,
  // Function to navigate the user two steps back
  goToStep: undefined,
  // Function to navigate the user to the next step
  goForward: undefined,
  // Function to cancel the the users verification. A confirmation modal will be triggered.
  cancel: undefined,
  // If true, the cancellation process is in progress
  cancelling: undefined,
  // Function to call when the user has completed the form
  finish: undefined,
  // The state of the verification form, this is used to pass values between multiple steps
  accountVerificationFormState: undefined,
  // Function to update the verification form state
  updateAccountVerificationFormState: undefined,
  // The state of the secure connection to the basiq API. See `useBasiqConnection`
  basiqConnection: undefined,
  // Function to reset the state of the form
  reset: undefined,
  // Function to be called when the user has successfully finished all steps
  hasCompletedForm: undefined,
  // Function to redirect user to Basiq Consent UI
  goToConsent: undefined,
  createBasiqConnection: undefined,
  refreshBasiqConnection: undefined,
});

// This custom hook gives components access the `AccountVerificationFormContext` form context
export const useAccountVerificationForm = () => useContext(AccountVerificationFormContext);

const initialAccountVerificationFormState = {
  user: undefined,
  selectedInstitution: undefined,
  selectedAccount: undefined,
};

export function AccountVerificationFormProvider({ children }) {
  const router = useRouter();

  const [accountVerificationFormState, setAccountVerificationFormState] = useState(initialAccountVerificationFormState);
  const updateAccountVerificationFormState = newState => {
    setAccountVerificationFormState(oldState => ({ ...oldState, ...newState }));
  };
  const [hasCompletedForm, setHasCompletedForm] = useState(false);

  // State for managing which step of the form to display
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = FORM_COMPONENTS.length;
  const goBack = () => setCurrentStep(step => (step === 0 ? 0 : step - 1));
  const goToStep = step => setCurrentStep(step);
  const goForward = () => setCurrentStep(step => (step === totalSteps - 1 ? totalSteps - 1 : currentStep + 1));

  // State for managing the basiq connection
  const { basiqConnection, createBasiqConnection, refreshBasiqConnection, deleteBasiqConnection } = useBasiqConnection({
    currentStep,
    userId: accountVerificationFormState.user?.id,
    selectedInstitution: accountVerificationFormState.selectedInstitution,
  });

  function resetState() {
    setAccountVerificationFormState(initialAccountVerificationFormState);
    setCurrentStep(0);
    setCancelling(false);
    setHasCompletedForm(false);
    sessionStorage.clear();
  }

  async function resetStateForNewAccount() {
    const email = sessionStorage.getItem('email');

    await deleteBasiqConnection();

    setAccountVerificationFormState(initialAccountVerificationFormState);
    setCurrentStep(1);
    setCancelling(false);
    setHasCompletedForm(false);
    sessionStorage.clear();

    axios
      .post('/api/create-user', { email: email })
      .then(async res => {
        updateAccountVerificationFormState({ user: res.data });

        sessionStorage.setItem('userId', res.data.id);
        sessionStorage.setItem('email', email);

        router.push('/account-verification');
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  }

  // State for managing cancelling the account verification form
  const [cancelling, setCancelling] = useState(false);
  async function cancel() {
    // Cancelling at the first step doesn't require a confirmation modal as the user has not submitted any form data yet
    if (currentStep === 0) {
      router.push('/');
      return;
    }
    setCancelling(true);
    try {
      await deleteBasiqConnection();
      router.push('/');
      sessionStorage.clear();
      resetState();
    } catch {
      // If something went wrong while deleting the basiq connection, we send the user to the home page via a full page refresh so all state is reset
      window.location = window.location.origin;
    }
  }

  // Called when the user has successfully finished all steps
  async function finish() {
    try {
      // Delete user at end of process when not in prod to clean up test data
      // You can also enable this for production if you do not wish to maintain the user bucket or connection e.g. for a once off check
      // TODO: kerimcem - This will be opened when personal finance app is completed fully
      // if (process.env.NODE_ENV !== 'production') {
      //   await deleteUser()
      // }
      setHasCompletedForm(true);
      //sessionStorage.clear()
      router.push('/personal-finance');
    } catch {
      // If something went wrong while deleting the basiq connection, we send the user to the home page via a full page refresh so all state is reset
      window.location = window.location.origin;
    }
  }

  // Redirect to the external Basiq Consent UI
  async function goToConsent(action = null) {
    let userId = sessionStorage.getItem('userId');
    const token = await getClientToken(userId);
    window.location = `https://consent.basiq.io/home?userId=${userId}&token=${token}&action=${action}`;
  }

  const contextValue = {
    currentStep,
    totalSteps,
    goBack,
    goToStep,
    goForward,
    cancel,
    cancelling,
    finish,
    accountVerificationFormState,
    updateAccountVerificationFormState,
    getUserConsent,
    basiqConnection,
    createBasiqConnection,
    refreshBasiqConnection,
    reset: resetState,
    resetForNewAccount: resetStateForNewAccount,
    hasCompletedForm,
    goToConsent,
    deleteUser,
  };

  return (
    <AccountVerificationFormContext.Provider value={contextValue}>{children}</AccountVerificationFormContext.Provider>
  );
}

// Custom hook for managing the connect to the Basiq API
function useBasiqConnection({ currentStep, userId }) {
  const { asPath } = useRouter();

  const [jobId, setJobId] = useState();
  const [inProgress, setInProgress] = useState(false);
  const [estimatedProgress, setEstimatedProgress] = useState();
  const [stepNameInProgress, setStepNameInProgress] = useState();
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState();

  function resetState() {
    setInProgress(false);
    setEstimatedProgress(undefined);
    setStepNameInProgress(undefined);
    setCompleted(false);
    setError(undefined);
  }

  // Reset our state anytime the current step changes
  useEffect(() => {
    resetState();
  }, [currentStep]);

  // The estimated time job is expected time to take (in milliseconds)
  // For this demo, we only care about the "verify-credentials" and "retrieve-accounts" step
  const estimatedTime = 1000;

  async function deleteBasiqConnection() {
    if (!jobId || !userId) return;
    await deleteConnection({ jobId, userId });
  }

  async function createBasiqConnection() {
    let newJobId = new URLSearchParams(window.location.search).get('jobId');
    setInProgress(true);
    // Optimisic UI. We know the first job basiq will process will always be "verify-credentials"
    setStepNameInProgress('verify-credentials');
    setJobId(newJobId);
  }

  async function refreshBasiqConnection(userId) {
    if (!userId) {
      return;
    }

    const response = await refreshConnection(userId);
    if (response.status === 200) {
      resetState();
      setJobId(response?.data?.data[0]?.id);
    }
  }

  // If we have a basiq connection, check the status every 2 seconds
  useEffect(() => {
    // We can't start a job without this information
    if (!jobId) return;
    // If a job was started, but an error occurred or it's finished, we can stop polling
    if (error || completed) return;

    // Immediately check the status of the job
    checkJobStatus();

    // Check the status of the job every 2 seconds
    const timer = setInterval(checkJobStatus, 2000);

    async function checkJobStatus() {
      try {
        const response = await checkConnectionStatus({ jobId });
        // A job contains multiple steps which can either be "pending" | "in-progress" | "success" | "failed"
        // In this demo, we only care about the "verify-credentials" and "retrieve-accounts" steps
        const filteredSteps = response.data.steps.filter(
          ({ title }) =>
            title === 'verify-credentials' || title === 'retrieve-accounts' || title === 'retrieve-transactions'
        );

        // Check which step is in progress or if any steps have failed
        let stepError;
        for (const step of filteredSteps) {
          if (step.status === 'in-progress') {
            setStepNameInProgress(step.title);
            break;
          }
          if (step.status === 'failed') {
            stepError = newStepError(step.result);
            break;
          }
        }

        if (stepError) {
          setError(stepError);
          return;
        }

        // Check if all steps have been completed
        const completed = filteredSteps.every(step => step.status === 'success');

        setCompleted(completed);
        setInProgress(!completed);
        if (completed) setEstimatedProgress(100);
      } catch (error) {
        setError(error);
      }
    }

    return () => {
      clearInterval(timer);
    };
  }, [completed, error, jobId, userId]);

  // We want the job polling experience to be an engaging experience for the user, we here we are
  // using the estimated connection time to show a progress bar which will get updated every 500ms
  useEffect(() => {
    if (!inProgress || error) return;
    const start = Date.now();
    const timer = setInterval(checkEstimatedProgress, 500);

    function checkEstimatedProgress() {
      const progress = Math.round(((Date.now() - start) / estimatedTime) * 100);
      if (progress >= 100) {
        setEstimatedProgress(100);
        clearInterval(timer);
      } else {
        setEstimatedProgress(progress);
      }
    }

    return () => {
      clearInterval(timer);
    };
  }, [inProgress, error, estimatedTime]);

  // If the user has decided to exit and resume process in background we will
  // trigger a toast when the job finishes processing or an error occurres
  useEffect(() => {
    if (!jobId) return; // Make sure we only trigger the toast when you're on the step 3
    if (asPath === '/account-verification') return;
    if (error) {
      toast.error(error.message, {
        title: error.name,
        appearance: 'critical',
      });
      return;
    }
  }, [jobId, asPath, completed, error]);

  // Some banks can be pretty slow to connect with and often take longer than their estimated time
  // To improve the UX, we can use this variable to let the user know it's taking longer than expected
  const estimatedTimeOver = inProgress && estimatedProgress >= 95;

  // If the job is taking longer than the expected we will show 95% until the job is raedy
  const progress = estimatedProgress;

  return {
    basiqConnection: {
      inProgress,
      jobId,
      setJobId,
      progress,
      stepNameInProgress,
      estimatedTime,
      estimatedTimeOver,
      error,
      completed,
      reset: resetState,
    },
    getUserConsent,
    deleteBasiqConnection,
    createBasiqConnection,
    refreshBasiqConnection,
  };
}

// The reason for attatching these properties to the error object is because we will use
// thes e properties to display information about the error in `AccountVerificationFormStep3LoadingSteps`
export function newStepError({ detail, title }) {
  const error = new Error();
  error.message = detail;
  error.name = title;
  return error;
}

// Creates a new connection with the Basiq API
// IMPORTANT: Under no circumstance should you store your customers credentials anywhere in your application
// https://api.basiq.io/reference/create-a-connection
// https://api.basiq.io/reference/jobs
async function getUserConsent(userId) {
  const response = await axios.get(`https://au-api.basiq.io/users/${userId}/consents`);
  return response.data;
}

// Permanently deletes a connection with the Basiq API
// Once the connection has been deleted, all of the associated financial data e.g. accounts and transactions can still be accessed via the users end-point
// https://api.basiq.io/reference/delete-a-connection
async function deleteConnection({ userId, jobId }) {
  const response = await axios.delete(`https://au-api.basiq.io/users/${userId}/connections/${jobId}`);
  return response.data.id;
}

async function deleteUser({ userId }) {
  const response = await axios.delete(`https://au-api.basiq.io/users/${userId}`);
  return response.data.id;
}

// Retrieves the details of the connection
// https://api.basiq.io/reference/retrieve-a-job
export async function checkConnectionStatus({ jobId }) {
  const response = await axios.get(`https://au-api.basiq.io/jobs/${jobId}`);
  return response;
}

export async function refreshConnection(userId) {
  const response = await axios.post(`/api/refresh-connection?userId=${userId}`);
  return response;
}