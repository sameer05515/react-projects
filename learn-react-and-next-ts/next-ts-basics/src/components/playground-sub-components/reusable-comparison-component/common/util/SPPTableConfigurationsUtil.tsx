import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { ComparisonDataType } from "../data/data_v1_0_2";

interface SharedData<T> {
  errors: string[];
  isValidData: boolean;
  validatedData: ComparisonDataType<T> | null;
}

interface SharedConfigurationsContextType<T> {
  sharedData: SharedData<T>;
}

/** Initial shared data (use type parameter T) */
const createInitialSharedData = <T,>(): SharedData<T> => ({
  errors: [],
  isValidData: false,
  validatedData: null,
});

/** Validate the structure of ComparisonDataType */
const validateDataStructure = <T,>(
  data: ComparisonDataType<T> | null
): boolean => {
  if (null === data) return false;
  // Additional checks for the structure validity
  return (
    data &&
    typeof data.uniqueId === "string" &&
    typeof data.title === "string" &&
    Array.isArray(data.headers) &&
    Array.isArray(data.rowData) &&
    data.rowData.every(
      (row) => typeof row.aspect === "string" && Array.isArray(row.values)
    )
  );
};

/** Create a context for shared configurations and data */
const SharedConfigurationsContext = createContext<
  SharedConfigurationsContextType<any> | undefined
>(undefined);

interface SharedConfigurationsProviderProps<T> {
  children: ReactNode;
  data: ComparisonDataType<T> | null;
}

// Ensure the provider is correctly typed with generic T
const SharedConfigurationsProvider = <T,>({
  children,
  data,
}: SharedConfigurationsProviderProps<T>) => {
  const initialSharedData = useMemo(() => createInitialSharedData<T>(), []);

  const [sharedData, setSharedData] =
    useState<SharedData<T>>(initialSharedData);

  useEffect(() => {
    const errors: string[] = [];

    if (!data) {
      errors.push(
        "Null or undefined data provided. Table rendering not possible!"
      );
    } else if (!validateDataStructure(data)) {
      errors.push("The provided data structure is invalid.");
    }

    const isValidData = errors.length === 0 && validateDataStructure(data);

    setSharedData({
      errors,
      isValidData,
      validatedData: isValidData ? data : null,
    });
  }, [data]);

  return (
    <SharedConfigurationsContext.Provider value={{ sharedData }}>
      {children}
    </SharedConfigurationsContext.Provider>
  );
};

// Custom hook to use shared configurations and data
const useSharedConfigurations = <T,>(): SharedConfigurationsContextType<T> => {
  const context = useContext(SharedConfigurationsContext);
  if (!context) {
    throw new Error(
      "useSharedConfigurations must be used within a SharedConfigurationsProvider"
    );
  }
  return context as SharedConfigurationsContextType<T>;
};

export { SharedConfigurationsProvider, useSharedConfigurations };
