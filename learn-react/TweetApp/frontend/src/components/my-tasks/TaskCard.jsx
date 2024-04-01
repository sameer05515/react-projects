import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useDispatch } from "react-redux";
import {
  getUserIdFromToken,
  getUserNameFromToken,
} from "../../common/authService";
import { formatDateToDDMMMYYYYWithTime } from "../../common/commonService";
import HoverableSpan from "../../common/components/HoverableSpan";
import {
  activityList,
  getStatusLabelForId,
} from "../../common/globalConstants";
import { updateTask } from "../../redux/slices/taskSlice";
import CustomButton from "../../common/components/CustomButton";
import HtmlTextRendrer from "../../common/components/HtmlTextRenderer";

const TaskCard = ({
  task,
  tags = [],
  showDescription = false,
  onEdit = () => { },
  onTaskTraversal = () => { },
  onAddSubTask = () => { },
  onChildTaskClick = () => { },
}) => {
  const [showDescr, setShowDescr] = useState(showDescription);
  const filteredTags = task.tags?.map((tagId) =>
    tags.find((tag) => tag.tagId === tagId)
  );

  const handleEdit = () => {
    // console.log(`Edit : ${JSON.stringify(topic)}`);
    // console.log(`typeof onEdit: ${typeof onEdit}`);
    onEdit(task);
  };
  const traverseTask = (increment = 0) => {
    // console.log(`Soon task will traverse and show data with increment: ${increment}`);
    onTaskTraversal(increment);
  };

  const handleAddSubTask = () => {
    onAddSubTask(task);
  };

  return (
    <>
      <div>
        <div>
          <CustomButton
            style={{ ...styles.tagStyle, marginRight: "10px" }}
            onClick={() => traverseTask(-1)}
          >
            Previous
          </CustomButton>

          <CustomButton
            style={{ ...styles.tagStyle, marginRight: "10px" }}
            onClick={handleEdit}
          >
            Edit
          </CustomButton>
          {!showDescr && (
            <CustomButton
              style={{ ...styles.tagStyle, marginRight: "10px" }}
              onClick={() => setShowDescr(true)}
            >
              Show Description
            </CustomButton>
          )}
          {showDescr && (
            <CustomButton
              style={{ ...styles.tagStyle, marginRight: "10px" }}
              onClick={() => setShowDescr(false)}
            >
              Hide Description
            </CustomButton>
          )}

          <CustomButton
            style={{ ...styles.tagStyle, marginRight: "10px" }}
            onClick={() => traverseTask(1)}
          >
            Next
          </CustomButton>
        </div>
        <div>
          <h2>{task.title}</h2>
          <div style={styles.datesStyle}>
            <span style={{ marginRight: "10px" }}>
              <strong>Status:</strong> {getStatusLabelForId(task.taskStatus)}
            </span>
            <span style={{ marginRight: "10px" }}>
              <b>Created:</b> {formatDateToDDMMMYYYYWithTime(task.createdDate)}
            </span>
            <span style={{ marginRight: "10px" }}>
              <b>Last updated:</b>{" "}
              {formatDateToDDMMMYYYYWithTime(task.updatedDate)}
            </span>
            <span style={{ marginRight: "10px" }}>
              <strong>Unique ID:</strong> {task.uniqueId}
            </span>
            <span style={{ marginRight: "10px" }}>
              <strong>Parent ID:</strong> {task.parentId}
            </span>
          </div>
        </div>
        <div style={{ margin: "10px 0" }}>
          <CustomButton
            style={{ ...styles.tagStyle, marginRight: "10px" }}
            onClick={handleAddSubTask}
          >
            Add sub task
          </CustomButton>
        </div>

        {showDescr && (
          <div
            style={{
              backgroundColor: "cornsilk",
              border: "1px solid #999", // Grey border
              padding: "2px 5px", // Adjust padding as needed
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          >
            <b>Description:-</b> <br />
            {ReactHtmlParser(task.description || "")}
          </div>
        )}

        {filteredTags && filteredTags.length > 0 && (
          <div
            style={{
              backgroundColor: "lemonchiffon",
              border: "1px solid #999", // Grey border
              padding: "2px 5px", // Adjust padding as needed
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          >
            <b>Tags:-</b> <br />
            {filteredTags.map(
              (tag) =>
                tag && (
                  <span style={styles.tagStyle} key={tag._id}>
                    {tag.name}
                  </span>
                )
            )}
          </div>
        )}

        {task.children && task.children.length > 0 && (
          <div
            style={{
              backgroundColor: "lightgoldenrodyellow",
              border: "1px solid #999", // Grey border
              padding: "2px 5px", // Adjust padding as needed
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          >
            <b>Child Tasks:-</b> <br />
            {/* {task.children && task.children.length > 0 && ( */}
            <ul>
              {task.children.map((t) => (
                <li key={t.uniqueId}>
                  <span onClick={() => onChildTaskClick(t)}>{t.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <ActivityComp task={task} />

        <div>
          <CustomButton
            style={{ ...styles.tagStyle, marginRight: "10px" }}
            onClick={() => traverseTask(-1)}
          >
            Previous
          </CustomButton>
          <CustomButton style={styles.tagStyle} onClick={() => traverseTask(1)}>
            Next
          </CustomButton>
        </div>
      </div>
    </>
  );
};

const ActivityComp = ({ task, onTaskActivitiesEdit = () => { } }) => {
  const dispatch = useDispatch();
  const [selectedActivity, setSelectedActivity] = useState(activityList[1]);
  const [showForm, setShowForm] = useState(false);
  const [tActivities, setTActivities] = useState(
    task?.activities ? task.activities : []
  );
  // const [selectedtActivity, setSelectedtActivity] = useState(null);
  const [formData, setFormData] = useState({
    uniqueId: null,
    type: "comment",
    description: "",
  });

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData({ ...formData, description: data });
  };

  const handleSpanClick = (clickedItem) => {
    if (clickedItem.active) {
      setSelectedActivity(clickedItem);
    }
  };

  const saveNewComment = () => {
    // console.log(`${formData?.uniqueId?.toString().trim().length>0 ? 'old':'new'} comment , uniqueId : ${formData?.uniqueId}`);
    if (formData?.uniqueId && formData?.uniqueId.trim().length > 0) {
      // update case
      let activityToBeUpdated = tActivities?.find(
        (a) => a.uniqueId === formData.uniqueId
      );
      activityToBeUpdated.description = formData.description;
      // setTActivities((prev)=>{
      //   let activityToBeUpdated= prev?.find(a=> a.uniqueId===formData.uniqueId);
      //   activityToBeUpdated.description= formData.description;
      //   return prev;
      // })
    } else {
      // save case
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

    // setSelectedtActivity(null);
    setFormData((prev) => {
      return {
        uniqueId: "",
        type: "comment",
        description: "",
      };
    });
  };

  const populateDetails = () => {
    if (selectedActivity.id === "1") {
      return (
        <>
          <div>
            <div>list of all histories</div>
          </div>
        </>
      );
    } else if (selectedActivity.id === "2") {
      return (
        <>
          <div>
            {/* <div>list of old comments</div> */}
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
                <div>
                  <label htmlFor="description">
                    {formData?.uniqueId ? "Edit " : "New "} comment
                  </label>
                  <div>
                    <CKEditor
                      id="description"
                      name="description"
                      editor={ClassicEditor}
                      data={formData.description}
                      onChange={handleEditorChange}
                    />
                  </div>
                  <div>
                    <CustomButton
                      style={styles.tagStyle}
                      onClick={saveNewComment}
                    >
                      {formData?.uniqueId ? "Edit " : "Save "}
                    </CustomButton>

                    <CustomButton
                      style={styles.tagStyle}
                      onClick={() => {
                        setShowForm(false);
                        // setSelectedtActivity(null);
                        setFormData((prev) => {
                          return {
                            uniqueId: "",
                            type: "comment",
                            description: "",
                          };
                        });
                      }}
                    >
                      Cancel
                    </CustomButton>
                  </div>
                </div>
              </>
            )}
            {tActivities &&
              tActivities.length > 0 &&
              tActivities.map((activity) => (
                <div
                  style={{
                    backgroundColor: "yellow",
                    border: "1px solid #999", // Grey border
                    padding: "2px 5px", // Adjust padding as needed
                    borderRadius: "4px",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                  key={activity.uniqueId}
                >
                  <div style={styles.datesStyle}>
                    <strong style={{ fontSize: "15px", marginRight: "10px" }}>
                      {activity.userDetails.name}
                    </strong>
                    <span style={{ marginRight: "10px" }}>
                      <strong>Created:</strong>{" "}
                      {formatDateToDDMMMYYYYWithTime(activity.createdDate)}
                    </span>
                    <span>
                      <strong>Updated:</strong>{" "}
                      {formatDateToDDMMMYYYYWithTime(activity.updatedDate)}
                    </span>
                  </div>

                  <div
                    style={{
                      //backgroundColor: "yellow",
                      //border: "1px solid #999", // Grey border
                      padding: "10px 10px", // Adjust padding as needed
                      //borderRadius: "4px",
                      marginBottom: "10px",
                    }}
                  >
                    <HtmlTextRendrer htmlString={activity.description} />
                    {activity.userDetails.id === getUserIdFromToken() && (
                      <CustomButton
                        style={styles.tagStyle}
                        onClick={() => {
                          setShowForm(true);
                          setFormData((prev) => {
                            return {
                              ...activity,
                            };
                          });
                        }}
                      >
                        Edit
                      </CustomButton>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </>
      );
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "lightgoldenrodyellow",
          border: "1px solid #999", // Grey border
          padding: "2px 5px", // Adjust padding as needed
          borderRadius: "4px",
          marginBottom: "10px",
        }}
      >
        <b>Activity</b> <br />
        {/* {JSON.stringify(formData)} */}
        <div>
          Show
          {activityList.map((a) => (
            <HoverableSpan
              key={a.id}
              style={styles.activityStyle}
              isSelected={selectedActivity.id === a.id}
              isHoverable={a.active}
              onClick={() => handleSpanClick(a)}
            >
              <b>{a.label}</b>
            </HoverableSpan>
          ))}
        </div>
        {populateDetails()}
      </div>
    </>
  );
};

const styles = {
  activityStyle: {
    //backgroundColor: "blue", // Grey background color
    //border: "1px solid #999", // Grey border
    padding: "2px 5px", // Adjust padding as needed
    fontSize: "12px", // Small font size
    borderRadius: "4px", // Rounded corners
    marginRight: "10px",
    marginLeft: "10px",
  },
  tagStyle: {
    backgroundColor: "#ccc", // Grey background color
    border: "1px solid #999", // Grey border
    padding: "2px 5px", // Adjust padding as needed
    fontSize: "12px", // Small font size
    borderRadius: "4px", // Rounded corners
    marginRight: "10px",
  },
  datesStyle: {
    // padding: "10px", // Adjust padding as needed
    fontSize: "12px", // Small font size
    borderRadius: "4px", // Rounded corners
    // margin: "10px",
  },
};

export default TaskCard;
