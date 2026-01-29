import axios from "axios";

export interface ITodosArray {
    id: number;
    title: string;
    description: string;
    completed: boolean; // Это и есть наш "Статус"
    createdAt?: string;
    updatedAt?: string;
}

class TodoService {
    private BASEURL = 'https://jsonplaceholder.typicode.com/todos'; // Тестовый URL

    async getAll(): Promise<ITodosArray[]> {
        const response = await axios.get(`${this.BASEURL}?_limit=10`);
        // Мапим данные, чтобы они подходили под твой интерфейс
        return response.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: "Описание IT-задачи",
            completed: item.completed
        }));
    }
}

export const todoService = new TodoService();