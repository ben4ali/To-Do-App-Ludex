import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style-task-details.css';

export const TaskDetails = () => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskStatus, setTaskStatus] = useState('To do');
    const [taskDueDate, setTaskDueDate] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!taskName || !taskDescription) {
            setError('Task name and description must not be empty');
            return;
        }
        setError('');
        navigate('/');
    };

    return (
        <div className="task-details">
            <div className="task-preview">
                <div className='task-header-info'>
                    <h3>{taskName || 'Task Title'}</h3>
                    <h4>{taskDescription || 'Task Description'}</h4>
                    <div className='task-status'>
                        <i className="bi bi-list-ul"></i>
                        <p>{taskStatus}</p>
                    </div>
                </div>
                <div className='task-dates'>
                    <p>{taskDueDate || '2025-02-18'}</p>
                </div>
            </div>

            <div className='task-form'>
                <h3>Task creation</h3>
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
                    <button type="submit">Create new task</button>
                </form>
            </div>
        </div>
    );
};