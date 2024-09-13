import { type ComponentPropsWithoutRef, forwardRef } from "react";

type TexAreaProps = {
  label: string;
  id: string;
  name: string;
  required?: boolean;
  rows?: number;
} & ComponentPropsWithoutRef<"textarea">;

const CustomTexArea = forwardRef<HTMLTextAreaElement, TexAreaProps>(
  ({ label, id, name, required=false, rows=3, ...props }: TexAreaProps, ref) => {
    return (
      <p>
        <label htmlFor={id}>{label}</label>
        <textarea
          id={id}
          name={name}
          required={required}
          rows={rows}
          {...props}
          ref={ref}
        />
      </p>
    );
  }
);

export default CustomTexArea;
