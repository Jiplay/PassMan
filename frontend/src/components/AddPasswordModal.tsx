import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import FormInput from "./Form";
import PasswordForm from "./PasswordForm";
import {SaveCredentials} from "../../wailsjs/go/main/App";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type AddPasswordModalProps = {
    titleModal: string
    titleButton: string
    username: string
    password: string
    onUpdatePassword: (update: string) => void
}

function AddPasswordModal( { titleModal, titleButton, username, password, onUpdatePassword }: AddPasswordModalProps ) {
    const [show, setShow] = useState(false);
    const [newLogin, setNewLogin] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [website, setWebsite] = useState('')
    const [info, setInfo] = useState('')
    const handleShow = () => setShow(true);

    function handleCloseSafe() {
        setNewLogin("")
        setNewPassword("")
        setWebsite("")
        setInfo("")
        setShow(false)
    }

    async function saveData() {
        let res: string;
        res = await SaveCredentials({"Login": username, "Password": password}, {"Website": website, "Login": newLogin, "Password": newPassword, "Additional": info});
        handleCloseSafe()

        if (res === "true") {
            toast.success("I'll remember it", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            onUpdatePassword("1")
        } else {
            toast.error("Unable to remember this.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
        console.log("State : ", res)
    }

    const handleInputChange = (e: { target: { value: any; }; }) => {
        const newInput = e.target.value;
        setInfo(newInput);
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                {titleButton}
            </Button>

            <Modal show={show} onHide={handleCloseSafe}>
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
                        <PasswordForm onUpdatePassword={setNewPassword} placeholder={"Password"}/>
                    </div>
                    <div style={{width: "75%", margin: "0 auto"}}>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Optional notes regarding this password</Form.Label>
                            <Form.Control as="textarea" onChange={handleInputChange} rows={3}/>
                        </Form.Group>
                    </div>
                </Form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSafe}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveData}>
                        Let PassMan remember it for you
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddPasswordModal;