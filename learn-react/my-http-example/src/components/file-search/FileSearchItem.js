import React from "react";

const FileSearchItem = (props) => {
    return (
        <div onClick={(_e) => props.onItemSelected(props.fileItem)}>
            {props.fileItem.name}
        </div>
    );
};
export default FileSearchItem;