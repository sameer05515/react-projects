// import React from 'react'

import { useRef, type ComponentPropsWithoutRef, type FormEvent } from "react";

type CustomFormProps = ComponentPropsWithoutRef<"form"> & {
  onSave: (value: unknown) => void;
};

const CustomFormV5 = ({ onSave, children, ...otherProps }: CustomFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    onSave(data);
    formRef.current?.reset();
  };
  return (
    <form onSubmit={handleSubmit} {...otherProps} ref={formRef}>
      {children}
    </form>
  );
};

export default CustomFormV5;
