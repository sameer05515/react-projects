import { useState, useCallback } from "react";
import Modal from "@/components/common/modal-overlay/ModalV2";
import { fetchGeneric } from "@/common/utils/fetch-from-server/fetchGenericV1_0_1";

interface ApiResponse<T> {
  status: "SUCCESS" | "VALIDATION_ERROR" | "DATABASE_ERROR" | "ERROR";
  messages: string[];
  data: T | null;
  statusCode: number;
  timeStamp: string;
}

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown;
};

type MessageElement = {
  messageType: "SUCCESS" | "Form Validation" | "API Response Error";
  message: string;
};

export const useApiRequest = <T extends string | number>() => {
  const [messages, setMessages] = useState<MessageElement[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAPIResponseInPopup, setShowAPIResponseInPopup] = useState(false);

  const toggleVisibility = () => setShowModal((prev) => !prev);

  const fetchData = useCallback(
    async (
      fetchConfigData: { url: string; options?: FetchOptions },
      onSuccess: (response: ApiResponse<T>) => void = () => {},
      onFailure: (response: ApiResponse<T>) => void = () => {},
      showAPIResponseInPopup: boolean = true,
      errorMessages: string[] = ["Error occurred"]
    ) => {
      setLoading(true);
      setMessages([]);
      toggleVisibility();
      setShowAPIResponseInPopup(showAPIResponseInPopup);

      const { url, options } = fetchConfigData;

      try {
        // const response = await fetch(url, {
        //   method: options?.method || "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //     ...options?.headers,
        //   },
        //   body: options?.body ? JSON.stringify(options.body) : undefined,
        // });

        // fetchGeneric<ApiResponse<unknown>>(
        //   urls[getRandomNumberBetween0andGivenNumber(urls.length)]
        // )
        //   .then((resp) => {
        //     console.log("Success Response: ", resp);
        //     setResult(() => resp as ApiResponse<TweetData[] | null>);
        //   })
        //   .catch((err) =>
        //     console.log("Error occurred: ", JSON.stringify(err, null, 2))
        //   );

        const responseJson: ApiResponse<T> = await fetchGeneric<ApiResponse<T>>(
          url,
          options
        );

        if (responseJson.status === "SUCCESS") {
          setMessages((prev) =>
            prev.concat(
              responseJson.messages.map((m) => ({
                messageType: "SUCCESS",
                message: m,
              }))
            )
          );
          onSuccess(responseJson);
        } else {
          setMessages((prev) =>
            prev.concat(
              responseJson.messages.map((m) => ({
                messageType: "API Response Error",
                message: m,
              }))
            )
          );
          onFailure(responseJson);
        }
      } catch (err) {
        setMessages((prev) =>
          prev.concat(
            errorMessages.concat((err as Error).message).map((m) => ({
              messageType: "API Response Error",
              message: m,
            }))
          )
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const overlayModal = (
    <>
      {showModal && (loading || showAPIResponseInPopup) && (
        <Modal onClose={toggleVisibility}>
          <div style={{ padding: "10px", margin: "10px" }}>
            {loading && <p>Loading...</p>}
            {messages.length > 0 &&
              messages.map((me, index) => (
                <p
                  key={index}
                  style={{
                    color: me.messageType === "SUCCESS" ? "green" : "red",
                  }}
                >
                  <b>{me.messageType}</b>: {me.message}
                </p>
              ))}
          </div>
        </Modal>
      )}
    </>
  );

  return { fetchData, overlayModal };
};
