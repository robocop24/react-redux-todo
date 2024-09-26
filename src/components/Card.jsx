import React from 'react'
import Form from './Form'
import TodoList from './TodoList'

const Card = () => {
  return (
    <div className='rounded-xl p-5 bg-violet-100 min-h-[80vh] w-1/2'>
      <h1 className='font-bold text-center text-xl'>iTask - Manage yoor todos at one place</h1>
      <Form/>
      <TodoList/>
    </div>
  )
}

export default Card
