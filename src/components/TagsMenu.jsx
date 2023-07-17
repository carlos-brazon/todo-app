import React, { useState } from 'react'

const TagsMenu = ({ strTags, task, setTask, setTags }) => {

  const handleClick = () => {
    const dataFromLocalStore = JSON.parse(localStorage.getItem('localTask')) || [];
    const arrayObjTags = [...dataFromLocalStore].filter(tag => tag.tags === strTags);

    if (strTags === 'all') {
      if (dataFromLocalStore.length >= 1) {
        setTask(dataFromLocalStore);
        const ArrayFiltradoTags = dataFromLocalStore.reduce((accumulator, obj) => {
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