import { ThemeToggle } from "./ThemeToggle";
import { ToggleSideBar } from "../animations/ToggleSideBar";
import { DisplayLinks, selectLink } from '../animations/ToggleLinks';
import { Link } from 'react-router-dom';
import { Task } from '../utils/localStorage';

interface SidebarProps {
  onStatusChange: (status: string) => void;
  tasks: Task[];
}

export const Sidebar = ({ onStatusChange, tasks }: SidebarProps) => {

  //keep track of the number of tasks in each status
  const allTasksCount = tasks.length;
  const toDoCount = tasks.filter(task => task.status === 'To do').length;
  const inProgressCount = tasks.filter(task => task.status === 'In progress').length;
  const doneCount = tasks.filter(task => task.status === 'Done').length;

  const handleStatusChange = (status: string, e: any) => {
    onStatusChange(status);
    selectLink(e);
  };

  const toggleSidebar = ToggleSideBar();

  return (
    <div className="sidebar">
            <div className="sb-header">
        <h1>To-do app</h1>
        <div onClick={toggleSidebar} className="add-task">
            <i className="bi bi-caret-right-fill"></i>
        </div>
      </div>
      <div className="sidebar-content">

      <div className="nav-links">
        <div className="nav-header">
          <h3>Tasks</h3>
          <i id="link-btn" className="bi bi-chevron-down active" onClick={DisplayLinks}></i>
        </div>
        <div id="links">
          <Link to="/" onClick={(e) => handleStatusChange('All tasks', e)} className="selectedLink link">
            All tasks ({allTasksCount})
          </Link>
          <Link to="/" onClick={(e) => handleStatusChange('To do', e)} className="link">
            To do ({toDoCount})
          </Link>
          <Link to="/" onClick={(e) => handleStatusChange('In progress', e)} className="link">
            In progress ({inProgressCount})
          </Link>
          <Link to="/" onClick={(e) => handleStatusChange('Done', e)} className="link">
            Done ({doneCount})
          </Link>
        </div>
      </div>
      <div className="theme-switch">
        <ThemeToggle />
      </div>
      </div>
 
    </div>
  );
};