import { createContext, useCallback, useContext, useEffect, useState } from "react";
// import { myTodos } from "./data";
import FormMessageBuilder from "../../../../common/components/FormMessages/Builder";
import pipe from "../../../../common/service/pipe-util";
import { fetchThinkTankItems } from "../utils/ThinkTankApiServices";
import {
  getFilteredTodos,
  // sortTodosByCreatedDate,
  // sortTodosByCreatedDate,
  // sortTodosByGroomed,
  // sortTodosByStatus,
  // sortTodosByUrgencyAndImportance,
  Status
} from "../Item.dto";

export const FilterActionTypes = {
  SHOW_ALL: "show-all",
  SHOW_OPEN_ONLY: "show-open-only",
  SHOW_CLOSED_ONLY: "show-closed-only",
};

const FilterActions = {
  [FilterActionTypes.SHOW_ALL]: (todo) => true,
  [FilterActionTypes.SHOW_OPEN_ONLY]: (todo) => todo.status === Status.OPEN,
  [FilterActionTypes.SHOW_CLOSED_ONLY]: (todo) => todo.status === Status.CLOSED,
};

const ThinkTankEditorV1Context = createContext();

export const ThinkTankEditorV1ContextProvider = ({ children }) => {

  const [myTodos, setMyTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleFetchThinkTankItems = useCallback(() => {
    fetchThinkTankItems({})
      .then((response) => {
        if (!response.isError) {
          setMyTodos([...response.data]);
        }

        console.log(response);
      })
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    handleFetchThinkTankItems();
  }, [handleFetchThinkTankItems]);
  const [filteredTodos, setFilteredTodos] = useState(() =>
    pipe(
      // sortTodosByGroomed,
      // sortTodosByUrgencyAndImportance,
      // sortTodosByStatus,
      // sortTodosByCreatedDate
      (todos) => todos.reverse()
    )(myTodos)
  );
  const handleGroupBtnClick = useCallback(
    (actionType = FilterActionTypes.SHOW_ALL) => {
      setFilteredTodos(
        pipe(
          (todos) => getFilteredTodos(todos, FilterActions[actionType]),
          // sortTodosByGroomed,
          // sortTodosByUrgencyAndImportance,
          // sortTodosByStatus,
          // (todos) => sortTodosByCreatedDate(todos, false),
          (todos) => todos.reverse()
        )(myTodos)
      );
    },
    [myTodos]
  );

  const handleEditorSubmit = async (data) => {
    console.log("Submitting data:", data);

    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock validation
        if (data.content.trim().length < 10) {
          resolve({
            isError: true,
            // messages: [{ type: "error", message: "Content is too short. Minimum 10 characters required." }],
            messages: FormMessageBuilder.builder()
              .appendError("Content is too short. Minimum 10 characters required.")
              .build(),
          });
        } else {
          resolve({
            isError: false,
            // messages: [{ type: "info", message: "Saved successfully!" }],
            messages: FormMessageBuilder.builder().appendInfo("Saved successfully!").build(),
          });
        }
      }, 1000); // Simulate async delay
    });
  };
  return <ThinkTankEditorV1Context.Provider value={{myTodos,showModal,filteredTodos,setShowModal,handleGroupBtnClick,handleEditorSubmit}}>{children}</ThinkTankEditorV1Context.Provider>;
};

// Hook to use the context
export const useThinkTankEditorV1Context = () => {
  const context = useContext(ThinkTankEditorV1Context);
  if (!context) {
    throw new Error("useThinkTankEditorV1Context must be used within a ThinkTankEditorV1ContextProvider");
  }
  return context;
};
