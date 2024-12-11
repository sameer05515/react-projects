import { useGlobalStyles } from '@/common/hooks/useGlobalStyles'; 
import React from "react";
import SelectComponent from '../sub-components/select/SelectComponentV3_2';

const TestComponentV4_2_2 = () => {
  const {GLOBAL_APPLICATION_STYLES:{main}}= useGlobalStyles();
  return (
    <div>
      <SelectComponent/>
    </div>
  );
};

export default TestComponentV4_2_2;
