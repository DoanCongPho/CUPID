// app/(protected)/todos/page.tsx

// ######################################################################
// # TEMPORARY FILE FOR LOGIC TESTING - THINH WILL REPLACE WITH REAL UI #
// ######################################################################
"use client";

import { useTodos } from "@/hooks/useTodos";

export default function TodosPagePlaceholder() {
  const { todos, isLoading, createTodo, isCreating, deleteTodo } = useTodos();

  const handleAdd = () => {
    createTodo({ title: `Công việc mới lúc ${new Date().toLocaleTimeString()}` });
  };

  if (isLoading) return <div>Loading To-dos...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>This is a temporary To-do page</h1>
      <button onClick={handleAdd} disabled={isCreating} style={{ padding: '10px', background: 'green', color: 'white' }}>
        {isCreating ? 'Adding...' : 'Add New To-do'}
      </button>

      <h2>Data from API:</h2>
      <pre style={{ background: '#eee', padding: '1rem', marginTop: '1rem' }}>
        {JSON.stringify(todos, null, 2)}
      </pre>

      <h2>Actions:</h2>
      <ul>
        {todos?.map(todo => (
          <li key={todo.id} style={{ marginBottom: '10px' }}>
            {todo.title}
            <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: '20px', background: 'red', color: 'white' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}