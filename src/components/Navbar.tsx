import { Link, useLocation } from 'react-router-dom';
import { selectPage } from "../animations/TogglePageLink";

export const Navbar = () => {
    const location = useLocation();

    return (
        <div className='page-navbar'>
            <div className="page-links">
                <Link 
                    onClick={selectPage} 
                    className={location.pathname === '/' ? 'selected-page-link' : ''} 
                    to='/'
                >
                    <i className="bi bi-columns-gap"></i>
                    Task board
                </Link>
                <Link 
                    onClick={selectPage} 
                    className={location.pathname === '/task-details' ? 'selected-page-link' : ''} 
                    to='/task-details'
                >
                    <i id="add-task-page" className="bi bi-plus"></i>
                    Add task
                </Link>
            </div>
            <div className="page-search-options">
                <a href="#">Filter</a>
                <a href="#">Sort</a>
                <div className="search-container">
                    <span id="search">
                        <i className="bi bi-search"></i>
                    </span>
                    <input type="text" placeholder="Search a task"></input>
                </div>
                <Link id="new-task" to='/task-details'>
                    New Task
                </Link>
            </div>
        </div>
    );
};