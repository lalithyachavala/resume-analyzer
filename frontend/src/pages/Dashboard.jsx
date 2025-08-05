import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user?.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
