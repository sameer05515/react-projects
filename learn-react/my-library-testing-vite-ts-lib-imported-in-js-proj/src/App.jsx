import React from 'react';
import { PKJDV, PremKaButton, PremKaCounter, PremKaInput } from '@stparap/react-ts-library-with-vite';

function App() {
  return(
    <div>
      <PremKaInput/>
      <PremKaButton>I am a disco dancer</PremKaButton>
      <br />
      <PremKaCounter/>
      <PKJDV initialValueToShowMetadata metadata={{a:'Premendra'}}/>
    </div>
  )
}

export default App
