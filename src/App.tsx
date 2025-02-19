import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContentHeader } from './components/ContentHeader';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { TaskDetails } from './pages/TaskDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className='content-holder'>
          <ContentHeader />
          <Navbar />
          <div className='pages'>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/task-details" element={<TaskDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;