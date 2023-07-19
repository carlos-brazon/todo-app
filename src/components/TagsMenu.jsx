import { collection, getDocs } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from './js/firebase';

const TagsMenu = ({ strTags, setTask, setTags }) => {

  const handleClick = async () => {
    const arrayFromFirebase = [];
      const docFirebase = await getDocs(collection(db, "users"));
      docFirebase.forEach((doc) => {
        arrayFromFirebase.push(doc.data())
      });
    console.log(arrayFromFirebase);

    const arrayObjTags = [...arrayFromFirebase].filter(tag => tag.tags === strTags);

    if (strTags === 'all') {
      if (arrayFromFirebase.length >= 1) {
        setTask(arrayFromFirebase);
        const ArrayFiltradoTags = arrayFromFirebase.reduce((accumulator, obj) => {
          if (obj.tags) {
            if (!accumulator.includes(obj.tags)) {
              accumulator.push(obj.tags);
            }
          }
          return accumulator;
        }, []);
        setTags(['all', ...ArrayFiltradoTags]);
      }
    }

    else {
      setTask(arrayObjTags);
    }
  }

  return (
    <button onClick={handleClick} className='border bg-slate-100 border-stone-700 p-2 w-auto rounded-lg focus:bg-slate-300'>{'#' + strTags}</button>
  )
}
export default TagsMenu;