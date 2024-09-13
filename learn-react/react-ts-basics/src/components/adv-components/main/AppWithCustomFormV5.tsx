
// import "../common/index.css";
import CustomButtonV3 from "../custom-components/custom-button/CustomButtonV3";
import CustomFormV5 from "../custom-components/custom-form/CustomFormV5";
import CustomInputV3 from "../custom-components/custom-input/CustomInputV3";

const AppWithCustomFormV5 = () => {

    const handleSave=(data: unknown)=>{
        const extractedData= data as { name: string, age: string};
        console.log(extractedData);
    }
    
  return (
    <main>
      <CustomFormV5 onSave={handleSave}>
        <CustomInputV3 type="text" label="Name" id="name" name="name"/>
        <CustomInputV3 type="number" label="Age" id="age" name="age"/>
        <p>
          <CustomButtonV3>Save</CustomButtonV3>
        </p>
      </CustomFormV5>
    </main>
  );
};

export default AppWithCustomFormV5;
