'use client';

import React, { useState } from 'react';
import { insertData } from '../utils/supabase/client';

export default function Home() {
  const [form, setForm] = useState({ name: '', age: '' });
  const [data, setData] = useState<{ name: string; age: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { data, error } = await insertData('test_table', {
      name: form.name,
      age: Number(form.age),
    });
    if (error) {
      setError(error.message);
    } else {
      setData(prev => [...prev, ...(data ?? [])]);
      setForm({ name: '', age: '' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Supabaseデータ投稿</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="名前"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 bg-white"
          />
          <input
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
            placeholder="年齢"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 bg-white"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            投稿
          </button>
        </form>
        {error && <p className="mt-4 text-center text-red-600 font-medium">エラー: {error}</p>}
        <h2 className="mt-8 text-lg font-semibold text-gray-700">投稿データ</h2>
        <pre className="bg-gray-100 rounded p-4 mt-2 text-sm overflow-x-auto text-gray-800">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
