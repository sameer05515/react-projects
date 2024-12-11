// import React from 'react'

import { ComponentPropsWithoutRef } from "react"

type CustomFormProps= ComponentPropsWithoutRef<'form'>;


const CustomForm = (props: CustomFormProps) => {
  return (
    <form {...props}>
        {props.children}
    </form>
  )
}

export default CustomForm