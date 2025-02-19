import { Link } from 'react-router-dom';
import { TaskItem } from './TaskItem';
import { getTasks } from '../utils/localStorage';

interface TaskListProps {
  listType: string;
  onDelete: (taskId: string) => void;
}

export const TaskList = ({ listType, onDelete }: TaskListProps) => {
  const tasks = getTasks();
  const filteredTasks = listType === 'All tasks' ? tasks : tasks.filter(task => task.status === listType);

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h4>{listType}</h4>
        <Link to="/task-details" className='add-option-list'>
          <div className="list-task-add">
            <i className="bi bi-plus"></i>
          </div>
          <p>Add Task</p>
        </Link>
      </div>

      <div className='task-holder'>
        {filteredTasks.map((task, index) => (
          <TaskItem
            key={index}
            id={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
            date={task.date}
            onDelete={onDelete}
          />
        ))}
        <div className='drag-task-item'>
          <p>Drag your task here...</p>
        </div>
      </div>
    </div>
  );
};