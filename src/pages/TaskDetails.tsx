import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addTask, updateTask, getTaskById, Task } from '../utils/localStorage';
import '../styles/style-task-details.css';

interface TaskDetailsProps {
    onTaskAdd: (newTask: Task) => void;
    onTaskUpdate?: (updatedTask: Task) => void;
}

export const TaskDetails = ({ onTaskAdd, onTaskUpdate }: TaskDetailsProps) => {

    //useState to store the task name, description, status due date and error message
    const { taskId } = useParams<{ taskId: string }>();
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskStatus, setTaskStatus] = useState('To do');
    const [taskDueDate, setTaskDueDate] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // useEffect to get the task details if the task id is provided
    useEffect(() => {
        if (taskId) {
            const task = getTaskById(taskId);
            if (task) {
                setTaskName(task.title);
                setTaskDescription(task.description);
                setTaskStatus(task.status);
                setTaskDueDate(task.date);
            }
        }
    }, [taskId]);

    //validate the form and add or update the task
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!taskName || !taskDescription || !taskDueDate) {
            setError('Task name, description and due date must not be empty');
            return;
        }
        setError('');

        //create a task object
        const task: Task = {
            id: taskId || Date.now().toString(),
            title: taskName,
            description: taskDescription,
            status: taskStatus,
            date: taskDueDate
        };

        //add or update the task
        if (taskId) {
            updateTask(task);
            if (onTaskUpdate) {
                onTaskUpdate(task);
            }
        } else {
            addTask(task);
            onTaskAdd(task);
        }

        //navigate to the dashboard
        navigate('/');
    };

    return (
        <div className="task-details">
            <div className="task-preview">
                <div className='task-header-info'>
                    <h3>{taskName || 'Task Title'}</h3>
                    <h4>{taskDescription || 'Task Description'}</h4>
                    <div className='task-status-preview'>
                        <i className="bi bi-list-ul"></i>
                        <p>{taskStatus}</p>
                    </div>
                </div>
                <div className='task-dates-preview'>
                    <p>{taskDueDate || '2025-02-18'}</p>
                </div>
            </div>

            <div className='task-form'>
                <h3>{taskId ? 'Edit Task' : 'Create Task'}</h3>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error">{error}</p>}
                    <div className='input-group'>
                        <label htmlFor="input-name">Task name</label>
                        <input
                            type="text"
                            placeholder="Task Name"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                    </div>
                    <div className='input-group'>
                        <label htmlFor="input-description">Task description</label>
                        <input
                            type="text"
                            placeholder="Task Description"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                        />
                    </div>
                    <div className='select-holder'>
                        <div className='input-group'>
                            <label htmlFor="status-select">Status</label>
                            <select
                                name="status"
                                id="status-select"
                                value={taskStatus}
                                onChange={(e) => setTaskStatus(e.target.value)}
                            >
                                <option value="To do">To do</option>
                                <option value="In progress">In progress</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>
                        <div className='input-group'>
                            <label htmlFor="due-date">Due date</label>
                            <input
                                type="date"
                                id="due-date"
                                name="due-date"
                                title="Due date"
                                value={taskDueDate}
                                onChange={(e) => setTaskDueDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type="submit">{taskId ? 'Update Task' : 'Create Task'}</button>
                </form>
            </div>
        </div>
    );
};