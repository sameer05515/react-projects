import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CustomButton from "../../common/components/CustomButton";
import FloatingButton from "../../common/components/FloatingButton";
import HoverableSpan from "../../common/components/HoverableSpan";
import ToggleablePanel from "../../common/components/ToggleablePanel";
import {
  SmartEditor,
  SmartPreviewer,
} from "../../common/components/smart-editor/SmartEditorV3";
import {
  activityList,
  getStatusLabelForId,
} from "../../common/constants/globalConstants";
import {
  getUserIdFromToken,
  getUserNameFromToken,
} from "../../common/service/authService";
import { formatDateToDDMMMYYYYWithTime } from "../../common/service/commonService";
import { updateTask } from "../../redux/slices/taskSlice";

const ActivityComp = ({ task, onTaskActivitiesEdit = () => { } }) => {
  const dispatch = useDispatch();
  const [selectedActivity, setSelectedActivity] = useState(activityList[1]);
  const [showForm, setShowForm] = useState(false);
  const [tActivities, setTActivities] = useState(
    task?.activities ? task.activities : []
  );
  const [formData, setFormData] = useState({
    uniqueId: null,
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
    return Object.keys(errors).length === 0;
  };

  const handleSmartEditorChange = (smartContent) => {
    setFormData((prev) => ({ ...prev, description: smartContent }));
  };

  const handleSmartEditorError = (error) => {
    setSmartEditorError(error);
  };

  const saveNewComment = () => {
    if (!validateForm()) {
      return;
    }

    if (formData?.uniqueId && formData?.uniqueId.trim().length > 0) {
      let activityToBeUpdated = tActivities?.find(
        (a) => a.uniqueId === formData.uniqueId
      );
      activityToBeUpdated.description = formData.description;
    } else {
      setTActivities((prev) => [
        ...prev,
        {
          type: "comment",
          description: formData.description,
          userDetails: {
            name: getUserNameFromToken(),
            id: getUserIdFromToken(),
          },
        },
      ]);
    }

    dispatch(
      updateTask({
        taskId: task._id,
        taskData: {
          activities: [
            {
              uniqueId: formData.uniqueId,
              type: "comment",
              description: formData.description,
              userDetails: {
                name: getUserNameFromToken(),
                id: getUserIdFromToken(),
              },
            },
          ],
        },
      })
    );

    setShowForm(false);
    setFormData({ uniqueId: "", type: "comment", description: "" });
  };

  const populateDetails = () => {
    if (selectedActivity.id === "1") {
      return <div>list of all histories</div>;
    } else if (selectedActivity.id === "2") {
      return (
        <>
          {!showForm && (
            <CustomButton
              style={styles.tagStyle}
              onClick={() => setShowForm(true)}
            >
              Add new comment
            </CustomButton>
          )}

          {showForm && (
            <>
              <label htmlFor="description">
                {formData?.uniqueId ? "Edit " : "New "} comment
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
              <CustomButton style={styles.tagStyle} onClick={saveNewComment}>
                {formData?.uniqueId ? "Edit " : "Save "}
              </CustomButton>
              <CustomButton
                style={styles.tagStyle}
                onClick={() => {
                  setShowForm(false);
                  setFormData({
                    uniqueId: "",
                    type: "comment",
                    description: "",
                  });
                }}
              >
                Cancel
              </CustomButton>
            </>
          )}
          {tActivities &&
            tActivities.length > 0 &&
            tActivities.map((activity, idxx) => (
              <div key={activity.uniqueId} style={styles.activityCard}>
                <div style={styles.datesStyle}>
                  <strong style={styles.userName}>
                    {activity.userDetails.name}
                  </strong>
                  <span style={styles.dateSpan}>
                    <strong>Created:</strong>{" "}
                    {formatDateToDDMMMYYYYWithTime(activity.createdDate)}
                  </span>
                  <span>
                    <strong>Updated:</strong>{" "}
                    {formatDateToDDMMMYYYYWithTime(activity.updatedDate)}
                  </span>
                </div>
                <ToggleablePanel
                  showContent={true}
                  title={`Activity # ${idxx + 1}`}
                >
                  <SmartPreviewer data={activity.description} />
                </ToggleablePanel>
                {activity.userDetails.id === getUserIdFromToken() && (
                  <CustomButton
                    style={styles.tagStyle}
                    onClick={() => {
                      setShowForm(true);
                      setFormData({ ...activity });
                    }}
                  >
                    Edit
                  </CustomButton>
                )}
              </div>
            ))}
        </>
      );
    }
  };

  return (
    <div style={styles.activityContainer}>
      <b>Activity</b> <br />
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
      {populateDetails()}
    </div>
  );
};

const TaskCard = ({
  task,
  tags = [],
  showDescription = false,
  pinnedTasks = [],
  isPinned = false,
  onEdit = () => { },
  onTaskTraversal = () => { },
  onAddSubTask = () => { },
  onChildTaskClick = () => { },
  onPinTask = () => { },
  onLinkedTagSelection = () => { },
}) => {
  const [showDescr, setShowDescr] = useState(showDescription);
  const filteredTags = task.tags?.map((uniqueId) =>
    tags.find((tag) => tag.uniqueId === uniqueId)
  );

  const handleTraverse = (increment) => onTaskTraversal(increment);
  const handleDescriptionToggle = () => setShowDescr((prev) => !prev);
  const handlePinTask = () => onPinTask(task, isPinned);
  const handleLinkedTagSelection = (linkedTagUID) =>
    onLinkedTagSelection(linkedTagUID);

  return (
    <>
      <TaskButtons
        onEdit={() => onEdit(task)}
        showDescr={showDescr}
        handleDescriptionToggle={handleDescriptionToggle}
        handleTraverse={handleTraverse}
        handlePinTask={handlePinTask}
        isPinned={isPinned}
        pinnedTasks={pinnedTasks}
        onChildTaskClick={onChildTaskClick}
      />

      <TaskDetails task={task} />

      <CustomButton style={styles.tagStyle} onClick={() => onAddSubTask(task)}>
        Add sub task
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
      {isPinned ? "Un-Pin" : "Pin"} task
    </CustomButton>

    <FloatingButton
      buttonStyle={styles.tagStyle}
      buttonText={"Show Pinned Tasks"}
    >
      <div style={{ padding: "10px" }}>
        <b>List of all pinned Tasks:</b>
      </div>
      {pinnedTasks.length > 0 && (
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
      )}
    </FloatingButton>
  </div>
);

const TaskDetails = ({ task }) => (
  <div>
    <h2>{task.name}</h2>
    <div style={styles.datesStyle}>
      <span>
        <strong>Status:</strong> {getStatusLabelForId(task.taskStatus)}
      </span>
      <span>
        <b>Created:</b> {formatDateToDDMMMYYYYWithTime(task.createdDate)}
      </span>
      <span>
        <b>Last updated:</b> {formatDateToDDMMMYYYYWithTime(task.updatedDate)}
      </span>
      <span>
        <strong>Unique ID:</strong> {task.uniqueId}
      </span>
      <span>
        <strong>Parent ID:</strong> {task.parentId}
      </span>
    </div>
  </div>
);

const TaskDescription = ({ task }) => (
  <div style={styles.descriptionStyle}>
    <ToggleablePanel showContent={true} title={"Descriptions:"}>
      {task.descriptions?.map((descr, idx) => (
        <ToggleablePanel
          showContent={task.descriptions.length === 1}
          title={`Description # ${idx + 1}`}
          key={idx}
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
          <span onClick={() => onChildTaskClick(t)}>{t.name}</span>
        </li>
      ))}
    </ul>
  </div>
);

const styles = {
  error: { color: "red", fontSize: "14px", marginTop: "5px", display: "block" },
  activityStyle: {
    padding: "2px 5px",
    fontSize: "12px",
    borderRadius: "4px",
    marginRight: "10px",
    marginLeft: "10px",
  },
  tagStyle: {
    backgroundColor: "#ccc",
    border: "1px solid #999",
    padding: "2px 5px",
    fontSize: "12px",
    borderRadius: "4px",
    marginRight: "10px",
  },
  datesStyle: { fontSize: "12px", borderRadius: "4px" },
  descriptionStyle: {
    backgroundColor: "cornsilk",
    border: "1px solid #999",
    padding: "2px 5px",
    borderRadius: "4px",
    marginBottom: "10px",
  },
  tagContainerStyle: {
    backgroundColor: "lemonchiffon",
    border: "1px solid #999",
    padding: "2px 5px",
    borderRadius: "4px",
    marginBottom: "10px",
  },
  childrenContainerStyle: {
    backgroundColor: "lightgoldenrodyellow",
    border: "1px solid #999",
    padding: "2px 5px",
    borderRadius: "4px",
    marginBottom: "10px",
  },
};

export default TaskCard;
