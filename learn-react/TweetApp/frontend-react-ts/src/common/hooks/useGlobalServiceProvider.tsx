import React, { useState } from "react";
import { BreadcrumbItemType } from "../components/global-breadcrumbs/GlobalBreadcrumb";

const useGlobalServiceProvider = () => {
    const [name, setName] = useState();

    /**
     * To test, If we can pass a reactjs jsx component from a custom hook
     *
     * We created 'getNameVal', 'setNameVal' and 'getNameValComponent'
     *
     */
    const getNameVal = () => name;

    const setNameVal = (nameVal) => setName(() => nameVal);

    const getNameValComponent = (
        <span style={{ color: "green", fontSize: "30", fontWeight: "bolder" }}>
            {name}
        </span>
    );
    return { BreadcrumbItemType, getNameValComponent, getNameVal, setNameVal };
};

export default useGlobalServiceProvider;
