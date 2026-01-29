import { FC } from "react";
import { ITodosArray } from "../../services/todos.service";
import { Link } from "react-router-dom";
import "./Todoitem.css";

const Todoitem: FC<ITodosArray> = ({ id, title, completed, description }) => {
    return (
        <li className={`item ${completed ? "done" : ""}`}>
            <Link to={`/to-do-list/${id}`}>
                <p className="item__title">
                    <strong>ID: {id}</strong> | {title}
                </p>
                <span className="status-badge">
                    {completed ? "✅ Готово" : "⏳ В процессе"}
                </span>
            </Link>
        </li>
    );
};

export default Todoitem;