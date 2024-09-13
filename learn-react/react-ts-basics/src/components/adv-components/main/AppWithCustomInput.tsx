// import React from 'react'
import CustomInput from "../custom-components/custom-input/CustomInput";
// import '../common/index.css';

const AppWithCustomInput = () => {
  return (
    <main>
       <CustomInput id="name" label="Your Name" />
       <CustomInput id="age" label="Your age"/>
    </main>
  )
}

export default AppWithCustomInput;