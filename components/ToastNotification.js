import { Transition } from '@headlessui/react';
import { toast, Toaster, resolveValue } from 'react-hot-toast';

// ToastNotification based on https://react-hot-toast.com/docs/toaster
export function ToastNotification() {
  return (
    <Toaster
      containerClassName="mx-auto w-72 sm:w-96"
      toastOptions={{
        duration: 5000,
      }}
    >
      {t => (
        <Transition
          appear
          show={t.visible}
          className={`flex space-x-3 rounded-lg text-black p-3 shadow-lg border-l-8 ${
            APPEARANCE_MAP[t.appearance]
          } transform`}
          enter="transition-all duration-150"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"
        >
          {/* Toast icon */}
          {t.appearance === 'critical' ? (
            // Icon: exclamation-circle (solid)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0 w-6 h-6 text-critical-bold"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            // Icon: check-circle (solid)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0 w-6 h-6 text-success-bold"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          )}

          {/* Toast content */}
          <div className="flex flex-col flex-grow space-y-1">
            {t.title && <span className="font-medium leading-normal">{resolveValue(t.title)}</span>}
            {t.message && <span className="text-sm">{resolveValue(t.message)}</span>}
          </div>

          {/* Dismiss */}
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex items-center justify-center flex-shrink-0 w-6 h-6 rounded outline-none hover:opacity-90 active:opacity-75 focus:ring-2 focus:ring-neutral-muted focus:ring-opacity-30 ring-offset-1 ring-offset-transparent"
          >
            <span className="sr-only">Dismiss</span>
            {/* Icon: x (solid) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0 w-5 h-5 text-neutral-muted"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </Transition>
      )}
    </Toaster>
  );
}

const APPEARANCE_MAP = {
  critical: 'bg-critical-subtle border-critical-bold',
  success: 'bg-success-subtle border-success-bold',
};
