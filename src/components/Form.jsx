import React from 'react'
import { useState } from "react";

const Form = ({ setTask, setTags }) => {
	const [user, setUser] = useState({ priority: 'Low' });

	const handleInput = (event) => {
		const inputName = event.target.name;
		setUser(prev => ({ ...prev, [inputName]: event.target.value }));
	}
	const handleSubmit = (event) => {
		event.preventDefault();
		const task = { ...user, id: Math.floor(Math.random() * 100000000), realizado: false }

		setTask(prevTaskList => {
			localStorage.setItem("localTask", JSON.stringify([...prevTaskList, task]))

			return [...prevTaskList, task]
		});

		setTags(prev => {
			if (!user.tags || [...prev].includes(user.tags)) {
				return prev
			}
			return [...prev, user.tags]
		});
	}

	return (
		<form className='flex p-5 rounded-md w-[900px] items-center justify-between bg-slate-300' onSubmit={handleSubmit}>
			<div className=' flex flex-col items-center justify-center gap-3 w-[700px]'>
				<input className='border border-neutral-400 outline-1 outline-blue-400 hover:border-green-200 w-80 h-10 rounded p-1' type="text" value={user.task || ''} onChange={handleInput} name='task' placeholder='Insert Activity' required />
				<div className='flex items-center justify-center gap-8 w-[700px]'>
					<div className='flex gap-3 items-center justify-between'>
						<label>Priority: </label>
						<select onChange={handleInput} name='priority' className='border border-neutral-400 outline-1 outline-blue-400  w-32 h-10 rounded p-1 hover:border-green-200' placeholder='' required>
							<option value={'Low'}>Low</option>
							<option value={'Medium'}>Medium</option>
							<option value={'Higth'}>Higth</option>
						</select>
					</div>

					<div className='flex items-center gap-3 outline-1 outline-blue-400'>
						<label>Finish date:</label>
						<input type="date" value={user.date || ''} onChange={handleInput} name='date' className='border border-neutral-400 w-32 h-10 rounded p-1 outline-1 outline-blue-400 hover:border-green-200' required />
					</div>

					<div className='flex items-center gap-3 justify-between'>
						<label> Tags:</label>
						<input className='border border-neutral-400 w-32 h-10 rounded p-1 outline-1 outline-blue-400 hover:border-green-200' type="text" value={user.tags || ''} onChange={handleInput} name='tags' placeholder='Tags' required />
					</div>
				</div>
			</div>


			<input className='border border-neutral-400 bg-slate-200 hover:bg-slate-400 duration-1000  w-32 h-10 rounded' type="submit" />

		</form>
	);
}
export default Form;