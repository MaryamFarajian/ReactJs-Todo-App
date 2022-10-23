import { useContext, useEffect, useState } from "react";
import CreateTodo from "../components/todos/Create";
import DeleteTodo from "../components/todos/Delete";
import FilterTodos from "../components/todos/Filter";
import UpdateTodo from "../components/todos/Update";
import TodoContext from "../contex/TodoContext";

const Todos = () => {
  const { getTodos, todos, error } = useContext(TodoContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/todos")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     todoContext.dispatch({ type:'SET_TODOS', payload: data });
    //axios
    // axios.get("https://jsonplaceholder.bbtypicode.com/todos")
    // .then(res=>console.log(res.data))
    // .catch(err=>console.log(err.message))
    //async&await

    // be ja paeeni az inm mishe
    // const fetchData = async () => {
    //     await getTodos();
    //     setLoading(false);
    // }
    // fetchData()

    (async () => {
      await getTodos();
      setLoading(false);
    })();
  }, [getTodos]);
  return (
    <div className="container mt-5">
      <div className="row g-3">
        <CreateTodo />
        <hr />
        <FilterTodos />
        {error && <div>{error}</div>}
        {loading && (
          <div className="col-md-12 text-center">
            <div className="spinner-border mt-5"></div>
          </div>
        )}
        {todos &&
          todos.map((todo) => (
            <div className="col-md-4" key={todo.id}>
              <div className={"card " + (todo.completed && "bg-light")}>
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    {todo.completed ? (
                      <del> {todo.title}</del>
                    ) : (
                      <span> {todo.title}</span>
                    )}
                  </div>
                  <div className="d-flex align-items-center">
                    <UpdateTodo todo={todo} />
                    <DeleteTodo todoId={todo.id} />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Todos;
