
// import "../common/index.css";
import CustomButtonV3 from "../custom-components/custom-button/CustomButtonV3";
import CustomForm from "../custom-components/custom-form/CustomForm";
import CustomInputV3 from "../custom-components/custom-input/CustomInputV3";

const AppWithCustomForm = () => {
  return (
    <main>
      <CustomForm>
        <CustomInputV3 type="text" label="Name" id="name"/>
        <CustomInputV3 type="number" label="Age" id="age"/>
        <p>
          <CustomButtonV3>Save</CustomButtonV3>
        </p>
      </CustomForm>
    </main>
  );
};

export default AppWithCustomForm;
