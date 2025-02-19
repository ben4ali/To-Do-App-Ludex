import { TaskList } from '../components/TaskList';
import '../styles/style-dashboard.css';

export const Dashboard = () => {
    return (
        <div className="dashboard">
            <TaskList listType="To do" />
            <TaskList listType="In progress" />
            <TaskList listType="Done" />
        </div>
    );
};
