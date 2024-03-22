import { Modal, Button } from "react-bootstrap";

export const GenericModal = ({
  showModal,
  setShowModal,
  onSubmit,
  title,
  children,
}) => {
  const handleClose = () => setShowModal(false);

  const handleSubmit = () => {
    onSubmit();
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
