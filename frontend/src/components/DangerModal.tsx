import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type AddPasswordModalProps = {
    website: string
    show: boolean
    onClose: () => void
    onDelete: () => void
}

function DangerModal({website, show, onClose, onDelete}: AddPasswordModalProps) {
    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Attention</Modal.Title>
                </Modal.Header>
                <Modal.Body>{website} will be deleted, are you sure ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={onDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DangerModal;