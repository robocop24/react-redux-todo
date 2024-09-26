import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todo/todoSlice' 

const Form = () => {

  const [input, setInput] = useState('')
  const dispatch = useDispatch()

  const addTodoHandler = ()=> {
    dispatch(addTodo(input))
    setInput('')
  }

  return (
    <div className='my-5'>
      <h2 className='text-lg font-bold'>Add a Todo</h2>
      <div>
        <input value={input} onChange={(e) => setInput(e.target.value)} className='w-1/2 px-3' type="text" placeholder='Enter Todo'/>
        <button onClick={()=> addTodoHandler()} type='submit' className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-6'>Add</button>
      </div>
    </div>
  )
}

export default Form
