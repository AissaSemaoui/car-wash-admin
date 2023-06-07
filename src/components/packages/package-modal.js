import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import PackageForm from "./package-form";

function PackageModal({ open, onCloseModal, onSubmit }) {
  return (
    <Modal isOpen={open} toggle={onCloseModal}>
      <ModalHeader toggle={onCloseModal}>
        <h5 className="modal-title f-w-600" id="exampleModalLabel2">
          Create New Package
        </h5>
      </ModalHeader>
      <PackageForm onSubmit={onSubmit} />
    </Modal>
  );
}

export default PackageModal;
