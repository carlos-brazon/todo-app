import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './js/firebase';

const ToDo = ({ objTask: { task, priority, date, tags, id, realizado }, setTask, setTags }) => {
  const arrayFromFirebase = []
  const getArrayFromFirebase = async () => {
    const docFirebase = await getDocs(collection(db, "users"));
    docFirebase.forEach((doc) => {
      arrayFromFirebase.push(doc.data())
    });
  }
  getArrayFromFirebase();

  const handleClick = async () => {
    const arrayObjectFirebase = arrayFromFirebase.filter(objTask => objTask.id !== id);
    const arrayTagsFirebase = arrayObjectFirebase.map(obj => obj.tags);
    const arraySinRepetidosFirebase = [...new Set(arrayTagsFirebase)];
    setTags(['all', ...arraySinRepetidosFirebase]);

    await deleteDoc(doc(db, "users", id));

    setTask(prev => {
      const allTags = prev.map(objetoTask => objetoTask.tags);
      const arraySinRepetidosPrev = [...new Set(allTags)];
      return arraySinRepetidosPrev.length > 1 ? arrayObjectFirebase : arrayObjectFirebase.filter(task => task.tags == arraySinRepetidosPrev[0]);
    });
  }

  const handleDone = async () => {
    const updatedLocalTask = arrayFromFirebase.map(objetoTask => objetoTask.id === id ? ({ ...objetoTask, realizado: !objetoTask.realizado }) : objetoTask);
    const actualizar = doc(db, "users", id);
    await updateDoc(actualizar, {
      realizado: !realizado,
    });

    setTask(prev => {
      const allTags = prev.map(objetoTask => objetoTask.tags);
      const arraySinRepetidos = [...new Set(allTags)];
      return arraySinRepetidos.length > 1 ? updatedLocalTask : updatedLocalTask.filter(task => task.tags == arraySinRepetidos[0]);
    });
  }

  return (
    <div className={`flex flex-col gap-5 justify-between items-center border border-neutral-500 p-4 rounded-md w-[300px] h-56  ${priority == 'Low' ? 'bg-green-400' : priority == 'Medium' ? 'bg-orange-500' : 'bg-red-500'}`}>
      <div className='flex-col gap-2'>
        <p className={`flex font-bold text-2xl ${realizado ? 'italic line-through' : null}`}>{task}</p>
        <p className='flex text-slate-800'> {tags == undefined ? '' : '#' + tags}</p>
        <p className={`${realizado ? 'italic line-through' : null}`}>Priority: {priority}</p>
        <p className={`${realizado ? 'italic line-through' : null}`}>Creation date: {new Date().toISOString().slice(0, 10)}</p>
        <p className={`${realizado ? 'italic line-through' : null}`}>Finish date: {date}</p>
      </div>
      <div className='flex gap-4'>
        <button onClick={handleDone} className={`border border-neutral-700 w-28 h-10 rounded ${priority == 'Low' ? 'hover:bg-green-500' : priority == 'Medium' ? 'hover:bg-orange-600' : 'hover:bg-red-600'} hover:text-white hover:scale-105 hover:border-white duration-500  hover:shadow-gray-700 shadow-md`}>Done</button>
        <button onClick={handleClick} className={`border border-neutral-700 w-28 h-10 rounded ${priority == 'Low' ? 'hover:bg-green-500' : priority == 'Medium' ? 'hover:bg-orange-600' : 'hover:bg-red-600'} hover:text-white hover:scale-105 hover:border-white duration-500  hover:shadow-gray-700 shadow-md`}>Delete</button>
      </div>
    </div>
  )
}
export default ToDo;