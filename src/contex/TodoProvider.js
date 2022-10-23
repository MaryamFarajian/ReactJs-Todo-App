import axios from "axios";
import { useCallback, useReducer } from "react";
import Swal from "sweetalert2";
import TodoContext from "./TodoContext";
import todoReducer from "./todoReducer";

const TodoProvider = ({ children }) => {
    const initialState = {
        todos: [],
        error: null
    };


    const [state,dispatch]=useReducer(todoReducer,initialState);
    const getTodos =useCallback( async () => {
        try {
          const res = await axios.get("http://localhost:8000/todos");
          dispatch({ type: "SET_TODOS", payload: res.data });
          dispatch({ type: "SET_ERROR", payload: null });
        } catch (err) {
            dispatch({ type: "SET_ERROR", payload: err.message });
            dispatch({ type: "SET_TODOS", payload: [] });
        }
      },[]);
      const filterTodos= async (count) => {
        try {
          const res = await axios.get(`http://localhost:8000/todos?_limit=${count}`);
          dispatch({ type: "FILTER_TODOS", payload: res.data });
          dispatch({ type: "SET_ERROR", payload: null });
        } catch (err) {
            dispatch({ type: "SET_ERROR", payload: err.message });
            dispatch({ type: "FILTER_TODOS", payload: [] });
        }
    }
    const addTodo= async (title) => {
      try {
        const res = await axios.post("http://localhost:8000/todos",{
          title:title,
          completed:false
        });
         dispatch({ type: "ADD_TODO", payload: res.data });
        dispatch({ type: "SET_ERROR", payload: null });
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Task added',
          showConfirmButton: false,
          timer: 3000,
          toast:true,
          timerProgressBar:true
        })
      } catch (err) {
          dispatch({ type: "SET_ERROR", payload: err.message });
          dispatch({ type: "FILTER_TODOS", payload: [] });
      }
  }
    const updateTodo= async (todo) => {
      try {
        const res = await axios.put(`http://localhost:8000/todos/${todo.id}`,{
          title:todo.title,
          completed:!todo.completed
        });

        dispatch({ type: "UPDATE_TODO", payload: res.data });
        dispatch({ type: "SET_ERROR", payload: null });
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Task updated',
          showConfirmButton: false,
          timer: 3000,
          toast:true,
          timerProgressBar:true
        })
      } catch (err) {
          dispatch({ type: "SET_ERROR", payload: err.message });
          dispatch({ type: "FILTER_TODOS", payload: [] });
      }
  }
    const removeTodo= async (todoId) => {
      try {
         await axios.delete(`http://localhost:8000/todos/${todoId}`);
        console.log("Delete")
        dispatch({ type: "REMOVE_TODO", payload: todoId });
        dispatch({ type: "SET_ERROR", payload: null });
        Swal.fire({
          position: 'top',
          icon: 'warning',
          title: 'Task deleted',
          showConfirmButton: false,
          timer: 3000,
          toast:true,
          timerProgressBar:true
        })
      } catch (err) {
          dispatch({ type: "SET_ERROR", payload: err.message });
          dispatch({ type: "FILTER_TODOS", payload: [] });
      }
  }
      
    return(
    <TodoContext.Provider value={{...state,getTodos,filterTodos,addTodo,updateTodo,removeTodo}}>
        {children}
    </TodoContext.Provider>
)}
export default TodoProvider;