
import { useRef } from "react";
// import "../common/index.css";
import CustomButtonV3 from "../custom-components/custom-button/CustomButtonV3";
import CustomFormV6, {type CustomFormV6Handle} from "../custom-components/custom-form/CustomFormV6";
import CustomInputV3 from "../custom-components/custom-input/CustomInputV3";

const AppWithCustomFormV6 = () => {

    const customFormRef= useRef<CustomFormV6Handle>(null);

    const handleSave=(data: unknown)=>{
        const extractedData= data as { name: string, age: string};
        console.log(extractedData);
        customFormRef.current?.clear();
    }
    
  return (
    <main>
      <CustomFormV6 onSave={handleSave} ref={customFormRef}>
        <CustomInputV3 type="text" label="Name" id="name" name="name"/>
        <CustomInputV3 type="number" label="Age" id="age" name="age"/>
        <p>
          <CustomButtonV3>Save</CustomButtonV3>
        </p>
      </CustomFormV6>
    </main>
  );
};

export default AppWithCustomFormV6;
