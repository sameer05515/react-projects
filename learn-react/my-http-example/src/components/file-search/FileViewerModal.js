import React from "react";
import Modal from "../UI/Modal";
import classes from './FileViewerModal.module.css'

const FileViewerModal = (props) => {
    console.log(`inside FileViewerModal ${props.item.name}`);
    return (
        <Modal onClose={props.onClose} styleList={props.styleList}>

            <h1>{props.item.name}</h1>

            <embed id="objectToEmbed" 
                    src={props.documentUrl}                       
                    style={{ color: 'white', width: 750, height: 300, alignSelf: "center" }}
            />
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>
                    Close
                </button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    );
};

export default FileViewerModal;