import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import FormInput from "./Form";
import PasswordForm from "./PasswordForm";


type AddPasswordModalProps = {
    titleModal: string
    titleButton: string
    userPassword: string
    username: string
}


function AddPasswordModal( { titleModal, titleButton }: AddPasswordModalProps ) {
    const [show, setShow] = useState(false);
    const [newLogin, setNewLogin] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [website, setWebsite] = useState('')
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                {titleButton}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{titleModal}</Modal.Title>
                </Modal.Header>
                <Form>
                    <div style={{width: "60%", margin: "0 auto", marginTop: "25px"}}>
                        <FormInput title={"Website"} onUpdateInput={setWebsite} placeHolder={"Website"}></FormInput>
                    </div>
                    <div style={{width: "60%", margin: "0 auto"}}>
                        <FormInput title={"Login"} onUpdateInput={setNewLogin} placeHolder={"Login"}></FormInput>
                    </div>
                    <div style={{width: "60%", margin: "0 auto"}}>
                        <PasswordForm onUpdatePassword={setNewPassword}/>
                    </div>
                    <div style={{width: "75%", margin: "0 auto"}}>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Optional notes regarding this password</Form.Label>
                            <Form.Control as="textarea" rows={3}/>
                        </Form.Group>
                    </div>
                </Form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Let PassMan Remember it for you
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddPasswordModal;