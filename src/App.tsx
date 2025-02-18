import './App.css';
import { ContentHeader } from './components/ContentHeader';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';


function App() {
  return (
    <div className="App">

      <Sidebar />

      <div className='content-holder'>

        <ContentHeader />
        <Navbar />

        <div className='pages'>
          <Dashboard />
        </div>
       
      </div>

    </div>
  );
}

export default App;
