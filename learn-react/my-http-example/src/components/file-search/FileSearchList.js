import React from "react";
import FileSearchItem from "./FileSearchItem";
import classes from './FileSearchList.module.css';

const FileSearchList = (props) => {

  const itemSelectionHandler = selectedItem => {
    props.onItemSelected(selectedItem);
  }
  return (<ul className={classes['movies-list']}>
    {props.fileList.map((fileItem, index) => (
      <FileSearchItem
        key={index}
        fileItem={fileItem}
        onItemSelected={itemSelectionHandler}
      />
    ))}
  </ul>);
}

export default FileSearchList;