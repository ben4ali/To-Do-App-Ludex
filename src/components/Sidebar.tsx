import { useEffect, useState, useCallback } from 'react';
import { ThemeToggle } from "./ThemeToggle";
import { ToggleSideBar } from "../animations/ToggleSideBar";
import { DisplayLinks, selectLink } from '../animations/ToggleLinks';
import { Link } from 'react-router-dom';
import { Task } from '../utils/localStorage';

interface SidebarProps {
  onStatusChange: (status: string) => void;
  tasks: Task[];
}

export const Sidebar = ({ onStatusChange, tasks }: SidebarProps) => {
  const [taskCounts, setTaskCounts] = useState({
    allTasksCount: tasks.length,
    toDoCount: tasks.filter(task => task.status === 'To do').length,
    inProgressCount: tasks.filter(task => task.status === 'In progress').length,
    doneCount: tasks.filter(task => task.status === 'Done').length,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const taskLists = document.querySelectorAll('.task-list');
      let toDoCount = 0;
      let inProgressCount = 0;
      let doneCount = 0;

      taskLists.forEach(list => {
        const taskType = list.querySelector('h4')?.textContent;
        const taskHolder = list.querySelector('.task-holder');
        const slots = taskHolder?.querySelectorAll('.slot');
        let count = 0;
        slots?.forEach(slot => {
          if (slot.firstElementChild) {
            count++;
          }
        });

        switch (taskType) {
          case 'To do':
            toDoCount = count;
            break;
          case 'In progress':
            inProgressCount = count;
            break;
          case 'Done':
            doneCount = count;
            break;
        }
      });

      //if there are no tasks in the list (then get the count from the state)
      if (taskLists.length === 0) {
        
        toDoCount = tasks.filter(task => task.status === 'To do').length;
        inProgressCount = tasks.filter(task => task.status === 'In progress').length;
        doneCount = tasks.filter(task => task.status === 'Done').length;
      }

      setTaskCounts({
        allTasksCount: toDoCount + inProgressCount + doneCount,
        toDoCount,
        inProgressCount,
        doneCount,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tasks]);

  const handleStatusChange = (status: string, e: any) => {
    onStatusChange(status);
    selectLink(e);
  };

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };


  return (
    <div className="sidebar">
      <div className="sb-header">
        <h1>To-do app</h1>
        <div onClick={() => { 
          setIsOpen((prev) => !prev);
          ToggleSideBar(isOpen);
        }} className="add-task">
          <i className="bi bi-caret-right-fill"></i>
        </div>


      </div>
      <div className="sidebar-content">
        <div className="nav-links">
          <div className="nav-header">
            <h3>Tasks</h3>
            <i id="link-btn" className="bi bi-chevron-down active" onClick={DisplayLinks}></i>
          </div>
          <div id="links">
            <Link to="/" onClick={(e) => handleStatusChange('All tasks', e)} className="selectedLink link">
              All tasks ({taskCounts.allTasksCount})
            </Link>
            <Link to="/" onClick={(e) => handleStatusChange('To do', e)} className="link">
              To do ({taskCounts.toDoCount})
            </Link>
            <Link to="/" onClick={(e) => handleStatusChange('In progress', e)} className="link">
              In progress ({taskCounts.inProgressCount})
            </Link>
            <Link to="/" onClick={(e) => handleStatusChange('Done', e)} className="link">
              Done ({taskCounts.doneCount})
            </Link>
          </div>
        </div>
        <div className="theme-switch">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};