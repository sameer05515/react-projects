
// import "../common/index.css";
import CustomButtonV3 from "../custom-components/custom-button/CustomButtonV3";
import CustomFormV3 from "../custom-components/custom-form/CustomFormV3";
import CustomInputV3 from "../custom-components/custom-input/CustomInputV3";

const AppWithCustomFormV3 = () => {

    const handleSave=(data: unknown)=>{
        const extractedData= data as { name: string, age: string};
        console.log(extractedData);
    }
    
  return (
    <main>
      <CustomFormV3 onSave={handleSave}>
        <CustomInputV3 type="text" label="Name" id="name" name="name"/>
        <CustomInputV3 type="number" label="Age" id="age" name="age"/>
        <p>
          <CustomButtonV3>Save</CustomButtonV3>
        </p>
      </CustomFormV3>
    </main>
  );
};

export default AppWithCustomFormV3;
