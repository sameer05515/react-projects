// import React from 'react'
// import CustomInputV2 from "../custom-components/custom-input/CustomInputV2";
// import "../common/index.css";
import CustomCard from "../custom-components/custom-card/CustomCard";
import GenericList from "../custom-components/generic-list/GenericList";
import IconButton from "../custom-components/icon-button/IconButton";

const AppWithSomeMoreComponents = () => {
  return (
    <main>
      <p>
        <GenericList />
      </p>
      <p>
        <IconButton />
      </p>
      <p>
        <CustomCard />
      </p>
    </main>
  );
};

export default AppWithSomeMoreComponents;
