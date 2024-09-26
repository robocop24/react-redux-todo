import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo, updateTodo, todoStatus, fetchTodos, setTodos } from '../features/todo/todoSlice'
import useLocalStorage from '../features/useLocalStorage'

const TodoList = () => {

    const dispatch = useDispatch()
    const { isLoading, todos, isErrorMsg } = useSelector(state => state)
    const [ storeTodos, setStoredTodos ] = useLocalStorage('todos', todos)
    const [todoIndex, setTodoIndex] = useState(null)
    const [input, setInput] = useState('')
    const [showFinished, setShowFinished] = useState(false)

    const fetchData = () => {
        if(storeTodos.length===0){
            console.log('fetch from API')
            dispatch(fetchTodos())
        }else{
            console.log('fetch from local')
            setStoredTodos(storeTodos)
            dispatch(setTodos(storeTodos))
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const editTodo = (e) => {
        setInput(e)
    }

    const updateTodoHandler = (e) => {
        dispatch(updateTodo({ id: e.id, title: input }))
        setInput('')
        setTodoIndex(null)
    }

    const showFinishedhandler = () => {
        setShowFinished(!showFinished)
    }


    return (
        <div className='my-3'>
            <input type="checkbox" checked={showFinished} onChange={() => showFinishedhandler()} /> Show Finished
            <h2 className="text-lg font-bold">Your todos</h2>
            <div>
                {isErrorMsg && <h3>{isErrorMsg}</h3>}
                {!isLoading && todos &&
                    todos.map((todo, index) => {
                        return (showFinished || !todo.completed) &&
                            <div key={todo.id}
                                className="todo flex w-1/4 justify-between my-3 w-full">
                                <div className="flex gap-2 w-1/2">
                                    <input type="checkbox" checked={todo.completed} id={todo.id} onChange={() => dispatch(todoStatus(todo.id))} />
                                    <div>
                                        {todoIndex === index ? <input value={input} onChange={(e) => editTodo(e.target.value)} type='text' /> : <p className={todo.completed ? "line-through text-wrap" : "text-wrap"}>{todo.title}</p>}
                                    </div>
                                </div>
                                <div className="buttons flex gap-1">
                                    {todoIndex === index && <button onClick={(e) => updateTodoHandler(todo)} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'>Save</button>}
                                    {todoIndex == null && <button onClick={() => { setTodoIndex(index); setInput(todo.title) }} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'>Edit</button>}
                                    <button onClick={(e) => dispatch(removeTodo(todo.id))} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'>Delete</button>
                                </div>
                            </div>
                    }
                    )
                }
            </div>
        </div>
    )
}

export default TodoList
