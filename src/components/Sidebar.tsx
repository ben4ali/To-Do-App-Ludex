import { ThemeToggle } from "./ThemeToggle";
import { DisplayLinks, selectLink } from '../animations/ToggleLinks';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
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
                    <Link to="/" onClick={selectLink} className="selectedLink link">All tasks</Link>
                    <Link to="/" onClick={selectLink} className="link">To do</Link>
                    <Link to="/" onClick={selectLink} className="link">In progress</Link>
                    <Link to="/" onClick={selectLink} className="link">Done</Link>
                </div>
            </div>
            <div className="theme-switch">
                <ThemeToggle />
            </div>
        </div>
    );
};
