import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react'
import styles from './TaskForm.module.css'
import { ITask } from '../interfaces/Task'

type Props = {
    btnText: string,
    taskList: ITask[],
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>,
    task?: ITask | null,
    handleUpdate?(id: number, title: string, difficulty: number): void
}

const TaskForm = ({btnText, taskList, setTaskList, task, handleUpdate}: Props) => {
  const [id, setId] = useState<number>(0)
  const [title, setTitle] = useState<string>('')
  const [difficulty, setDifficulty] = useState<number>(0)

  useEffect(() => {
    if (task){
      setId(task.id)
      setTitle(task.title)
      setDifficulty(task.difficulty)
    }
  }, [task])

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (handleUpdate) {
      handleUpdate(id, title, difficulty)
    } else {
        const id = Math.floor(Math.random() * 1000)
        const newTask: ITask = {
          id,
          title,
          difficulty
        }

        setTaskList!([...taskList, newTask])
        setTitle('')
        setDifficulty(0)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'title'){
      setTitle(e.target.value)
    } else {
      setDifficulty(parseInt(e.target.value))
    }
  }

  return (
    <form onSubmit={addTaskHandler} className={styles.form}>
        <label className={styles.input_container}>
            <span>Task</span>
            <input type="text" name="title" value={title} onChange={handleChange} placeholder="Task Title" />
        </label>
        <label className={styles.input_container}>
            <span>Difficulty</span>
            <input type="text" name="difficulty" value={difficulty} onChange={handleChange} placeholder="Dificuldade da tarefa" />
        </label>
        <input type="submit" value={btnText} />
    </form>
  )
}

export default TaskForm