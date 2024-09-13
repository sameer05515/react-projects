// import React from 'react'
import CustomInputV2 from "../custom-components/custom-input/CustomInputV2";
// import '../common/index.css';

const AppWithCustomInputV2 = () => {
  return (
    <main>
       <CustomInputV2 id="name" label="Your Name" type="text" />
       <CustomInputV2 id="age" label="Your age" type="number"/>
    </main>
  )
}

export default AppWithCustomInputV2;