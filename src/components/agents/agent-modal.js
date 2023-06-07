import React from "react";
import { Modal, ModalHeader } from "reactstrap";
import AgentForm from "./agents-form";

function AgentModal({ open, onCloseModal, onSubmit }) {
  return (
    <Modal isOpen={open} toggle={onCloseModal}>
      <ModalHeader toggle={onCloseModal}>
        <h5 className="modal-title f-w-600" id="exampleModalLabel2">
          Create New Agent
        </h5>
      </ModalHeader>
      <AgentForm onSubmit={onSubmit} />
    </Modal>
  );
}

export default AgentModal;
