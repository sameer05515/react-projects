// import React from 'react'

import { type ComponentPropsWithoutRef, forwardRef } from "react";

type InputProps = {
  label: string;
  id: string;
  name: string;
  required?: boolean;
} & ComponentPropsWithoutRef<"input">;

const CustomInputV3 = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, id, type = "text", name, required = false, ...props }: InputProps,
    ref
  ) => {
    return (
      <p>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type={type}
          name={name}
          required={required}
          {...props}
          ref={ref}
        />
      </p>
    );
  }
);

export default CustomInputV3;
