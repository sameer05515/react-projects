// import React from 'react'

import { type ComponentPropsWithoutRef, type FormEvent } from "react";

type CustomFormProps= ComponentPropsWithoutRef<'form'> & {
    onSave: (value: unknown)=> void;
};


const CustomFormV2 = (props: CustomFormProps) => {
    const handleSubmit=(event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault();

        const formData= new FormData(event.currentTarget);
        const data= Object.fromEntries(formData);
        props.onSave(data);
    }
  return (
    <form onSubmit={handleSubmit} {...props}>
        {props.children}
    </form>
  )
}

export default CustomFormV2