export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  date: string;
}

//tasks key from local storage
const TASKS_KEY = 'tasks';

//get tasks from local storage
export const getTasks = (): Task[] => {
  const tasks = localStorage.getItem(TASKS_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

//save tasks to local storage
export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

//add a task to local storage
export const addTask = (task: Task) => {
  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
};

//update a task in local storage
export const updateTask = (updatedTask: Task) => {
  const tasks = getTasks().map((task) =>
    task.id === updatedTask.id ? updatedTask : task
  );
  saveTasks(tasks);
};

//delete a task from local storage
export const deleteTask = (taskId: string) => {
  const tasks = getTasks().filter((task) => task.id !== taskId);
  saveTasks(tasks);
};

//get a task by id
export const getTaskById = (taskId: string): Task | undefined => {
  return getTasks().find((task) => task.id === taskId);
};

//sort tasks by date
export const sortTasksByDate = (
  tasks: Task[],
  order: 'newest' | 'oldest'
): Task[] => {
  return tasks.sort((a, b) => {
    return order === 'newest'
      ? new Date(b.date).getTime() - new Date(a.date).getTime()
      : new Date(a.date).getTime() - new Date(b.date).getTime();
  });
};

//create mock tasks if there are no tasks
export const createMockTasks = () => {
  if (getTasks().length === 0) {
    const mockTasks: Task[] = [];
    for (let i = 1; i <= 10; i++) {
      mockTasks.push({
        id: `mock-task-${i}`,
        title: `Mock Task ${i}`,
        description: `This is the description for mock task ${i}.`,
        status: i % 3 === 0 ? 'Done' : i % 2 === 0 ? 'In progress' : 'To do',
        date: new Date().toISOString(),
      });
    }
    saveTasks(mockTasks);
  }
};
