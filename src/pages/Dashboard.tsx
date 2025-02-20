import { useEffect, useState } from 'react';
import { TaskList } from '../components/TaskList';
import { TaskSearch } from '../components/TaskSearch';
import '../styles/style-dashboard.css';
import { Task, updateTask } from '../utils/localStorage';
import { createSwapy, Swapy } from 'swapy';

interface DashboardProps {
  isSearching: boolean;
  searchTerm: string;
  selectedStatus: string;
  onDelete: (taskId: string) => void;
  onUpdate: (updatedTask: Task) => void;
  tasks: Task[];
}

export const Dashboard = ({
  isSearching,
  searchTerm,
  selectedStatus,
  onDelete,
  onUpdate,
  tasks,
}: DashboardProps) => {
  const [swapyInstance, setSwapyInstance] = useState<Swapy | null>(null);
  let draggingItem = '';
  let fromSlot = '';

  const initializeSwapy = () => {
    const container = document.querySelector('.dashboard');
    if (container) {
      //initialize swapy
      const swapy = createSwapy(container as HTMLElement, {
        animation: 'dynamic',
        enabled: true,
        swapMode: 'hover',
        autoScrollOnDrag: true,
      });

      swapy.onSwapStart((event) => {
        //store dragging item and original slot
        draggingItem = event.draggingItem;
        fromSlot = event.fromSlot;
      });

      swapy.onSwapEnd((event) => {
        // remove empty slots and update slot attributes
        const slots = document.querySelectorAll('.slot');
        slots.forEach((slot) => {
          if (!slot.hasChildNodes()) {
            slot.remove();
          }
          if (slot.getAttribute('data-swapy-slot') === fromSlot) {
            slot.setAttribute(
              'data-swapy-slot',
              `drop-place${slot.parentElement?.querySelector('h4')?.textContent}-${Date.now()}`
            );
            console.log('Changed old slot attribute to new slot attribute');
          }
        });

        // update slot attribute of dragged element
        const itemsElementsList = document.querySelectorAll('.task-item');
        itemsElementsList.forEach((item) => {
          if (item.getAttribute('data-swapy-item') === draggingItem) {
            item.parentElement?.setAttribute(
              'data-swapy-slot',
              `${draggingItem}-${Date.now()}`
            );
            console.log('Changed new slot attribute to dragged element');
          }
          let taskItemElement = item as HTMLElement;

          //update task status
          let task = tasks.find(
            (task) => task.id === taskItemElement.getAttribute('data-id')
          );
          if (task) {
            let listType =
              taskItemElement.parentElement?.parentElement?.parentElement?.querySelector(
                'h4'
              )?.textContent;
            if (listType) {
              task.status = listType;
              updateTask(task);

              //update checkbox
              let taskCheckbox = taskItemElement.querySelector(
                'input[type="checkbox"]'
              ) as HTMLInputElement;
              if (taskCheckbox) {
                taskCheckbox.checked = task.status === 'Done';
              }

              //update task status
              let taskStatus = taskItemElement.querySelector(
                '.task-status p'
              ) as HTMLElement;
              if (taskStatus) {
                taskStatus.textContent = task.status;
              }
            } else {
              console.log('not found');
            }
          }
        });

        // add new slots to task holders
        const taskHolders = document.querySelectorAll('.task-holder');
        taskHolders.forEach((holder) => {
          const slot = document.createElement('div');
          slot.className = 'slot';
          slot.setAttribute(
            'data-swapy-slot',
            `drop-place${holder.parentElement?.querySelector('h4')?.textContent}-${Date.now()}`
          );
          holder.appendChild(slot);
        });

        //update swapy to take into account new or deleted slots
        swapy.update();
      });

      setSwapyInstance(swapy);
    }
  };

  useEffect(() => {
    initializeSwapy();
  }, [tasks, isSearching, selectedStatus]);

  return (
    <div className="dashboard">
      {/* display TaskSearch component depending on the value of isSearching prop */}
      {isSearching ? (
        <TaskSearch
          searchTerm={searchTerm}
          tasks={tasks}
          onDelete={onDelete}
          onUpdate={onUpdate}
          swapyInstance={swapyInstance}
        />
      ) : // display TaskLists if the filter is set to 'All tasks' or TaskSearch component if the filter is set to a specific status
      selectedStatus === 'All tasks' ? (
        <>
          <TaskList
            listType="To do"
            tasks={tasks.filter((task) => task.status === 'To do')}
            onDelete={onDelete}
            onUpdate={onUpdate}
            swapyInstance={swapyInstance}
          />
          <TaskList
            listType="In progress"
            tasks={tasks.filter((task) => task.status === 'In progress')}
            onDelete={onDelete}
            onUpdate={onUpdate}
            swapyInstance={swapyInstance}
          />
          <TaskList
            listType="Done"
            tasks={tasks.filter((task) => task.status === 'Done')}
            onDelete={onDelete}
            onUpdate={onUpdate}
            swapyInstance={swapyInstance}
          />
        </>
      ) : (
        <TaskSearch
          searchTerm={searchTerm}
          tasks={tasks.filter((task) => task.status === selectedStatus)}
          onDelete={onDelete}
          onUpdate={onUpdate}
          swapyInstance={swapyInstance}
        />
      )}
    </div>
  );
};
