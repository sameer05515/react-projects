import {
  ComponentPropsWithoutRef,
  FormEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

export type CustomFormV6Handle = {
  clear: () => void;
};

type CustomFormProps = ComponentPropsWithoutRef<"form"> & {
  onSave: (value: unknown) => void;
};

const CustomFormV4_2 = forwardRef<CustomFormV6Handle, CustomFormProps>(
  (
    { onSave, ...props }: CustomFormProps,
    ref: React.Ref<CustomFormV6Handle>
  ) => {
    const formRef = useRef<HTMLFormElement>(null);

    useImperativeHandle(ref, () => ({
      clear: () => {
        console.log("CLEARING FORM");
        formRef.current?.reset();
      },
    }));

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData.entries());

      onSave(data);
    };

    return (
      <form onSubmit={handleSubmit} {...props} ref={formRef}>
        {props.children}
      </form>
    );
  }
);

export default CustomFormV4_2;
