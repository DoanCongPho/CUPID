"use client";

import { useQuery } from "@tanstack/react-query";

async function getUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

export default function UserList() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold">The list of users (from API REST)</h2>
      <ul>
        {data?.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}