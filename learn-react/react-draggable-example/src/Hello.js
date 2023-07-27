import React from "react";
import Draggable, { DraggableCore } from "react-draggable";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";



export default class Hello extends React.Component {
    state = {
        showModal: true
    };

    modalClose = () => {
        this.setState({
            modalShow: false
        });
    };

    onStart = () => {
        console.log("here");
    };

    render() {
        return (
            <div>
                <Draggable>
                    <Modal
                        isOpen={this.state.showModal}
                        toggle={() => {
                            this.setState({ showModal: false });
                            this.modalClose();
                        }}
                        style={{
                            minWidth: "30rem",
                            border: "0.1rem solid green"
                        }}
                    >
                        <ModalHeader
                            className="modal-header bg-primary modal-title text-white"
                            toggle={() => {
                                this.setState({ showModal: false });
                                this.modalClose();
                            }}
                        >
                            <h2> Header </h2>
                        </ModalHeader>
                        <ModalBody style={{
                            height: "10rem",
                            border: "0.1rem solid red"
                        }}>
                            <div className="form-group row" style={{
                                overflow: "auto",
                                height: "10rem"
                            }}>
                                <div className="FormRow col-sm-12">
                                    <span>Body data </span>
                                </div>
                            </div>
                        </ModalBody>
                    </Modal>
                </Draggable>
            </div>

        );
    }
}
