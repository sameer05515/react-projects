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
    validatedData: ComparisonDataType<T> | null;
  }
  
  interface SharedConfigurationsContextType<T> {
    sharedData: SharedData<T>;
  }
  
  /** Initial shared data (use type parameter T) */
  const createInitialSharedData = <T,>(): SharedData<T> => ({
    errors: [],
    validatedData: null,
  });
  
  /** Create a context for shared configurations and data */
  const SharedConfigurationsContext = createContext<
    SharedConfigurationsContextType<any> | undefined
  >(undefined);
  
  interface SharedConfigurationsProviderProps<T> {
    children: ReactNode;
    data: ComparisonDataType<T>;
  }
  
  // Ensure the provider is correctly typed with generic T
  const SharedConfigurationsProvider = <T,>({
    children,
    data,
  }: SharedConfigurationsProviderProps<T>) => {
    const initialSharedData = useMemo(() => createInitialSharedData<T>(), []);
  
    const [sharedData, setSharedData] = useState<SharedData<T>>(initialSharedData);
  
    useEffect(() => {
      setSharedData((prev) => ({
        ...prev,
        errors: data ? [] : ["Null or undefined data provided. Table rendering not possible!!"],
        validatedData: data || null,
      }));
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
  