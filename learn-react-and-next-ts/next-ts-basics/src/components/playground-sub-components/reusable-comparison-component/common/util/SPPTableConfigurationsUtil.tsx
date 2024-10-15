import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { ComparisonDataType } from "../data/data_v1_0_2";

interface SharedData {
  errors: string[];
}

interface SharedConfigurationsContextType {
  sharedData: SharedData;
}

/** Initial shared data */ 
const initialSharedData: SharedData = {
  errors: [],
};


/** Create a context for shared configurations and data */ 
const SharedConfigurationsContext = createContext<
  SharedConfigurationsContextType | undefined
>(undefined);

interface SharedConfigurationsProviderProps<T> {
  children: ReactNode;
  data: ComparisonDataType<T>;
}

const SharedConfigurationsProvider = ({
  children,
  data,
}: SharedConfigurationsProviderProps<T>) => {
  const [sharedData, setSharedData] = useState<SharedData>(initialSharedData);
  useEffect(() => {
    if (!data) {
      setSharedData((prev) => ({
        ...prev,
        errors: [
          "Null or undefined data provided. Table rendering not possible!!",
        ],
      }));
    }
  }, [data]);
  return (
    <SharedConfigurationsContext.Provider
      value={{
        sharedData,
      }}
    >
      {children}
    </SharedConfigurationsContext.Provider>
  );
};

// Custom hook to use shared configurations and data
const useSharedConfigurations = (): SharedConfigurationsContextType => {
  const context = useContext(SharedConfigurationsContext);
  if (!context) {
    throw new Error(
      "useSharedConfigurations must be used within a SharedConfigurationsProvider"
    );
  }
  return context;
};

export { SharedConfigurationsProvider, useSharedConfigurations };
