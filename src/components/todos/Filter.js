import { useContext, useState } from "react";
import TodoContext from "../../contex/TodoContext";
const FilterTodos = () => {
    const { filterTodos } = useContext(TodoContext);
            const [loading, setLoading] = useState(false);

    const handleFilter = async (e) => {
        setLoading(true)
        await filterTodos(e.target.value);
        setLoading(false)
    }
return(
   <div className="col-md-12">
    <div className="row">
    <div className="col-md-2">
        <h6>Filter</h6>
        <select onChange={(e) => handleFilter(e)} className="form-select form-select-sm">
            <option value="100">all</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="60">60</option>
            <option value="100">100</option>
        </select>
        {loading && <div className="spinner-border spinner-border-sm"></div>}
    </div>
    </div>
   </div>
)
}
export default FilterTodos;