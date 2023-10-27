import React, { useState } from 'react';
import styles from './App.module.css'
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

// interface
import { ITask } from './interfaces/Task';
import Modal from './components/Modal';

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)

  const deleteTask = (id: number) => {
    setTaskList(
      taskList => taskList.filter(task => {
        return task.id !== id
      })
    )
  }

  const toggleModal = (display: boolean) => {
    const modal = document.querySelector('#modal')
    if (display){
      modal?.classList.remove('hide')
    } else {
      modal?.classList.add('hide')
    }
  }

  const editTask = (task: ITask):void => {
    toggleModal(true)
    setTaskToUpdate(task)
  }

  const updateTask = (id: number, title: string, difficulty: number) :void => {
    const updatedTask :ITask = {id, title, difficulty}
    const updatedItems = taskList.map(task => {
      return task.id === updatedTask.id ? updatedTask : task
    })

    setTaskList(updatedItems)
    toggleModal(false)
  }

  return (
    <div className={styles.App}>
      <Modal children={<TaskForm handleUpdate={updateTask} task={taskToUpdate} btnText="Editar tarefa" taskList={taskList} />} />
      <main className={styles.main}>
        <div>
          <h1>Todo List</h1>
          <span>Made by Gabriel Lima using React and TypeScript</span>
        </div>
        <div>
          <h2>Tasks:</h2>
          <TaskList taskList={taskList} handleEdit={editTask} handleDelete={deleteTask} />
        </div>
        <div>
          <h2>New Task:</h2>
          <TaskForm btnText="Add task" taskList={taskList} setTaskList={setTaskList} />
        </div>
      </main>
    </div>
  );
}

export default App;
