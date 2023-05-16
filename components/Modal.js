import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export const Modal = ({ children, isOpen, onClose, initialFocus }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-40 overflow-y-auto" onClose={onClose} initialFocus={initialFocus}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative inline-block w-full max-w-sm p-6 my-4 overflow-hidden align-middle bg-white rounded-lg shadow-xl transition-all space-y-6">
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export const ModalTitle = ({ children }) => {
  return (
    <Dialog.Title as="h3" className="text-2xl font-semibold leading-tight tracking-tight text-primary-bold">
      {children}
    </Dialog.Title>
  );
};
