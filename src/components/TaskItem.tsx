import { ToggleOptions } from "../animations/ToggleOption";
import { deleteTask } from "../utils/localStorage";
import { useNavigate } from 'react-router-dom';

interface TaskItemProps {
    id: string;
    title: string;
    description: string;
    status: string;
    date: string;
    onDelete: (taskId: string) => void;
}

export const TaskItem = ({ id, title, description, status, date, onDelete }: TaskItemProps) => {
    const navigate = useNavigate();

    const handleDelete = () => {
        deleteTask(id);
        onDelete(id);
    };

    const handleEdit = () => {
        navigate(`/task-details/${id}`);
    };

    return (
        <div className="task-item" data-id={id}>
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
                   
                </div>
            </div>
        </div>
    );
};