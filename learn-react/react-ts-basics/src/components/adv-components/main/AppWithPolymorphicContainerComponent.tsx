// import React from 'react'
// import '../common/index.css';
import Container from '../custom-components/container/Container';
import CustomButtonV3 from '../custom-components/custom-button/CustomButtonV3';

const AppWithPolymorphicContainerComponent = () => {
  return (
    <main>
        Circle: <Container as={'circle'}/> <br />
        CustomButtonV3: <Container as={CustomButtonV3}/>
    </main>
  )
}

export default AppWithPolymorphicContainerComponent