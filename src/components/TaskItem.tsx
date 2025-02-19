import { ToggleOptions } from "../animations/ToggleOption";

interface TaskItemProps {
    title: string;
    description: string;
    status: string;
    date: string;
}

export const TaskItem = ({ title, description, status, date }: TaskItemProps) => {
    return (
        <div className="task-item">
            <div className="task-header">
                <div className="task-info">
                    <h6>{title}</h6>
                    <p>{description}</p>
                </div>
                <div className="task-options">
                    <div onClick={ToggleOptions} className="option-btn">
                        <i className="bi bi-three-dots"></i>
                        <div  className="dialogOption">
                            <span>Delete</span>
                            <span>Edit</span>
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