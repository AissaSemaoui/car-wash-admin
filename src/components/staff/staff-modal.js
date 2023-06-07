import React from "react";
import { Modal, ModalHeader } from "reactstrap";
import StaffForm from "./staff-form";

function StaffModal({ open, onCloseModal, onSubmit }) {
  return (
    <Modal isOpen={open} toggle={onCloseModal}>
      <ModalHeader toggle={onCloseModal}>
        <h5 className="modal-title f-w-600" id="exampleModalLabel2">
          Create New Worker
        </h5>
      </ModalHeader>
      <StaffForm onSubmit={onSubmit} />
    </Modal>
  );
}

export default StaffModal;
