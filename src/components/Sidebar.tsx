import { ThemeToggle } from "./ThemeToggle";
import { DisplayLinks, selectLink } from '../animations/ToggleLinks';
import { Link } from 'react-router-dom';

interface SidebarProps {
  onStatusChange: (status: string) => void;
}

export const Sidebar = ({ onStatusChange }: SidebarProps) => {
  const handleStatusChange = (status: string, e: any) => {
    onStatusChange(status);
    selectLink(e);
  };

  return (
    <div className="sidebar">
      <div className="sb-header">
        <h1>To-do app</h1>
        <Link to="/task-details" className="add-task">
          <i className="bi bi-plus"></i>
        </Link>
      </div>
      <div className="nav-links">
        <div className="nav-header">
          <h3>Tasks</h3>
          <i id="link-btn" className="bi bi-chevron-down active" onClick={DisplayLinks}></i>
        </div>
        <div id="links">
          <Link to="/" onClick={(e) => handleStatusChange('All tasks', e)} className="selectedLink link">All tasks</Link>
          <Link to="/" onClick={(e) => handleStatusChange('To do', e)} className="link">To do</Link>
          <Link to="/" onClick={(e) => handleStatusChange('In progress', e)} className="link">In progress</Link>
          <Link to="/" onClick={(e) => handleStatusChange('Done', e)} className="link">Done</Link>
        </div>
      </div>
      <div className="theme-switch">
        <ThemeToggle />
      </div>
    </div>
  );
};