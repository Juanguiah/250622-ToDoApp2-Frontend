import { useState, useEffect } from 'react';

function App() {
  const [tareas, setTareas] = useState([]);
  const [desc, setDesc] = useState('');

  // Cargar tareas al inicio
  useEffect(() => {
    fetch('http://localhost:3000/api/tareas')
      .then(res => res.json())
      .then(setTareas);
  }, []);

  // Agregar tarea nueva
  const agregarTarea = async () => {
    const res = await fetch('http://localhost:3000/api/tareas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descripcion: desc }),
    });
    const nueva = await res.json();
    setTareas([...tareas, nueva]);
    setDesc('');
  };

  // Borrar tarea
  const borrarTarea = async (id) => {
    await fetch(`http://localhost:3000/api/tareas/${id}`, {
      method: 'DELETE'
    });
    setTareas(tareas.filter(t => t.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>✅ Mi Lista de Tareas</h1>
      <input
        value={desc}
        onChange={e => setDesc(e.target.value)}
        placeholder="Escribe una tarea"
      />
      <button onClick={agregarTarea}>Agregar</button>
      <ul>
        {tareas.map(t => (
          <li key={t.id}>
            {t.descripcion}
            <button onClick={() => borrarTarea(t.id)}> ❌ </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
