import { useState, useEffect } from 'react';
import { TaskItem } from "./TaskItem";
import { getTasks, Task } from '../utils/localStorage';

interface TaskSearchProps {
    searchTerm: string;
    taskStatus?: string;
}

export const TaskSearch = ({ searchTerm, taskStatus }: TaskSearchProps) => {
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

    useEffect(() => {
        const tasks = getTasks();
        setFilteredTasks(tasks.filter(task =>
            (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (!taskStatus || task.status === taskStatus)
        ));
    }, [searchTerm, taskStatus]);

    return (
        <div className="task-search">
            {filteredTasks.map((task, index) => (
                <TaskItem
                    key={index}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    status={task.status}
                    date={task.date}
                />
            ))}
        </div>
    );
};