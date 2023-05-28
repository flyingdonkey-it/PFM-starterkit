import { useRef } from 'react';
import { Button } from '../Button';
import { Modal, ModalTitle } from '../Modal';

export const AccountVerificationFormLearnMoreModal = ({ isOpen, onClose, onConfirm }) => {
  const connectButtonRef = useRef(null);

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocus={connectButtonRef}>
      <ModalTitle>
        Security you <br />
        can trust
      </ModalTitle>

      {/* API CONNECTION ILLUSTRATION */}
      {/* Illustration to communicate secure bank connection using Basiq */}
      <div className="space-y-2">
        {/* Dashed line - top */}
        <div className="px-8">
          <div className="h-4 border-t border-l border-r border-dashed rounded-t-lg border-neutral-dim"></div>
        </div>
        <div className="flex items-center justify-between">
          {/* Product logo - square */}
          <img className="w-16 h-16" src="/product-logo-square.svg" alt="Piper logo" />
          <div className="flex flex-col items-center justify-center space-y-1">
            {/* Icon: shield-check (outline) */}
            <svg
              className="w-12 h-12 flex-no-shrink"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                className="fill-current text-secondary-bold-darker"
                d="m41.236 11.969.968-.251a1 1 0 0 0-1.019-.748l.05.998ZM24 5.889l.667-.746a1 1 0 0 0-1.334 0l.667.745Zm-17.236 6.08.05-1a1 1 0 0 0-1.018.749l.968.25ZM24 41.243l-.25.968a1 1 0 0 0 .5 0l-.25-.968ZM41.185 10.97c-.392.02-.787.03-1.185.03v2c.431 0 .86-.011 1.286-.033l-.1-1.997ZM40 11a22.91 22.91 0 0 1-15.333-5.857l-1.334 1.49A24.911 24.911 0 0 0 40 13v-2ZM23.333 5.143A22.91 22.91 0 0 1 8 11v2a24.91 24.91 0 0 0 16.667-6.365l-1.334-1.49ZM8 11c-.398 0-.793-.01-1.185-.03l-.101 1.998c.426.022.855.032 1.286.032v-2Zm-2.204.719A25.043 25.043 0 0 0 5 18h2c0-1.998.255-3.935.732-5.781l-1.936-.501ZM5 18c0 11.65 7.968 21.437 18.75 24.212l.5-1.937C14.328 37.722 7 28.715 7 18H5Zm19.25 24.212C35.031 39.437 43 29.65 43 18h-2c0 10.715-7.329 19.722-17.25 22.275l.5 1.937ZM43 18c0-2.168-.276-4.274-.796-6.282l-1.936.501c.477 1.846.732 3.783.732 5.78h2Z"
              />
              <path
                className="stroke-current text-secondary-bold-darker"
                d="m18 24 4 4 8-8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* Basiq logo */}
            <img className="w-16 h-4" src="/basiq-logo.svg" alt="Basiq logo" />
          </div>
          {/* Bank illustration */}
          <img className="w-16 h-16" src="/bank-illustration.svg" alt="Bank illustration" />
        </div>
        {/* Dashed line - bottom */}
        <div className="px-8">
          <div className="h-4 border-b border-l border-r border-dashed rounded-b-lg border-neutral-dim"></div>
        </div>
      </div>

      {/* Secure argument 1 - Detail */}
      <div className="text-left space-y-2">
        <h4 className="font-semibold leading-snug text-md">Bank grade security</h4>
        <p className="text-sm leading-relaxed text-neutral-muted-darker">
          Powered by leading open banking platform{' '}
          <a
            target="_blank"
            href="https://basiq.io"
            rel="noopener noreferrer"
            className="underline rounded outline-none text-primary-bold-darker hover:text-opacity-90 active:text-opacity-75 focus:ring-2 focus:ring-primary-bold focus:ring-opacity-30 ring-offset-1 ring-offset-transparent"
          >
            basiq.io
          </a>
          , we use encryption trusted by all major banks, to keep your data private and secure. We undergo regular
          penetration testing and privacy compliance audits.
        </p>
      </div>

      {/* Secure argument 2 - Detail */}
      <div className="text-left space-y-2">
        <h4 className="font-semibold leading-snug text-md">This app will never save your bank login credentials</h4>
        <p className="text-sm leading-relaxed text-neutral-muted-darker">
          For ongoing data access, credentials are stored by Basiq using an AES 256-bit envelope encryption, which means
          they can never be made accessible to anyone.
        </p>
      </div>

      {/* Secure argument 3 - Detail */}
      <div className="text-left space-y-2">
        <h4 className="font-semibold leading-snug text-md">We can not transact on your behalf</h4>
        <p className="text-sm leading-relaxed text-neutral-muted-darker">
          All access to data is read-only, meaning we can see accounts and transactions to report on them, but are
          unable to perform any actions on behalf of the user without explicit permission to do so.
        </p>
      </div>

      {/* Secure argument 4 - Detail */}
      <div className="text-left space-y-2">
        <h4 className="font-semibold leading-snug text-md">We will never sell your data</h4>
        <p className="text-sm leading-relaxed text-neutral-muted-darker">
          We will only share your data with parties or applications where you have provided permission. All your data is
          stored securely.
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <Button ref={connectButtonRef} onClick={onConfirm} variant="bold" block>
          Securely connect my account
        </Button>
        <Button onClick={onClose} variant="subtle" block>
          Not right now
        </Button>
      </div>
    </Modal>
  );
};
