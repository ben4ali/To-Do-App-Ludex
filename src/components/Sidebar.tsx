import { ThemeToggle } from "./ThemeToggle";
import { DisplayLinks, selectLink } from '../animations/ToggleLinks';

export const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sb-header">
                <h1>To-do app</h1>
                <div className="add-task">
                    <i className="bi bi-plus"></i>
                </div>
            </div>
            <div className="nav-links">
                <div className="nav-header">
                    <h3>Tasks</h3>
                    <i id="link-btn" className="bi bi-chevron-down active" onClick={DisplayLinks}></i>
                </div>
                <ul id="links">
                    <li onClick={selectLink} className="selectedLink">All tasks</li>
                    <li onClick={selectLink} >To do</li>
                    <li onClick={selectLink} >In progress</li>
                    <li onClick={selectLink} >Done</li>
                </ul>
            </div>
            <div className="theme-switch">
                <ThemeToggle />
            </div>
        </div>
    );
};
