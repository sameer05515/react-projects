"use client";

import React from 'react';
import {Button} from '@stparap/react-ts-library-with-rollup';

function Playground() {
  const run=()=> console.log('aaaaaaaaaaaaaaaaa');
  return (
    <div>Playground
        <Button onClick={run} label={"I am from library"}></Button>
    </div>
  )
}

export default Playground