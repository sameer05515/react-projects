import { createContext, useContext } from "react";

const ThinkTankEditorV1Context = createContext();

export const ThinkTankEditorV1ContextProvider = ({ children }) => {
  return <ThinkTankEditorV1Context.Provider value={{}}>{children}</ThinkTankEditorV1Context.Provider>;
};

// Hook to use the context
export const useThinkTankEditorV1Context = () => {
  const context = useContext(ThinkTankEditorV1Context);
  if (!context) {
    throw new Error("useThinkTankEditorV1Context must be used within a ThinkTankEditorV1ContextProvider");
  }
  return context;
};
