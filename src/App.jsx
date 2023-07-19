import { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import ToDoList from './components/ToDoList';
import TagsMenu from './components/TagsMenu';
import imgToDo from "./assets/fondo.jpg";


function App() {
  const [task, setTask] = useState([]);
  const [tags, setTags] = useState(['all']);
  const [showBackground, setShowBackground] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBackground(false);
    }, 3000);
  }, []);

  const containerClassName = showBackground ? null : 'flex flex-col gap-10 p-4 items-center justify-start bg-cover from-transparent bg-repeat-x min-h-screen';

  return (
    <div className={containerClassName} style={{ backgroundImage: `url(${imgToDo})` }}>
      {showBackground ? (
        <div className='flex flex-col items-center  gap-5 p-10 bg-gradient-to-br from-orange-700 via-orange-500 to-orange-400 w-screen h-screen' >
          <div className='flex flex-col justify-between h-96'>
            <h1 className='text-6xl text-white'>!Welcome...!</h1>
            <div className='flex flex-col items-center justify-center gap-5'>
              <p className='text-6xl text-white'>ToDO App</p>
              <div className="lds-circle"><div></div></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Form setTask={setTask} setTags={setTags} task={task} />
          <div className='flex items-start gap-4 w-auto'>
            {tags.map((strTags, i) => <TagsMenu strTags={strTags} key={i} setTask={setTask} task={task} setTags={setTags} tags={tags} />)}
          </div>
          <ToDoList task={task} setTask={setTask} setTags={setTags} />
        </>
      )}
    </div>
  );
}
export default App;