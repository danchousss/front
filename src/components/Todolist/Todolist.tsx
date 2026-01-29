import { useEffect, useState } from "react";
import { todoService, ITodosArray } from "../../services/todos.service";
import Todoitem from "../Todoitem/Todoitem";
import "./Todolist.css";

const Todolist = () => {
    const [todos, setTodos] = useState<ITodosArray[]>([]);
    const [searchQuery, setSearchQuery] = useState(""); // Память для ПОИСКА
    const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "active">("all"); // Память для ФИЛЬТРА

    const loadTodos = async () => {
        const data = await todoService.getAll();
        setTodos(data);
    };

    useEffect(() => { loadTodos(); }, []);

    // --- ЛОГИКА ФИЛЬТРАЦИИ И ПОИСКА ---
    const filteredTodos = todos.filter(item => {
        // 1. Сначала фильтруем по поиску (название)
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        
        // 2. Затем фильтруем по статусу
        if (filterStatus === "completed") return matchesSearch && item.completed;
        if (filterStatus === "active") return matchesSearch && !item.completed;
        return matchesSearch;
    });

    return (
        <div className="todolist container">
            <h1>IT Задания</h1>
            
            <div className="controls">
                {/* ПОИСК */}
                <input 
                    type="text" 
                    placeholder="Поиск по названию..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* ФИЛЬТР ПО СТАТУСУ */}
                <select onChange={(e) => setFilterStatus(e.target.value as any)}>
                    <option value="all">Все задачи</option>
                    <option value="completed">Выполненные</option>
                    <option value="active">В работе</option>
                </select>
            </div>

            <ul className="todolist__list">
                {filteredTodos.map(item => (
                    <Todoitem key={item.id} {...item} />
                ))}
            </ul>
        </div>
    );
};

export default Todolist;