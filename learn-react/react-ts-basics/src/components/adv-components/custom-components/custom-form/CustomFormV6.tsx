// import React from 'react'

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type ComponentPropsWithoutRef,
  type FormEvent,
} from "react";

export type CustomFormV6Handle = {
  clear: () => void;
};

type CustomFormProps = ComponentPropsWithoutRef<"form"> & {
  onSave: (value: unknown) => void;
};

const CustomFormV6 = forwardRef<CustomFormV6Handle, CustomFormProps>(
  ({ onSave, children, ...otherProps }: CustomFormProps, ref) => {
    const formRef = useRef<HTMLFormElement>(null);

    useImperativeHandle(ref, () => {
      return {
        clear: () => {
          console.log("CLEARING FORM");
          formRef.current?.reset();
        },
      };
    });

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
  }
);

export default CustomFormV6;
