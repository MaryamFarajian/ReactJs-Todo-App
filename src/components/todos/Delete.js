import { useContext, useState } from "react";
import todoContext from "../../contex/TodoContext";

const DeleteTodo =({todoId})=>{
    const [loading, setLoading] = useState(false);
    const {removeTodo}=useContext(todoContext);
    const handleDelete =async()=>{
        setLoading(true)
        await removeTodo(todoId)
    }
    return(
        <>
        <i onClick={()=>handleDelete()} className="bi bi-trash-fill fs-6"></i>
        {loading && <div className="spinner-border spinner-border-sm"></div>}
        </>
    )
}
export default DeleteTodo;