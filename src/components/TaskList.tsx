import { Link } from 'react-router-dom';
import { TaskItem } from './TaskItem';

interface TaskListProps {
    listType: string;
}



export const TaskList = (props: TaskListProps) => {
    const tasks = [
    {
        title: 'Task 1',
        description: 'This is a task description',
        status: 'To do',
        date: '2025-02-18'
    },
    {
        title: 'Task 2',
        description: 'This is a task description',
        status: 'In progress',
        date: '2025-02-18'
    },
    {
        title: 'Task 3',
        description: 'This is a task description',
        status: 'Done',
        date: '2025-02-18'
    },
    {
        title: 'Task 4',
        description: 'This is a task description',
        status: 'To do',
        date: '2025-02-18'
    },
    {
        title: 'Task 5',
        description: 'This is a task description',
        status: 'To do',
        date: '2025-02-18'
    }
    ]
    return (
        <div className="task-list">
            <div className="task-list-header">
                <h4>{props.listType}</h4>
                <Link to="/task-details" className='add-option-list'>
                    <div className="list-task-add">
                        <i className="bi bi-plus"></i>
                    </div>
                    <p>Add Task</p>
                </Link>
            </div>

            <div className='task-holder'>
                {tasks.map((task, index) => (
                    <TaskItem
                        key={index}
                        title={task.title}
                        description={task.description}
                        status={task.status}
                        date={task.date}
                    />
                ))}
                <div className='drag-task-item'>
                    <p>Drag your task here...</p>
                </div>
            </div>
        </div>
    );
};