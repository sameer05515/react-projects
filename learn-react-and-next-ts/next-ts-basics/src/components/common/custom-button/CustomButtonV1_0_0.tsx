import { type ComponentPropsWithoutRef, type FC } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button">;

const CustomButton: FC<ButtonProps> = (props) => {  
    return <button {...props}></button>;
  };

export default CustomButton