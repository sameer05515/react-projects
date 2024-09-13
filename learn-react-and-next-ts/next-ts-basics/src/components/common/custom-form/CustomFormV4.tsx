import { ComponentPropsWithoutRef, FormEvent } from "react";

type CustomFormProps<T extends Record<string, any>> = ComponentPropsWithoutRef<'form'> & {
  onSave: (value: T) => void;
};

const CustomFormV4 = <C extends Record<string, any>>({ onSave, ...props }: CustomFormProps<C>) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as C; // Explicitly cast to `C`
    
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit} {...props}>
      {props.children}
    </form>
  );
};

export default CustomFormV4;
