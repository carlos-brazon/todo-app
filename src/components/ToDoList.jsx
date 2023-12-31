import React from 'react'
import ToDo from './ToDo'


const ToDoList = ({ task, setTask, setTags }) => {
  const dataFromLocalStore = JSON.parse(localStorage.getItem('localTask')) || [];

  const handleClick = () => setTask(prev => dataFromLocalStore.sort((a, b) => new Date(a.date) - new Date(b.date)));
  const handleClick2 = () => setTask(prev => dataFromLocalStore.sort((a, b) => new Date(b.date) - new Date(a.date)));

  return (
    <div className='flex flex-col gap-3 items-center'>
      <div className='flex gap-5'>
        <button onClick={handleClick} className='border border-neutral-700 w-36 h-10 rounded bg-slate-100 focus:bg-slate-400'>Descending Order</button>
        <button onClick={handleClick2} className='border border-neutral-700 w-36 h-10 rounded bg-slate-100 focus:bg-slate-400'>Ascending Order</button>
      </div>
      <div className='flex gap-4 flex-wrap'>
        {task.map((objTask, i) => <ToDo objTask={objTask} key={i} setTask={setTask} setTags={setTags} />)}
      </div>
    </div>
  )
}
export default ToDoList;