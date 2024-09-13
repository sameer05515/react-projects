import React from "react";
import {
    SmartPreviewer,
    availableOutputTypes as SupportedTextFormats,
} from "./common/components/smart-editor/SmartEditorV3";
import { BACKEND_APPLICATION_BASE_URL } from "./common/constants/globalConstants";
import useDataFetching from "./common/hooks/useDataFetching";

const Notifications = () => {
    const isDarkMode = false;
    // const dispatch = useDispatch();
    const url = `${BACKEND_APPLICATION_BASE_URL}/memory-maps/cd6bb190-0e56-4e3a-8f01-748c8d05d9d4`;
    const { data, loading, error, refetch } = useDataFetching(url);

    // useEffect(()=>{
    //     dispatch(fetchMemoryMapByUniqueId("cd6bb190-0e56-4e3a-8f01-748c8d05d9d4"))
    // },[])
    return (
        <div
            style={{
                backgroundColor: isDarkMode ? "black" : "white",
                color: isDarkMode ? "white" : "black",
                paddingLeft: "25px",
                paddingTop: "5px",
            }}
        >
            <SmartPreviewer
                data={{
                    content: data?.name || "",
                    textOutputType: SupportedTextFormats.MARKDOWN,
                }}
                markdownStyles={{ fontSize: "25px" }}
            />
            <SmartPreviewer
                data={{
                    content: data?.skeleton || "",
                    textOutputType: SupportedTextFormats.SKELETON,
                }}
            // markdownStyles={{ fontSize: "12px" }}
            />
        </div>
    );
};

export default Notifications;
