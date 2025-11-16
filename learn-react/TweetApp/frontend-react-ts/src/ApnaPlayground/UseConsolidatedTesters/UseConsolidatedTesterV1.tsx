import React, { useState } from "react";
import useConsolidated from "../../common/hooks/useConsolidated/archieved/v1";
import CustomBackdrop from "../../common/components/CustomBackdrop/v1";

/**
 * 📌 **Note for Developers:**
 *
 * This code demonstrates the usage of the `/CustomBackdrop/v1` component, where the `isBackdropActive`
 * state was managed manually within the component itself.
 *
 * 🚀 **Why It's Here:**
 * - Retained for **learning purposes**: Serves as a reference for managing local state manually.
 * - Future-proofing: With upcoming releases of the `useConsolidated` hooks, manual state management
 *   for the backdrop may become obsolete.
 *
 * 🛠️ **Action for Future Developers:**
 * - Before using this code in production, confirm if state management is still required or if the
 *   updated `useConsolidated` hooks have automated this behavior.
 *
 * 🔗 **Related Reference:**
 * - Explore the `/CustomBackdrop` component for more details on its evolution in later versions.
 */

const UseConsolidatedTesterV1 = () => {
  const [isBackdropActive, setIsBackdropActive] = useState("no");
  const { fetchTaskDetailsForGivenId, getRandomNumber, doubleTheNumber } =
    useConsolidated();

  const handleFetchTaskDetailsForGivenId = async () => {
    showBackdrop();
    const { data, isError, message } = await fetchTaskDetailsForGivenId();
    console.log("response recieved: ", { data, isError, message });
    hideBackdrop();
  };

  const showBackdrop = () => {
    console.log("Showing Backdrop");
    setIsBackdropActive("yes");
    setTimeout(() => {
      hideBackdrop();
    }, 7000);
  };

  const hideBackdrop = () => {
    console.log("Hiding Backdrop");
    setIsBackdropActive("no");
  };

  const handleGetRandomNumber = () => {
    console.log("Starting fetch: " + new Date());
    showBackdrop();
    getRandomNumber()
      .then(({ randomNumber: number }) => {
        console.log("Recieved result at : " + new Date());
        console.log(`Random number: ${number}`);
        return doubleTheNumber(number);
      })
      .then((number) => {
        console.log(number);
        return fetchTaskDetailsForGivenId();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
      .finally(() => hideBackdrop());
  };
  return (
    <div>
      <h1>UseConsolidatedTesterV1</h1>
      <button onClick={handleFetchTaskDetailsForGivenId}>
        useConsolidated test: fetchTaskDetailsForGivenId
      </button>
      <br />
      <button onClick={handleGetRandomNumber}>
        useConsolidated test: getRandomNumber
      </button>
      <br />
      <div>
        <h1>Backdrop Example</h1>
        <button onClick={showBackdrop}>Show Backdrop</button>
        <CustomBackdrop shouldActive={isBackdropActive} />
      </div>
    </div>
  );
};

export default UseConsolidatedTesterV1;
