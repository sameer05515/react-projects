import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
// import { myTodos } from "./data";
import FormMessageBuilder from "../../../../../common/components/FormMessages/Builder";
import SmartEditorV4 from "../../../../../common/components/Smart/Editor/v4";
import { prepareErrorMessage } from "../../../../../common/hooks/useConsolidated/message-preparation-utils";
import pipe from "../../../../../common/service/pipe-util";
import {
  // sortTodosByCreatedDate,
  // sortTodosByCreatedDate,
  // sortTodosByGroomed,
  // sortTodosByStatus,
  // sortTodosByUrgencyAndImportance,
  getFilteredTodos,
} from "../../Item.dto";
import { fetchThinkTankItems, saveThinkTankItem, updateThinkTankItem } from "../../utils/ThinkTankApiServices";
import {
  FilterActions,
  FilterActionTypes,
  PurposeToOpenModal,
  validatePurposeWithStrategy,
  ValidationStrategies,
} from "./utils";

const ThinkTankEditorV1Context = createContext();

export const ThinkTankEditorV1ContextProvider = ({ children }) => {
  const [myTodos, setMyTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTTItem, setSelectedTTItem] = useState(null);
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [selectedShowFilterAction, setSelectedShowFilterAction] = useState(FilterActionTypes.SHOW_ALL);

  const openModalForPurpose = useCallback((purpose = "", thinkTankItem = {}) => {
    try {
      validatePurposeWithStrategy(purpose, ValidationStrategies.THROW_ERROR);

      setShowModal(true);
      setSelectedTTItem(thinkTankItem);
      setSelectedPurpose(purpose);
    } catch (error) {
      console.error(prepareErrorMessage(error, "Something unexpected occurred!"));
    }
  }, []);

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

  const refreshList = useCallback(() => handleFetchThinkTankItems(), [handleFetchThinkTankItems]);

  const filteredTodos = useMemo(
    () =>
      pipe(
        (todos) => getFilteredTodos(todos, FilterActions[selectedShowFilterAction]),
        // sortTodosByGroomed,
        // sortTodosByUrgencyAndImportance,
        // sortTodosByStatus,
        // sortTodosByCreatedDate
        (todos) => todos.reverse()
      )(myTodos),
    [myTodos, selectedShowFilterAction]
  );

  const handleGroupBtnClick = useCallback((actionType = FilterActionTypes.SHOW_ALL) => {
    setSelectedShowFilterAction(actionType);
  }, []);

  const handleUpdateThinkTankItem = useCallback(
    async (data, purpose, uniqueId) => {
      try {
        validatePurposeWithStrategy(purpose, ValidationStrategies.THROW_ERROR);

        if (!uniqueId) {
          throw new Error("Not a valid uniqueId: " + uniqueId);
        }

        if (data.content.trim().length < 10) {
          throw new Error("Content is too short. Minimum 10 characters required.");
        }

        const updateResp = await updateThinkTankItem(uniqueId, { smartContent: data });

        if (updateResp.isError) {
          throw new Error(updateResp.message);
        }
        refreshList();
        return {
          isError: false,
          // messages: [{ type: "info", message: "Saved successfully!" }],
          messages: FormMessageBuilder.builder().appendInfo("Think tank item updated successfully!").build(),
        };
      } catch (error) {
        const errMsg = prepareErrorMessage(error, "Something unexpected occurred!");
        return {
          isError: true,
          messages: FormMessageBuilder.builder().appendError(errMsg).build(),
        };
      }
    },
    [refreshList]
  );

  const handleSaveThinkTankItem = useCallback(
    async (data) => {
      try {
        if (data.content.trim().length < 10) {
          throw new Error("Content is too short. Minimum 10 characters required.");
        }
        const saveResp = await saveThinkTankItem({ smartContent: data, itemType: "" });
        if (saveResp.isError) {
          throw new Error(saveResp.message);
        }

        refreshList();

        return {
          isError: false,
          // messages: [{ type: "info", message: "Saved successfully!" }],
          messages: FormMessageBuilder.builder()
            .appendInfo("New Think tank item Saved successfully!")
            .appendInfo("New uniqueid is " + saveResp.data.uniqueId)
            .build(),
        };
      } catch (error) {
        const errMsg = prepareErrorMessage(error, "Something unexpected occurred!");
        return {
          isError: true,
          messages: FormMessageBuilder.builder().appendError(errMsg).build(),
        };
      }
    },
    [refreshList]
  );

  const handleSampleEditorSubmitJustToTest = useCallback(async (data) => {
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
  }, []);

  const { ModalChildrenComponent, modalTitle } = useMemo(() => {
    if (!validatePurposeWithStrategy(selectedPurpose).isValid) {
      return { ModalChildrenComponent: null, modalTitle: "" };
    }
    switch (selectedPurpose) {
      case PurposeToOpenModal.BAS_AISE_HI_TESTING_KE_LIYE:
        return {
          ModalChildrenComponent: <SmartEditorV4 initialValue={{}} onSubmit={handleSampleEditorSubmitJustToTest} />,
          modalTitle: "Just to test",
        };

      case PurposeToOpenModal.SAVE_NEW_TODO:
        return {
          ModalChildrenComponent: <SmartEditorV4 initialValue={{}} onSubmit={handleSaveThinkTankItem} />,
          modalTitle: "Save a new Think Tank Item",
        };

      case PurposeToOpenModal.UPDATE_SMART_CONTENT_OF_EXISTING_TTITEM:
        return {
          ModalChildrenComponent: (
            <SmartEditorV4
              initialValue={selectedTTItem?.smartContent || {}}
              onSubmit={(data) => handleUpdateThinkTankItem(data, selectedPurpose, selectedTTItem?.uniqueId)}
            />
          ),
          modalTitle: "Update Think Tank Item Smart Content",
        };

      default:
        return { ModalChildrenComponent: null, modalTitle: "" };
    }
  }, [
    handleSampleEditorSubmitJustToTest,
    handleSaveThinkTankItem,
    handleUpdateThinkTankItem,
    selectedPurpose,
    selectedTTItem?.smartContent,
    selectedTTItem?.uniqueId,
  ]);

  return (
    <ThinkTankEditorV1Context.Provider
      value={{
        refreshList,
        myTodos,
        showModal,
        filteredTodos,
        setShowModal,
        handleGroupBtnClick,
        ModalChildrenComponent,
        openModalForPurpose,
        modalTitle,
      }}
    >
      {children}
    </ThinkTankEditorV1Context.Provider>
  );
};

// Hook to use the context
export const useThinkTankEditorV1Context = () => {
  const context = useContext(ThinkTankEditorV1Context);
  if (!context) {
    throw new Error("useThinkTankEditorV1Context must be used within a ThinkTankEditorV1ContextProvider");
  }
  return context;
};
