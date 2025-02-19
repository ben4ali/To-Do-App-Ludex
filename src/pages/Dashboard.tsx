import { TaskList } from '../components/TaskList';
import { TaskSearch } from '../components/TaskSearch';
import '../styles/style-dashboard.css';

interface DashboardProps {
  isSearching: boolean;
  searchTerm: string;
  selectedStatus: string;
}

export const Dashboard = ({ isSearching, searchTerm, selectedStatus }: DashboardProps) => {
  return (
    <div className="dashboard">
      {isSearching ? (
        <TaskSearch searchTerm={searchTerm} />
      ) : (
        selectedStatus === 'All tasks' ? (
          <>
            <TaskList listType="To do" />
            <TaskList listType="In progress" />
            <TaskList listType="Done" />
          </>
        ) : (
          <TaskSearch searchTerm={searchTerm} taskStatus={selectedStatus} />
        )
      )}
    </div>
  );
};