import { useGlobalStyles } from '@/common/hooks/useGlobalStyles'; 
import React from 'react'
// import styles from '../../common/combined-v5.module.css';
// import { GLOBAL_APPLICATION_STYLES as styles } from '@/common/utils/util'; 
const ReactPosterDummyComp = () => {
  const {GLOBAL_APPLICATION_STYLES:styles}= useGlobalStyles();
  return (
    <div className={styles.main}>ReactPosterDummyComp</div>
  )
}

export default ReactPosterDummyComp