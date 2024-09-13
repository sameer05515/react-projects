import React from 'react';

// import styles from '../../common/combined-v5.module.css';

import { useGlobalStyles } from '@/common/hooks/useGlobalStyles'; 

const FuturePurpose = () => {
  const {GLOBAL_APPLICATION_STYLES:{main}}= useGlobalStyles();
  return (
    <div className={main}>FuturePurpose</div>
  )
}

export default FuturePurpose