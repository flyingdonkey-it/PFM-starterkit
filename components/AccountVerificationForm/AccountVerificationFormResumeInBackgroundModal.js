import Link from 'next/link';
import { Button } from '../Button';
import { Modal, ModalTitle } from '../Modal';

export function AccountVerificationFormResumeInBackgroundModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalTitle>Exit and resume process in background?</ModalTitle>
      <div className="space-y-2">
        <p className="text-sm leading-relaxed text-neutral-muted-darker">
          You will be notified when it&rsquo;s ready to continue the setup.
        </p>
      </div>
      <div className="space-y-2">
        <Link href="/" passHref>
          <Button as="a" variant="bold" block>
            Yes, exit
          </Button>
        </Link>
        <Button onClick={onClose} variant="subtle" block>
          No, go back
        </Button>
      </div>
    </Modal>
  );
}
