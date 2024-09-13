// import React from 'react'

import { type ComponentPropsWithoutRef, forwardRef } from "react";

type InputProps = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<"input">;

const CustomInputV4 = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, ...props }: InputProps, ref) => {
    return (
      <p>
        <label htmlFor={id}>{label}</label>
        <input id={id} name={id} type="text" {...props} ref={ref} />
      </p>
    );
  }
);

export default CustomInputV4;
