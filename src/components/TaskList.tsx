import { Link } from 'react-router-dom';
interface TaskListProps {
    listType: string;
}


export const TaskList = (props: TaskListProps)  => {
    return (
        <div className="task-list">
            <div className="task-list-header">
                <h4>{props.listType}</h4>
                <Link to="/task-details" className='add-option-list'>
                    <div  className="list-task-add">
                        <i className="bi bi-plus"></i>
                        
                    </div>
                    <p>Add Task</p>
                </Link>

            </div>

            <div className='task-holder'>
            </div> 
        </div>
    );
};
