import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { ComparisonDataType } from "../data/data_v1_0_3";

interface SharedData<CELL_VALUE_TYPE> {
  errors: string[];
  isValidData: boolean;
  validatedData: ComparisonDataType<CELL_VALUE_TYPE> | null;  
  renderCell?: (cellValue: CELL_VALUE_TYPE) => ReactNode;
}

interface SharedConfigurationsContextType<CELL_VALUE_TYPE> {
  sharedData: SharedData<CELL_VALUE_TYPE>;
}

/** Initial shared data (use type parameter T) */
const createInitialSharedData = <
  CELL_VALUE_TYPE,
>(): SharedData<CELL_VALUE_TYPE> => ({
  errors: [],
  isValidData: false,
  validatedData: null,
});

/** Validate the structure of ComparisonDataType */
const validateDataStructure = <CELL_VALUE_TYPE,>(
  data: ComparisonDataType<CELL_VALUE_TYPE> | null,
  rowValueValidator?: (rowValue: CELL_VALUE_TYPE) => boolean
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
      (row) =>
        typeof row.aspect === "string" &&
        Array.isArray(row.values) &&
        (!rowValueValidator ||
          row.values.every((rowVal) => rowValueValidator(rowVal)))
    )
  );
};

/** Create a context for shared configurations and data */
const SharedConfigurationsContext = createContext<
  SharedConfigurationsContextType<any> | undefined
>(undefined);

interface SharedConfigurationsProviderProps<CELL_VALUE_TYPE> {
  children: ReactNode;
  data: ComparisonDataType<CELL_VALUE_TYPE> | null;
  rowValueValidator?: (rowValue: CELL_VALUE_TYPE) => boolean;
  renderCell?: (cellValue: CELL_VALUE_TYPE) => ReactNode;
}

// Ensure the provider is correctly typed with generic T
const SharedConfigurationsProvider = <CELL_VALUE_TYPE,>({
  children,
  data,
  rowValueValidator,
  renderCell
}: SharedConfigurationsProviderProps<CELL_VALUE_TYPE>) => {
  const initialSharedData = useMemo(
    () => createInitialSharedData<CELL_VALUE_TYPE>(),
    []
  );

  const [sharedData, setSharedData] =
    useState<SharedData<CELL_VALUE_TYPE>>(initialSharedData);

  useEffect(() => {
    const errors: string[] = [];

    if (!data) {
      errors.push(
        "[SharedConfigurationsProvider]: [Datavalidation]: Null or undefined data provided. Table rendering not possible!"
      );
    } else if (!validateDataStructure(data, rowValueValidator)) {
      errors.push(
        "[SharedConfigurationsProvider]: [Datavalidation]: The provided data structure is invalid."
      );
    }

    const isValidData = errors.length === 0 && validateDataStructure(data);

    setSharedData({
      errors,
      isValidData,
      validatedData: isValidData ? data : null,
      renderCell
    });
  }, [data]);

  return (
    <SharedConfigurationsContext.Provider value={{ sharedData }}>
      {children}
    </SharedConfigurationsContext.Provider>
  );
};

// Custom hook to use shared configurations and data
const useSharedConfigurations = <
  CELL_VALUE_TYPE,
>(): SharedConfigurationsContextType<CELL_VALUE_TYPE> => {
  const context = useContext(SharedConfigurationsContext);
  if (!context) {
    throw new Error(
      "useSharedConfigurations must be used within a SharedConfigurationsProvider"
    );
  }
  return context as SharedConfigurationsContextType<CELL_VALUE_TYPE>;
};

export { SharedConfigurationsProvider, useSharedConfigurations };
