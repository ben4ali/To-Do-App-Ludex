import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContentHeader } from './components/ContentHeader';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { TaskDetails } from './pages/TaskDetails';
import { useState } from 'react';

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All tasks');

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

  return (
    <Router>
      <div className="App">
        <Sidebar onStatusChange={handleStatusChange} />
        <div className='content-holder'>
          <ContentHeader />
          <Navbar onSearchChange={handleSearchChange} />
          <div className='pages'>
            <Routes>
              <Route path="/" element={<Dashboard isSearching={isSearching} searchTerm={searchTerm} selectedStatus={selectedStatus} />} />
              <Route path="/task-details" element={<TaskDetails />} />
              <Route path="/task-details/:taskId" element={<TaskDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;