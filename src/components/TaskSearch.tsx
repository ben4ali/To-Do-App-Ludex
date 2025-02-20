import { useState, useEffect } from 'react';
import { TaskItem } from "./TaskItem";
import { Task } from '../utils/localStorage';

interface TaskSearchProps {
  searchTerm: string;
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onUpdate: (updatedTask: Task) => void;
}

export const TaskSearch = ({ searchTerm, tasks, onDelete, onUpdate }: TaskSearchProps) => {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    setFilteredTasks(tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [searchTerm, tasks]);

  return (
    <div className="task-search">
      {filteredTasks.map((task, index) => (
        <TaskItem
          key={index}
          id={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
          date={task.date}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};