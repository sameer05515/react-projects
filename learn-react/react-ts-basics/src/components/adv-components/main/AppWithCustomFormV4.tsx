
// import "../common/index.css";
import CustomButtonV3 from "../custom-components/custom-button/CustomButtonV3";
import CustomFormV4 from "../custom-components/custom-form/CustomFormV4";
import CustomInputV3 from "../custom-components/custom-input/CustomInputV3";

const AppWithCustomFormV4 = () => {

    const handleSave=(data: { name: string, age: string})=>{
        const extractedData= data;
        console.log(extractedData);
    }
    
  return (
    <main>
      <CustomFormV4 onSave={handleSave}>
        <CustomInputV3 type="text" label="Name" id="name" name="name"/>
        <CustomInputV3 type="number" label="Age" id="age" name="age"/>
        <p>
          <CustomButtonV3>Save</CustomButtonV3>
        </p>
      </CustomFormV4>
    </main>
  );
};

export default AppWithCustomFormV4;
