// import React from 'react'

import { type FC } from "react"

type InputProps={
    label: string;
    id: string;
}

const CustomInput: FC<InputProps> = ({label,id}) => {
  return (
    <p>
        <label htmlFor={id}>{label}</label>
        <input id={id} type="text" />
    </p>
  )
}

export default CustomInput