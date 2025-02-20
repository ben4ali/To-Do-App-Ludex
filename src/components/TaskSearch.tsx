import React from 'react';
import { useState, useEffect } from 'react';
import { TaskItem } from './TaskItem';
import { Task } from '../utils/localStorage';
import { Swapy } from 'swapy';

interface TaskSearchProps {
  searchTerm: string;
  tasks: Task[];
  swapyInstance: Swapy | null;
}

export const TaskSearch = ({
  searchTerm,
  tasks,
  swapyInstance,
}: TaskSearchProps) => {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  // filter tasks based on search term
  useEffect(() => {
    setFilteredTasks(
      tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    //get all task items and remove the checkbox
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach((item) => {
      const taskFooter = item.querySelector('.task-footer');
      if (taskFooter) {
        const checkHolder = taskFooter.querySelector('.completion-status');
        checkHolder?.remove();
      }
    });
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
          swapyInstance={swapyInstance}
        />
      ))}
    </div>
  );
};
