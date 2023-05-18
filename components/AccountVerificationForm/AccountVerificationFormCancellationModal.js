import { Button } from '../Button';
import { Modal, ModalTitle } from '../Modal';

export const AccountVerificationFormCancellationModal = ({ isOpen, onClose, onConfirm, cancelling }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalTitle>
        Cancel connecting
        <br />
        bank account?
      </ModalTitle>
      <p className="text-sm leading-relaxed text-neutral-muted-darker">
        Any information you have provided so far will be deleted permanently. This action can not be undone.
      </p>
      <div className="space-y-2">
        <Button onClick={onConfirm} loading={cancelling} variant="critical" block>
          Yes, cancel
        </Button>
        <Button onClick={onClose} disabled={cancelling} variant="subtle" block>
          No, go back
        </Button>
      </div>
    </Modal>
  );
};
