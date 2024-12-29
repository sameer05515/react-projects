import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import FloatingButton from "../../../../common/components/floating-button/FloatingButton";
import HoverableSpan from "../../../../common/components/hoverable-span/HoverableSpan";
import {
  SmartEditor,
  SmartPreviewer,
  availableOutputTypes as SupportedTextFormats,
} from "../../../../common/components/smart-editor/SmartEditorV3";
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

const TaskCard = ({
  task,
  tags = [],
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
  const filteredTags = task.tags?.map((uniqueId) =>
    tags.find((tag) => tag.uniqueId === uniqueId)
  );

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

      <CustomButton style={styles.tagStyle} onClick={() => onAddSubTask(task)}>
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

// Extracted components
const TaskButtons = ({
  onEdit,
  showDescr,
  handleDescriptionToggle,
  handleTraverse,
  handlePinTask,
  isPinned,
  pinnedTasks,
  onChildTaskClick,
}) => (
  <div>
    <CustomButton style={styles.tagStyle} onClick={() => handleTraverse(-1)}>
      Previous
    </CustomButton>
    <CustomButton style={styles.tagStyle} onClick={onEdit}>
      Edit
    </CustomButton>
    <CustomButton style={styles.tagStyle} onClick={handleDescriptionToggle}>
      {showDescr ? "Hide Description" : "Show Description"}
    </CustomButton>
    <CustomButton style={styles.tagStyle} onClick={() => handleTraverse(1)}>
      Next
    </CustomButton>
    <CustomButton style={styles.tagStyle} onClick={handlePinTask}>
      {isPinned ? "Un-Pin" : "Pin"} Task
    </CustomButton>

    <FloatingButton
      buttonStyle={styles.tagStyle}
      buttonText={"Show Pinned Tasks"}
    >
      <div style={{ padding: "10px" }}>
        <b>List of All Pinned Tasks:</b>
      </div>
      {pinnedTasks.length > 0 ? (
        <ul style={styles.ulStyle}>
          {pinnedTasks.map((t) => (
            <li style={styles.liStyles} key={t.uniqueId}>
              <HoverableSpan
                onClick={() => onChildTaskClick({ uniqueId: t.linkedUniqueId })}
              >
                {t.title}
              </HoverableSpan>
            </li>
          ))}
        </ul>
      ) : (
        <div style={{ padding: "10px" }}>No pinned tasks available.</div>
      )}
    </FloatingButton>
  </div>
);

const TaskDetails = ({ task }) => (
  <div>
    <SmartPreviewer
      data={{
        content: prepareTaskTitle(task, 'TaskCard'),
        textOutputType: SupportedTextFormats.MARKDOWN,
      }}
      markdownStyles={{ fontSize: "20px" }}
    />

    <div style={styles.datesStyle}>
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
  <div style={styles.descriptionStyle}>
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
  <div style={styles.tagContainerStyle}>
    <b>Tags:</b>
    {tags.map(
      (tag) =>
        tag && (
          <HoverableSpan
            style={styles.tagStyle}
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
  <div style={styles.childrenContainerStyle}>
    <b>Child Tasks:</b>
    <ul>
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
      <div key={activity.uniqueId} style={styles.activityCard}>
        <div style={styles.datesStyle}>
          <strong style={styles.userName}>{activity.userDetails.name}</strong>
          <span style={styles.dateSpan}>
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
            style={styles.tagStyle}
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
              style={styles.tagStyle}
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
            <div style={{ padding: "10px" }}>No comments available.</div>
          )}
        </>
      );
    }
  };

  return (
    <div style={styles.activityContainer}>
      <b>Activity</b>
      <div>
        Show
        {activityList.map((a) => (
          <HoverableSpan
            key={a.id}
            style={styles.activityStyle}
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
  <div>
    <label htmlFor="description">
      {formData.uniqueId ? "Edit" : "New"} Comment
    </label>
    <SmartEditor
      preview={false}
      initialValue={formData.description}
      onChange={handleSmartEditorChange}
      onError={handleSmartEditorError}
    />

    {formErrors.length > 0 && (
      <div>
        {formErrors.map((error, index) => (
          <span key={index} style={styles.error}>
            {error}
          </span>
        ))}
      </div>
    )}
    <CustomButton style={styles.tagStyle} onClick={saveComment}>
      {formData.uniqueId ? "Update" : "Save"}
    </CustomButton>
    <CustomButton
      style={styles.tagStyle}
      onClick={() => {
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
      }}
    >
      Cancel
    </CustomButton>
  </div>
);

const styles = {
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "5px",
    display: "block",
  },
  activityStyle: {
    padding: "2px 5px",
    fontSize: "12px",
    borderRadius: "4px",
    marginRight: "10px",
    marginLeft: "10px",
    cursor: "pointer",
  },
  tagStyle: {
    backgroundColor: "#ccc",
    border: "1px solid #999",
    padding: "2px 5px",
    fontSize: "12px",
    borderRadius: "4px",
    marginRight: "10px",
    cursor: "pointer",
  },
  datesStyle: {
    fontSize: "12px",
    borderRadius: "4px",
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "5px",
  },
  descriptionStyle: {
    backgroundColor: "cornsilk",
    border: "1px solid #999",
    padding: "5px",
    borderRadius: "4px",
    marginBottom: "10px",
  },
  tagContainerStyle: {
    backgroundColor: "lemonchiffon",
    border: "1px solid #999",
    padding: "5px",
    borderRadius: "4px",
    marginBottom: "10px",
  },
  childrenContainerStyle: {
    backgroundColor: "lightgoldenrodyellow",
    border: "1px solid #999",
    padding: "5px",
    borderRadius: "4px",
    marginBottom: "10px",
  },
  activityContainer: {
    backgroundColor: "lightgoldenrodyellow",
    border: "1px solid #999",
    padding: "5px",
    borderRadius: "4px",
    marginBottom: "10px",
  },
  activityCard: {
    backgroundColor: "lightyellow",
    border: "1px solid #999",
    padding: "5px",
    borderRadius: "4px",
    marginBottom: "10px",
  },
  userName: {
    fontSize: "15px",
    marginRight: "10px",
  },
  dateSpan: {
    marginRight: "10px",
  },
};

export default TaskCard;
