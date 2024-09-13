import React from 'react'
import { useSharedConfigurations } from '../../util/RelatedNodeUtil';
import JSONPreview from '../common/JSONPreview';
import { Outlet } from "react-router-dom";

const Details = () => {
    const {
        sharedData: {
          styles,
          ...sharedData // Ensure sharedData is fully destructured here
        },    
      } = useSharedConfigurations();
    return (
        <div
            style={{
                flex: 1,
                ...styles.greenBorder,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* Area to show details, according to selected node's type
            <JSONPreview data={sharedData} /> */}
            <Outlet/>
        </div>
    )
}

export default Details