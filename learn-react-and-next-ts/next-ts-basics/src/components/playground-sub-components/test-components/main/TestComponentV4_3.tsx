import { useGlobalStyles } from '@/common/hooks/useGlobalStyles'; 
import React from "react";
import SelectComponent from '../sub-components/select/SelectComponentV2_1';

const TestComponentV4_3 = () => {
  const {GLOBAL_APPLICATION_STYLES:{main}}= useGlobalStyles();
  return (
    <div className={main}>
      <SelectComponent/>
    </div>
  );
};

export default TestComponentV4_3;
