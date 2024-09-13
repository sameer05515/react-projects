// import React from 'react'
// import "../common/index.css";
import ContainerV2 from "../custom-components/container/ContainerV2";
import CustomButtonV3 from "../custom-components/custom-button/CustomButtonV3";

const AppWithPolymorphicContainerComponentV2 = () => {
  return (
    <main>
      Circle: <ContainerV2 as={"circle"}>circle of life</ContainerV2> <br />
      CustomButtonV3:{" "}
      <ContainerV2
        onClick={() =>
          console.log(
            "Polymorphic component concept will be greatly used in further course"
          )
        }
        as={CustomButtonV3}
      >
        Click me
      </ContainerV2>
    </main>
  );
};

export default AppWithPolymorphicContainerComponentV2;
