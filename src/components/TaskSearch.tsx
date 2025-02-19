import { useState, useEffect } from 'react';
import { TaskItem } from "./TaskItem";

interface TaskSearchProps {
    searchTerm: string;
    taskStatus?: string;
}

interface Task {
    title: string;
    description: string;
    status: string;
    date: string;
}

export const TaskSearch = ({ searchTerm, taskStatus }: TaskSearchProps) => {
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

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
    ];

    useEffect(() => {
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
                    title={task.title}
                    description={task.description}
                    status={task.status}
                    date={task.date}
                />
            ))}
        </div>
    );
};