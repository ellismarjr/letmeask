import Modal from 'react-modal';
import { FiTrash2 } from 'react-icons/fi';

import './styles.scss';

type ModalConfirmationProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  onRequestConfirm: () => void;
};

export function ModalConfirmation({
  isOpen,
  onRequestClose,
  onRequestConfirm,
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

        <h1>Encerrar Sala</h1>
        <span>Tem certeza que você deseja encerrar esta sala?</span>

        <div className="buttons">
          <button className="btn-cancel" type="button" onClick={onRequestClose}>
            Cancelar
          </button>
          <button
            className="btn-confirm"
            type="button"
            onClick={onRequestConfirm}
          >
            Sim, encerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}
