import React, { useEffect, useState } from "react";
import "./ToDoList.css";
import axios from 'axios'

const task = 
{
  taskName:' '
}

export default function ToDoList() 
{

  const [tasks,setTasks] = useState([]);
  const [singleTask,setSingleTask] = useState(task)
  const [newTask,setNewTask] = useState('')
  const handleChange = (e)=>
  {
    e.preventDefault();
    setSingleTask(e.target.value)
  }

  useEffect(()=>
  {
    getAllTasks()
  },[])

  const getAllTasks = async()=>
  {
    const {data} = await axios.get('http://localhost:5000/tasks/getAllTasks');
    console.log(data?.tasks)
    setTasks(data.tasks)
  }


  useEffect(()=>
  {
    getAllTasks()
  },[newTask])

  

  const handleSubmit=async(e)=>
  {
    e.preventDefault()
    console.log(singleTask)
    const {data} = await axios.post('http://localhost:5000/tasks/createTask',{singleTask})
    setNewTask(data?.newlyCreatedTask)
    console.log(data)
    getAllTasks()
  }

  console.log(tasks)
  console.log(singleTask)
  return (

    <div className="container">
      <h1>To Do List App</h1>
      <div className="row">
        <form className="form-control">
          <label className="label">Enter The task: </label>
          <input className="inputBox" type="text" placeholder="Get groceries" name="taskName" onChange={handleChange}/>
          <button onClick={(e)=>handleSubmit(e)} className="btn-light">Add Task</button>
        </form>
        <ul>
        {tasks && tasks.map((task,index)=>
        {
          if(task.task==='dummy task')
          {
            return null
          }
          return <li>{task.task}</li> 
        })}
        </ul>
      </div>
    </div>
  );
}