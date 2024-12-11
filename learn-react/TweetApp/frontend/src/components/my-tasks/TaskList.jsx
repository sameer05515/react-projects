import React, { /*useEffect*/ } from 'react';
import AutoCompleteDropdown from '../../common/components/auto-complete/AutoCompleteDropdown';
import CustomButton from '../../common/components/custom-button/CustomButton';
import TaskCard from './TaskCard';


const TaskList = ({ tasks, itemsPerRow = 3, onEditTask, onViewTask, tags=[] }) => {  
  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Adjust as needed
  };

  const taskItemStyle = {
    flex: '0 0 calc(33.33% - 10px)', // Default to 3 items per row with 10px spacing
    margin: '5px', // Adjust spacing between items as needed
    padding: '10px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    backgroundColor: 'light-green',
    borderRadius: '10px',
    /* Add any other styling you need */
  };

  

  const rows = [];
  for (let i = 0; i < tasks.length; i += itemsPerRow) {
    const rowTasks = tasks.slice(i, i + itemsPerRow);
    rows.push(
      <div style={containerStyle} key={i}>
        {rowTasks.map((task) => (
          <div style={taskItemStyle} key={task.uniqueId}>
            {/* <strong>Name:</strong> {task.name}<br />
            <div>{ReactHtmlParser(task.description || "")}</div>
            <strong>Status:</strong> {task.taskStatus}<br />
            <strong>Total linked tasks:</strong> {task.linkedTasks?task.linkedTasks.length:0}<br /> */}
            <TaskCard task={task} tags={tags}/>
            <CustomButton onClick={() => onEditTask(task)} style={{ marginRight: '10px' }}>Edit</CustomButton>
            <CustomButton onClick={() => onViewTask(task)}>View</CustomButton>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2>Task List</h2>
      {rows}
      <AutoCompleteDropdown names={tasks.map(t=> t.title)}/>
    </div>
  );
};

export default TaskList;
