import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContentHeader } from './components/ContentHeader';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { TaskDetails } from './pages/TaskDetails';
import { useState, useEffect } from 'react';
import { getTasks, Task, deleteTask } from './utils/localStorage';

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All tasks');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleSearchChange = (term: string) => {
    if (term.trim() === '') {
      setIsSearching(false);
      setSearchTerm('');
    } else {
      setSearchTerm(term);
      setIsSearching(true);
    }
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  const handleTaskDelete = (taskId: string) => {
    deleteTask(taskId);
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleTaskAdd = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  return (
    <Router>
      <div className="App">
        <Sidebar onStatusChange={handleStatusChange} tasks={tasks} />
        <div className='content-holder'>
          <ContentHeader />
          <Navbar onSearchChange={handleSearchChange} />
          <div className='pages'>
            <Routes>
              <Route path="/" element={<Dashboard isSearching={isSearching} searchTerm={searchTerm} selectedStatus={selectedStatus} onDelete={handleTaskDelete} onUpdate={handleTaskUpdate} tasks={tasks} />} />
              <Route path="/task-details" element={<TaskDetails onTaskAdd={handleTaskAdd} />} />
              <Route path="/task-details/:taskId" element={<TaskDetails onTaskAdd={handleTaskAdd} onTaskUpdate={handleTaskUpdate} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;