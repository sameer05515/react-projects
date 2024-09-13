// import React from 'react'
// import CustomInputV2 from "../custom-components/custom-input/CustomInputV2";
// import '../common/index.css';
import CustomButton from '../custom-components/custom-button/CustomButton';

const AppWithCustomButton = () => {
  return (
    <main>
       <p>
            <CustomButton className='button' el='button'>A Button</CustomButton>
       </p>
       <p>
       <CustomButton className='button' el='anchor' href='https://google.com'>A Link</CustomButton>
       </p>
    </main>
  )
}



export default AppWithCustomButton