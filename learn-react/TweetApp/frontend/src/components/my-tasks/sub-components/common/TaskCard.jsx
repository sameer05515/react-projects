import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import FloatingButton from "../../../../common/components/floating-button/FloatingButton";
import HoverableSpan from "../../../../common/components/hoverable-span/HoverableSpan";
import {
  SmartEditor,
  SmartPreviewer,
  availableOutputTypes as SupportedTextFormats,
} from "../../../../common/components/Smart/Editor/v3";
import ToggleablePanel from "../../../../common/components/toggleable-panel/ToggleablePanel";
import {
  activityList,
  getStatusLabelForId,
} from "../../../../common/constants/globalConstants";
import {
  getUserIdFromToken,
  getUserNameFromToken,
} from "../../../../common/service/authService";
import { formatDateToDDMMMYYYYWithTime } from "../../../../common/service/commonService";
import { updateTask } from "../../../../redux/slices/taskSlice";
import { prepareTaskTitle } from "./taskUtils";
import { getTagsForGivenIds } from "../../../../redux/slices/tagsSlice";

const TASK_BTN_CLASS =
  "bg-teal-50 border border-teal-300 text-teal-800 px-1.5 py-0.5 text-xs rounded mr-2.5 cursor-pointer hover:bg-teal-100 transition-colors";

const TaskCard = ({
  task,
  showDescription = false,
  pinnedTasks = [],
  isPinned = false,
  onEdit = () => {},
  onTaskTraversal = () => {},
  onAddSubTask = () => {},
  onChildTaskClick = () => {},
  onPinTask = () => {},
  onLinkedTagSelection = () => {},
}) => {
  const [showDescr, setShowDescr] = useState(showDescription);


  const filteredTags = useSelector(getTagsForGivenIds(task?.tags || []));

  const handleTraverse = (increment) => onTaskTraversal(increment);
  const handleDescriptionToggle = () => setShowDescr((prev) => !prev);
  const handlePinTaskToggle = () => onPinTask(task, isPinned);
  const handleLinkedTagSelection = (linkedTagUID) =>
    onLinkedTagSelection(linkedTagUID);

  return (
    <>
      <TaskButtons
        onEdit={() => onEdit(task)}
        showDescr={showDescr}
        handleDescriptionToggle={handleDescriptionToggle}
        handleTraverse={handleTraverse}
        handlePinTask={handlePinTaskToggle}
        isPinned={isPinned}
        pinnedTasks={pinnedTasks}
        onChildTaskClick={onChildTaskClick}
      />

      <TaskDetails task={task} />

      <CustomButton className={TASK_BTN_CLASS} onClick={() => onAddSubTask(task)}>
        Add Sub Task
      </CustomButton>

      {showDescr && <TaskDescription task={task} />}

      {filteredTags.length > 0 && (
        <TaskTags
          tags={filteredTags}
          handleLinkedTagSelection={handleLinkedTagSelection}
        />
      )}

      {task.children?.length > 0 && (
        <TaskChildren
          children={task.children}
          onChildTaskClick={onChildTaskClick}
        />
      )}

      <ActivityComp task={task} />
    </>
  );
};

// Sub-components
const TaskButtons = ({
  onEdit,
  showDescr,
  handleDescriptionToggle,
  handleTraverse,
  handlePinTask,
  isPinned,
  pinnedTasks,
  onChildTaskClick,
}) => {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <CustomButton className={TASK_BTN_CLASS} onClick={() => handleTraverse(-1)}>
        Previous
      </CustomButton>
      <CustomButton className={TASK_BTN_CLASS} onClick={onEdit}>
        Edit
      </CustomButton>
      <CustomButton className={TASK_BTN_CLASS} onClick={handleDescriptionToggle}>
        {showDescr ? "Hide Description" : "Show Description"}
      </CustomButton>
      <CustomButton className={TASK_BTN_CLASS} onClick={() => handleTraverse(1)}>
        Next
      </CustomButton>
      <CustomButton className={TASK_BTN_CLASS} onClick={handlePinTask}>
        {isPinned ? "Un-Pin" : "Pin"} Task
      </CustomButton>

      <FloatingButton
        buttonClassName="mr-2.5 bg-teal-100 border border-teal-300 text-teal-800 text-xs rounded px-2 py-1 hover:bg-teal-200"
        buttonText="Show Pinned Tasks"
      >
        <div className="p-2.5">
          <b>List of All Pinned Tasks:</b>
        </div>
        {pinnedTasks.length > 0 ? (
          <ul className="list-none pl-0">
            {pinnedTasks.map((t) => (
              <li className="ml-4 pb-1" key={t.uniqueId}>
                <HoverableSpan onClick={() => onChildTaskClick({ uniqueId: t.linkedUniqueId })}>
                  {t.title}
                </HoverableSpan>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-2.5">No pinned tasks available.</div>
        )}
      </FloatingButton>
    </div>
  );
};

const TaskDetails = ({ task }) => (
  <div className="mb-4 text-teal-800">
    <SmartPreviewer
      data={{
        content: prepareTaskTitle(task, "TaskCard"),
        textOutputType: SupportedTextFormats.MARKDOWN,
      }}
      markdownStyles={{ fontSize: "20px" }}
    />

    <div className="text-xs rounded flex flex-wrap gap-2.5 mb-1.5">
      <span>
        <strong>Status:</strong> {getStatusLabelForId(task.taskStatus)}
      </span>
      <span>
        <b>Created:</b> {formatDateToDDMMMYYYYWithTime(task.createdDate)}
      </span>
      <span>
        <b>Last Updated:</b> {formatDateToDDMMMYYYYWithTime(task.updatedDate)}
      </span>
      <span>
        <strong>Unique ID:</strong> {task.uniqueId}
      </span>
      {task.parentId && (
        <span>
          <strong>Parent ID:</strong> {task.parentId}
        </span>
      )}
    </div>
  </div>
);

const TaskDescription = ({ task }) => (
  <div className="bg-emerald-50 border border-teal-200 p-1.5 rounded-lg mb-2.5">
    <ToggleablePanel showContent={true} title={"Descriptions:"}>
      {task.descriptions?.map((descr, idx) => (
        <ToggleablePanel
          key={idx}
          showContent={task.descriptions.length === 1}
          title={`Description #${idx + 1}`}
        >
          <SmartPreviewer data={descr} />
        </ToggleablePanel>
      ))}
    </ToggleablePanel>
  </div>
);

const TaskTags = ({ tags, handleLinkedTagSelection }) => (
  <div className="bg-teal-50 border border-teal-200 p-1.5 rounded-lg mb-2.5">
    <b>Tags:</b>
    {tags.map(
      (tag) =>
        tag && (
          <HoverableSpan
            className={`${TASK_BTN_CLASS} inline-block`}
            key={tag._id}
            onClick={() => handleLinkedTagSelection(tag.uniqueId)}
          >
            {tag.title}
          </HoverableSpan>
        )
    )}
  </div>
);

const TaskChildren = ({ children, onChildTaskClick }) => (
  <div className="bg-emerald-50/80 border border-teal-200 p-1.5 rounded-lg mb-2.5">
    <b>Child Tasks:</b>
    <ul className="list-disc list-inside">
      {children.map((t) => (
        <li key={t.uniqueId}>
          <HoverableSpan onClick={() => onChildTaskClick(t)}>
            {t.name}
          </HoverableSpan>
        </li>
      ))}
    </ul>
  </div>
);

const ActivityComp = ({ task }) => {
  const dispatch = useDispatch();
  const [selectedActivity, setSelectedActivity] = useState(activityList[1]);
  const [showForm, setShowForm] = useState(false);
  const [tActivities, setTActivities] = useState(task.activities || []);
  const [formData, setFormData] = useState({
    uniqueId: "",
    type: "comment",
    description: {
      content: "",
      textOutputType: "",
      textInputType: "",
    },
  });
  const [formErrors, setFormErrors] = useState([]);
  const [smartEditorError, setSmartEditorError] = useState(null);

  const validateForm = () => {
    const errors = [];
    if (smartEditorError) {
      errors.push(smartEditorError);
    }
    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSmartEditorChange = (smartContent) => {
    setFormData((prev) => ({ ...prev, description: smartContent }));
  };

  const handleSmartEditorError = (error) => {
    setSmartEditorError(error);
  };

  const saveComment = () => {
    if (!validateForm()) {
      console.log("Some validation occureed");
      return;
    }

    const newActivity = {
      uniqueId: formData.uniqueId || "",
      type: "comment",
      description: formData.description,
      userDetails: {
        name: getUserNameFromToken(),
        id: getUserIdFromToken(),
      },
      createdDate: new Date(),
      updatedDate: new Date(),
    };

    let updatedActivities;
    if (formData.uniqueId) {
      // Update existing activity
      updatedActivities = tActivities.map((activity) =>
        activity.uniqueId === formData.uniqueId ? newActivity : activity
      );
    } else {
      // Add new activity
      updatedActivities = [...tActivities, newActivity];
    }

    setTActivities(updatedActivities);

    dispatch(
      updateTask({
        taskId: task._id,
        taskData: { ...task, activities: updatedActivities },
      })
    );

    setShowForm(false);
    setFormData({
      uniqueId: "",
      type: "comment",
      description: {
        content: "",
        textOutputType: "",
        textInputType: "",
      },
    });
  };

  const handleEditActivity = (activity) => {
    setFormData({ ...activity });
    setShowForm(true);
  };

  const renderActivities = () =>
    tActivities.map((activity, idx) => (
      <div key={activity.uniqueId} className="bg-teal-50 border border-teal-200 p-1.5 rounded-lg mb-2.5">
        <div className="text-xs rounded flex flex-wrap gap-2.5 mb-1.5">
          <strong className="text-sm mr-2.5">{activity.userDetails.name}</strong>
          <span className="mr-2.5">
            <strong>Created:</strong>{" "}
            {formatDateToDDMMMYYYYWithTime(activity.createdDate)}
          </span>
          <span>
            <strong>Updated:</strong>{" "}
            {formatDateToDDMMMYYYYWithTime(activity.updatedDate)}
          </span>
        </div>
        <ToggleablePanel showContent={true} title={`Activity #${idx + 1}`}>
          <SmartPreviewer data={activity.description} />
        </ToggleablePanel>
        {activity.userDetails.id === getUserIdFromToken() && (
          <CustomButton
            className={TASK_BTN_CLASS}
            onClick={() => handleEditActivity(activity)}
          >
            Edit
          </CustomButton>
        )}
      </div>
    ));

  const renderContent = () => {
    if (selectedActivity.id === "1") {
      return <div>List of all histories (to be implemented)</div>;
    } else if (selectedActivity.id === "2") {
      return (
        <>
          {!showForm && (
            <CustomButton
              className={TASK_BTN_CLASS}
              onClick={() => setShowForm(true)}
            >
              Add New Comment
            </CustomButton>
          )}

          {showForm && (
            <CommentForm
              formData={formData}
              setFormData={setFormData}
              formErrors={formErrors}
              handleSmartEditorChange={handleSmartEditorChange}
              handleSmartEditorError={handleSmartEditorError}
              saveComment={saveComment}
              setShowForm={setShowForm}
            />
          )}

          {tActivities.length > 0 ? (
            renderActivities()
          ) : (
            <div className="p-2.5">No comments available.</div>
          )}
        </>
      );
    }
  };

  return (
    <div className="bg-teal-50/80 border border-teal-200 p-1.5 rounded-lg mb-2.5">
      <b className="text-teal-900">Activity</b>
      <div className="mt-2">
        Show
        {activityList.map((a) => (
          <HoverableSpan
            key={a.id}
            className={`px-1.5 py-0.5 text-xs rounded mr-2.5 ml-2.5 cursor-pointer ${
              selectedActivity.id === a.id ? "bg-teal-200 text-teal-900" : "text-teal-700"
            }`}
            isSelected={selectedActivity.id === a.id}
            isHoverable={a.active}
            onClick={() => setSelectedActivity(a)}
          >
            <b>{a.label}</b>
          </HoverableSpan>
        ))}
      </div>
      {renderContent()}
    </div>
  );
};

const CommentForm = ({
  formData,
  setFormData,
  formErrors,
  handleSmartEditorChange,
  handleSmartEditorError,
  saveComment,
  setShowForm,
}) => (
  <div className="mt-4">
    <label htmlFor="description" className="block font-semibold mb-2 text-teal-900">
      {formData.uniqueId ? "Edit" : "New"} Comment
    </label>
    <SmartEditor
      preview={false}
      initialValue={formData.description}
      onChange={handleSmartEditorChange}
      onError={handleSmartEditorError}
    />
    {formErrors.length > 0 && (
      <div className="mt-2">
        {formErrors.map((error, index) => (
          <span key={index} className="block text-red-600 text-sm mt-1.5">
            {error}
          </span>
        ))}
      </div>
    )}
    <div className="mt-4 flex gap-2">
      <CustomButton className={TASK_BTN_CLASS} onClick={saveComment}>
        {formData.uniqueId ? "Update" : "Save"}
      </CustomButton>
      <CustomButton
        className={TASK_BTN_CLASS}
        onClick={() => {
          setShowForm(false);
          setFormData({
            uniqueId: "",
            type: "comment",
            description: { content: "", textOutputType: "", textInputType: "" },
          });
        }}
      >
        Cancel
      </CustomButton>
    </div>
  </div>
);

export default TaskCard;
