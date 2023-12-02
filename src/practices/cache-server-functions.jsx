// This is for "Server components"
import { cache } from 'react';

('use server');

// Only one request is made, the data returned is cached and shared across components
const getUsers = cache(async () => {
  return await fetchUsers();
});

async function ChatRoom() {
  const users = await getUsers();
}

async function UsersCRUD() {
  const users = await getUsers();
}
