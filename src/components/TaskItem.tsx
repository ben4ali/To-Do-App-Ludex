import { useState, useEffect } from 'react';
import { ToggleOptions } from "../animations/ToggleOption";
import { deleteTask, updateTask, Task } from "../utils/localStorage";
import { useNavigate } from 'react-router-dom';


interface TaskItemProps {
    id: string;
    title: string;
    description: string;
    status: string;
    date: string;
    onDelete: (taskId: string) => void;
    onUpdate: (updatedTask: Task) => void;
}

export const TaskItem = ({ id, title, description, status, date, onDelete, onUpdate }: TaskItemProps) => {
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(status === "Done");

    useEffect(() => {
        setIsChecked(status === "Done");
    }, [status]);

    const handleDelete = () => {
        deleteTask(id);
        onDelete(id);
    };

    const handleEdit = () => {
        navigate(`/task-details/${id}`);
    };

    const handleStatusChange = () => {

        setIsChecked(!isChecked);
        setTimeout(() => {
            const newStatus = status === "Done" ? "To do" : "Done";
            const updatedTask: Task = { id, title, description, status: newStatus, date };
            updateTask(updatedTask);
            onUpdate(updatedTask);
        }, 650);

        setTimeout(() => {
            if (status === "Done") {
                setIsChecked(true);
            }else{
                setIsChecked(false);
            }
        }, 700);

    };


    return (
        <div className='slot' data-swapy-slot={"taskItem"+id}>
            <div className="task-item" data-swapy-item={"taskItem"+id} data-id={id}>
                <div className="task-header">
                    <div className="task-info">
                        <h6>{title}</h6>
                        <p>{description}</p>
                    </div>
                    <div className="task-options">
                        <div onClick={ToggleOptions} className="option-btn">
                            <i className="bi bi-three-dots"></i>
                            <div className="dialogOption">
                                <span onClick={handleDelete}>Delete</span>
                                <span onClick={handleEdit}>Edit</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="task-status">
                    <i className="bi bi-list-ul"></i>
                    <p>{status}</p>
                </div>
                <div className="task-footer">
                    <div className="task-dates">
                        <p>{date}</p>
                    </div>
                    <div className="completion-status">
                        <label className="ios-checkbox blue">
                            <input
                                type="checkbox"
                                aria-label="Mark task as complete"
                                checked={isChecked}
                                onChange={handleStatusChange}
                            />
                            <div className="checkbox-wrapper">
                                <div className="checkbox-bg"></div>
                                <svg fill="none" viewBox="0 0 24 24" className="checkbox-icon">
                                    <path
                                        stroke-linejoin="round"
                                        stroke-linecap="round"
                                        stroke-width="3"
                                        stroke="currentColor"
                                        d="M4 12L10 18L20 6"
                                        className="check-path"
                                    ></path>
                                </svg>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>

    );
};