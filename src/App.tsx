import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState<any[]>([])
  // 1. Память для поиска и фильтра
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all') // может быть 'all', 'completed', 'active'

  const getInfo = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      setData(response.data)
    } catch (err) {
      console.log("Ошибка!", err)
    }
  }

  useEffect(() => {
    getInfo()
  }, [])

  // 2. ЛОГИКА ФИЛЬТРАЦИИ: Создаем новый массив на основе того, что ввел юзер
  const filteredData = data.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase())
    
    if (filter === 'completed') return matchesSearch && item.completed
    if (filter === 'active') return matchesSearch && !item.completed
    return matchesSearch
  })

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>IT-Задания (Поиск и Фильтр)</h1>

      {/* ПОЛЕ ПОИСКА */}
      <input 
        type="text" 
        placeholder="Поиск по названию..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)} // Записываем каждую букву в память
        style={{ padding: '8px', marginRight: '10px', width: '250px' }}
      />

      {/* ВЫБОР СТАТУСА */}
      <select onChange={(e) => setFilter(e.target.value)} style={{ padding: '8px' }}>
        <option value="all">Все задачи</option>
        <option value="completed">Выполненные ✅</option>
        <option value="active">В работе ⏳</option>
      </select>

      <hr />

      <ul>
        {/* Рисуем уже ОФИЛЬТРОВАННЫЙ список */}
        {filteredData.map((item) => (
          <li key={item.id} style={{ marginBottom: '10px' }}>
            <strong>{item.completed ? '✅' : '⏳'}</strong> {item.title}
          </li>
        ))}
      </ul>
      
      {filteredData.length === 0 && <p>Ничего не найдено...</p>}
    </div>
  )
}

export default App