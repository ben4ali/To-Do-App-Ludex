import { useEffect, useState } from 'react';
import { TaskList } from '../components/TaskList';
import { TaskSearch } from '../components/TaskSearch';
import '../styles/style-dashboard.css';
import { Task } from '../utils/localStorage';

interface DashboardProps {
  isSearching: boolean;
  searchTerm: string;
  selectedStatus: string;
  onDelete: (taskId: string) => void;
  onUpdate: (updatedTask: Task) => void;
  tasks: Task[];
}

export const Dashboard = ({ isSearching, searchTerm, selectedStatus, onDelete, onUpdate, tasks }: DashboardProps) => {
  return (
    <div className="dashboard">
      {isSearching ? (
        <TaskSearch searchTerm={searchTerm} tasks={tasks} onDelete={onDelete} onUpdate={onUpdate} />
      ) : (
        selectedStatus === 'All tasks' ? (
          <>
            <TaskList listType="To do" tasks={tasks.filter(task => task.status === 'To do')} onDelete={onDelete} onUpdate={onUpdate} />
            <TaskList listType="In progress" tasks={tasks.filter(task => task.status === 'In progress')} onDelete={onDelete} onUpdate={onUpdate} />
            <TaskList listType="Done" tasks={tasks.filter(task => task.status === 'Done')} onDelete={onDelete} onUpdate={onUpdate} />
          </>
        ) : (
          <TaskSearch searchTerm={searchTerm} tasks={tasks.filter(task => task.status === selectedStatus)} onDelete={onDelete} onUpdate={onUpdate} />
        )
      )}
    </div>
  );
};