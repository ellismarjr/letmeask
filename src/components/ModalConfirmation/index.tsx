import Modal from 'react-modal';
import { FiTrash2 } from 'react-icons/fi';

import './styles.scss';

type ModalConfirmationProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  onRequestConfirm: () => void;
  title: string;
  message: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
};

export function ModalConfirmation({
  isOpen,
  onRequestClose,
  onRequestConfirm,
  title,
  message,
  cancelButtonText = 'Cancelar',
  confirmButtonText = 'Sim',
}: ModalConfirmationProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <div className="container">
        <FiTrash2 size={32} color="#E73F5D" />

        <h1>{title}</h1>
        <span>{message}</span>

        <div className="buttons">
          <button className="btn-cancel" type="button" onClick={onRequestClose}>
            {cancelButtonText}
          </button>
          <button
            className="btn-confirm"
            type="button"
            onClick={onRequestConfirm}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
