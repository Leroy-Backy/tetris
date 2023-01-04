import {Button, Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Popup({showModal, msg, setShowModal}) {
  return (
    <Modal style={{whiteSpace: "pre-line"}} show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Body>
        <div className="text-center">
          {msg}
        </div>
        <div className="d-flex justify-content-center">
          <Button className="btn-light" onClick={() => setShowModal(false)}>ok</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}