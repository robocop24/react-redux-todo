import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    todos: [],
    isError: null
}

export const fetchTodos = createAsyncThunk('fetchTodos', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data = await response.json()
    return data.slice(0,10)
});

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers : { 
        addTodo: (state, action)=> {
            const todo = {
                userId:1,
                id:nanoid(), 
                title: action.payload,
                completed: false
            }
            state.todos.splice(0,0,todo)
        },
        removeTodo: (state, action)=> {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },
        updateTodo: (state, action) => {
            let todo = state.todos.find(todo => todo.id === action.payload.id)
            todo.title = action.payload.title
        },
        todoStatus: (state, action) => {
            let todo = state.todos.find(todo => todo.id === action.payload)
            todo.completed = !todo.completed
        },
        setTodos: (state, action) => {
            state.todos = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.isLoading = false
            state.todos = action.payload
        })
        builder.addCase(fetchTodos.rejected, (state,action) => {
            state.isLoading = false
            state.isError = action.error.message
        })
    }
})

// these action use in our components
export const {addTodo, removeTodo, updateTodo, todoStatus, setTodos} = todoSlice.actions

// export all reducer to store
export default todoSlice.reducer