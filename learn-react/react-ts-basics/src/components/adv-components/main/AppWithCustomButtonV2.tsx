// import React from 'react'
// import CustomInputV2 from "../custom-components/custom-input/CustomInputV2";
// import '../common/index.css';
import CustomButton from '../custom-components/custom-button/CustomButtonV2';

const AppWithCustomButtonV2 = () => {
  return (
    <main>
       <p>
            <CustomButton className='button'>A Button</CustomButton>
       </p>
       <p>
       <CustomButton className='button' href='https://google.com'>A Link</CustomButton>
       </p>
    </main>
  )
}



export default AppWithCustomButtonV2