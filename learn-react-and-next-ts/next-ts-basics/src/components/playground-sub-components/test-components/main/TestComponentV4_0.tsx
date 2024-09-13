import { useGlobalStyles } from '@/common/hooks/useGlobalStyles'; 
import React from "react";
import SelectComponent from '../sub-components/select/SelectComponent';
// import styles from '../../common/combined-v5.module.css';
// import { GLOBAL_APPLICATION_STYLES as styles } from "@/common/utils/util";
// import { GLOBAL_APPLICATION_STYLES as styles } from "@/common/utils/utils-v1.0";

const TestComponentV4_0 = () => {
  const {GLOBAL_APPLICATION_STYLES:{main}}= useGlobalStyles();
  return (
    <div className={main}>
      <SelectComponent/>
    </div>
  );
};

export default TestComponentV4_0;
