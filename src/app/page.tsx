'use client';


import { useState, useEffect } from 'react'; // ← 忘れずに追加！
import Image from "next/image";

type Todo = {
  text: string;
  completed: boolean;
};




export default function Home() {

  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (task.trim() === '') return;
    setTodos([...todos, { text: task, completed: false }]);
    setTask('');
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleComplete = (index: number) => {
    const updated = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
<main className="flex flex-col gap-[16px] row-start-2 items-center w-full max-w-md">
  <h1 className="text-2xl font-bold">My Todo App</h1>
  <input
    type="text"
    value={task}
    onChange={(e) => setTask(e.target.value)}
    placeholder="タスクを入力"
    className="border rounded px-3 py-2 w-full"
  />
  <button
    onClick={addTodo}
    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full"
  >
    追加
  </button>
  <ul className="w-full">
    {todos.map((todo, index) => (
      <li key={index} className="flex items-center justify-between py-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(index)}
          />
          <span
            className={todo.completed ? 'line-through text-gray-500' : ''}
          >
            {todo.text}
          </span>
        </label>
        <button
          onClick={() => deleteTodo(index)}
          className="text-red-500 hover:text-red-700"
        >
          削除
        </button>
      </li>
    ))}
  </ul>
</main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
