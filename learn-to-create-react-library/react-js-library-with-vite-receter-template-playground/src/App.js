import {
  PremKaButton as Button,
  PremKaLabel as Label,
  PremKaCounter,
  PKJDV,
  useCounter,
  ctcDetails,wageDetails
} from "@stparap/react-js-library-with-vite-receter-template";
import React, { useState } from "react";

function App() {
  const [label, setLabel] = useState(new Date().toString());
  const { counter, decrease, increase } = useCounter(5);

  return (
    <div>
      <h1>Playground</h1>
      <Button
        title="I am working"
        onClick={() => setLabel(new Date().toString())}
      >
        Click me
      </Button>

      <Label> Last clicked on: {label}</Label> <br />

      <Label>Conter: {counter}</Label>

      <Button
        title="Increment"
        onClick={increase}
      >
        Click me to increase count
      </Button>
      <Button
        title="Decrement"
        onClick={decrease}
      >
        Click me to increase count
      </Button> <br />

      <PremKaCounter />
      <PKJDV initialValueToShowMetadata title="Dummy JSON" metadata={{ a: 'Premendra' }} />
      <PKJDV initialValueToShowMetadata title="ctcDetails" metadata={{ctcDetails}}/>
      <PKJDV initialValueToShowMetadata title="wageDetails" metadata={{wageDetails}}/>
    </div>
  );
}

export default App;