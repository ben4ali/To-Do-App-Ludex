import React from 'react';
import { Link } from 'react-router-dom';
import { TaskItem } from './TaskItem';
import { Task } from '../utils/localStorage';
import { Swapy } from 'swapy';

interface TaskListProps {
  listType: string;
  tasks: Task[];
  swapyInstance: Swapy | null;
}

export const TaskList = ({ listType, tasks, swapyInstance }: TaskListProps) => {
  return (
    <div className="task-list">
      <div className="task-list-header">
        <h4>{listType}</h4>
        <Link to="/task-details" className="add-option-list">
          <div className="list-task-add">
            <i className="bi bi-plus"></i>
          </div>
          <p>Add Task</p>
        </Link>
      </div>

      <div className="task-holder">
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            id={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
            date={task.date}
            swapyInstance={swapyInstance}
          />
        ))}
        <div className="slot" data-swapy-slot={'drop-place' + listType}></div>
      </div>
    </div>
  );
};
