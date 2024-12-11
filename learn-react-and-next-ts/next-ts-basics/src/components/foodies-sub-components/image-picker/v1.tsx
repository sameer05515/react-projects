"use client";

import { ChangeEvent, useRef, useState } from "react";
import classes from "./v1.module.css";
import Image from "next/image";

export default function ImagePicker({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  const [pickedImage, setPickedImage] = useState<string | ArrayBuffer | null>();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const handleImagePick = () => {
    imageInputRef.current?.click();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setPickedImage(() => fileReader.result);
        };
        fileReader.readAsDataURL(file);
      } else {
        setPickedImage(null);
        return;
      }
    }
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No Image picked till the time!</p>}
          {pickedImage && (
            <Image src={pickedImage + ""} alt="The user picked image" fill />
          )}
        </div>
        <input
          type="file"
          className={classes.input}
          name={name}
          id={name}
          accept="image/png, image/jpeg"
          ref={imageInputRef}
          onChange={handleImageChange}
        //   required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handleImagePick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
