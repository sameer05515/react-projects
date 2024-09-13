import { ComponentPropsWithoutRef, FormEvent, useRef } from "react";

type CustomFormProps<T extends Record<string, any>> = ComponentPropsWithoutRef<'form'> & {
  onSave: (value: T) => void;
};

const CustomFormV4_1 = <C extends Record<string, any>>({ onSave, ...props }: CustomFormProps<C>) => {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as C; // Explicitly cast to `C`
    
    onSave(data);
    formRef.current?.reset();
  };

  return (
    <form onSubmit={handleSubmit} {...props} ref={formRef}>
      {props.children}
    </form>
  );
};

export default CustomFormV4_1;
