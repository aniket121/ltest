import React from 'react';
import Dialog from 'material-ui/Dialog';
import styles from './Modal.css';

const Modal = ({ title, open, closeModal, children }) => {
  return (
    <Dialog
      title={title}
      titleClassName={styles.modalTitle}
      contentClassName={styles.modal}
      open={open}
      modal
    >
      <div className={styles.closeModal}
        onClick={() => closeModal(false)}>
        Close &times;
      </div>
      {children}
    </Dialog>
  );
}

export default Modal;
