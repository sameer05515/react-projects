// import React from 'react'

import { ComponentPropsWithoutRef, type FC } from "react"

type InputProps={
    label: string;
    id: string;
} & ComponentPropsWithoutRef<'input'>;

const CustomInput: FC<InputProps> = ({label,id, ...props}) => {
  return (
    <p>
        <label htmlFor={id}>{label}</label>
        <input id={id} type="text" {...props}/>
    </p>
  )
}

export default CustomInput