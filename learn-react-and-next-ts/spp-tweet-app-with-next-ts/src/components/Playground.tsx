"use client";
import {
  PremKaButton as Button,
  PremKaLabel as Label,
  PremKaCounter,
  PKJDV,
} from "@stparap/react-js-library-with-vite-receter-template";
import React, { useState } from "react";
// import { PremKaButton, PremKaInput, PremKaCounter } from "@stparap/react-ts-library-with-vite";

function Playground() {
  const [label, setLabel] = useState(new Date().toString());

  return (
    <div>
      <h1>Playground</h1>
      <Button
        title="I am working"
        onClick={() => setLabel(new Date().toString())}
      >
        Click me
      </Button>

      <Label> Last clicked on: {label}</Label>

      {/* <PremKaInput />
      <PremKaButton>I am a disco dancer</PremKaButton>
      <br /> */}
      <PremKaCounter/>
      <PKJDV initialValueToShowMetadata metadata={{a:'Premendra'}}/>
    </div>
  );
}

export default Playground;
