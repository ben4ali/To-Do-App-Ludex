export interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    date: string;
}

const TASKS_KEY = 'tasks';

export const getTasks = (): Task[] => {
    const tasks = localStorage.getItem(TASKS_KEY);
    return tasks ? JSON.parse(tasks) : [];
};

export const saveTasks = (tasks: Task[]) => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const addTask = (task: Task) => {
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
};

export const updateTask = (updatedTask: Task) => {
    const tasks = getTasks().map(task => task.id === updatedTask.id ? updatedTask : task);
    saveTasks(tasks);
};

export const deleteTask = (taskId: string) => {
    const tasks = getTasks().filter(task => task.id !== taskId);
    saveTasks(tasks);
};

export const getTaskById = (taskId: string): Task | undefined => {
    return getTasks().find(task => task.id === taskId);
};