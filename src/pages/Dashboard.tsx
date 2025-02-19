import { TaskList } from '../components/TaskList';
import { TaskSearch } from '../components/TaskSearch';
import '../styles/style-dashboard.css';

interface DashboardProps {
  isSearching: boolean;
  searchTerm: string;
  selectedStatus: string;
  onDelete: (taskId: string) => void;
}

export const Dashboard = ({ isSearching, searchTerm, selectedStatus, onDelete }: DashboardProps) => {
  return (
    <div className="dashboard">
      {isSearching ? (
        <TaskSearch searchTerm={searchTerm} onDelete={onDelete} />
      ) : (
        selectedStatus === 'All tasks' ? (
          <>
            <TaskList listType="To do" onDelete={onDelete} />
            <TaskList listType="In progress" onDelete={onDelete} />
            <TaskList listType="Done" onDelete={onDelete} />
          </>
        ) : (
          <TaskSearch searchTerm={searchTerm} taskStatus={selectedStatus} onDelete={onDelete} />
        )
      )}
    </div>
  );
};