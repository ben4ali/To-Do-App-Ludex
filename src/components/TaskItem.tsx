import { useState, useEffect } from 'react';
import { ToggleOptions } from "../animations/ToggleOption";
import { deleteTask, updateTask, Task } from "../utils/localStorage";
import { useNavigate } from 'react-router-dom';
import { Swapy } from 'swapy';

interface TaskItemProps {
    id: string;
    title: string;
    description: string;
    status: string;
    date: string;
    onDelete: (taskId: string) => void;
    onUpdate: (updatedTask: Task) => void;
    swapyInstance: Swapy | null;
}

export const TaskItem = ({ id, title, description, status, date, onDelete, onUpdate, swapyInstance }: TaskItemProps) => {
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
            const targetList = newStatus;
            const taskListsElements = document.querySelectorAll('.task-list');
            taskListsElements.forEach(list => {
                const listHeader = list.firstElementChild?.firstElementChild as HTMLElement;
                if (listHeader.textContent === targetList) {
                    const taskElement = document.querySelector(`[data-id="${id}"]`)?.parentElement;
                    if (taskElement) {
                        console.log(taskElement);
                        taskElement.remove();
                        const taskHolder = list.querySelector('.task-holder');
                        const lastSlot = taskHolder?.querySelector('.slot:last-child');
                        if (lastSlot && lastSlot.children.length === 0) {
                            taskHolder?.insertBefore(taskElement, lastSlot);
                            const slots = document.querySelectorAll('.slot');
                            slots.forEach(slot => {
                            if (!slot.hasChildNodes()) {
                                slot.remove();
                            }
                            });
                        } else {
                            taskHolder?.appendChild(taskElement);
                        }

                        if (swapyInstance) {
                            swapyInstance.update();
                        }else{
                            alert("Swapy instance not found");
                        }
                    }
                }
            });
        }, 650);
    };

    return (
        <div className='slot' data-swapy-slot={"taskItem" + id}>
            <div className="task-item" data-swapy-item={"taskItem" + id} data-id={id}>
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