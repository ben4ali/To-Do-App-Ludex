import { selectPage } from "../animations/TogglePageLink";

export const Navbar = () => {
    return (
        <div className='page-navbar'>

            <div className="page-links">
                <a onClick={selectPage} className="selected-page-link" href='#'>
                    <i className="bi bi-columns-gap"></i>
                    Task board
                </a>
                <a onClick={selectPage} href='#'>
                    <i id="add-task-page" className="bi bi-plus"></i>
                    Add task
                </a>
            </div>

            <div className="page-search-options">
                <a href="#">Filter</a>
                <a href="#">Sort</a>
                <div className="search-container">
                    <a id="search"href="#">
                        <i className="bi bi-search"></i>
                    </a>
                    <input type="text" placeholder="Search a task"></input>
                </div>
              
                <a id="new-task" href="#">
                    New Task
                </a>
            </div>

        </div>
    );
};