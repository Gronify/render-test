import { Todo, User } from '@/types/types';
import Link from 'next/link';
import '../../globals.css';

async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch('https://dummyjson.com/todos', {
    cache: 'no-store',
  });
  const data = await response.json();
  return data.todos;
}

export default async function TodosPage() {
  const todos: Todo[] = await fetchTodos();

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <Link href="../" className="text-blue-500 hover:underline ">
        Back to List
      </Link>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Todos</h1>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="p-4 mb-4 bg-white rounded-lg shadow-md flex justify-between items-center  hover:shadow-xl hover:scale-105 transition-shadow duration-200">
              <p className="text-xl font-semibold text-blue-600">{todo.todo}</p>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold text-nowrap ${todo.completed ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                  }`}
              >
                {todo.completed ? 'Completed' : 'Not Completed'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}