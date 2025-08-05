import { useAuth } from '../contexts/AuthContext';

export default function AdminPanel() {
  const { logout } = useAuth();

  return (
    <div>
      <h2>Admin Panel</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
