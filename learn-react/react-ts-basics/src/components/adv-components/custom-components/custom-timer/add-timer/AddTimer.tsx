import { useRef } from "react";

// import Button from './UI/Button.tsx';
// import Form, { FormHandle } from './UI/Form.tsx';
// import Input from './UI/Input.tsx';

import Button from "../../custom-button/CustomButtonV3.tsx";
import Form, {
  type CustomFormV6Handle as FormHandle,
} from "../../custom-form/CustomFormV6.tsx";
import Input from "../../custom-input/CustomInputV4.tsx";
import { useTimersContext } from "../../../../../common/store/timers-context-v3.tsx";

export default function AddTimer() {
  const form = useRef<FormHandle>(null);

  const { addTimer } = useTimersContext();

  function handleSaveTimer(data: unknown) {
    const extractedData = data as { name: string; duration: string };
    console.log(extractedData);
    addTimer({ name: extractedData.name, duration: +extractedData.duration });
    form.current?.clear();
  }

  return (
    <Form ref={form} onSave={handleSaveTimer} id="add-timer">
      <Input type="text" label="Name" id="name" />
      <Input type="number" label="Duration" id="duration" />
      <p>
        <Button>Add Timer</Button>
      </p>
    </Form>
  );
}
