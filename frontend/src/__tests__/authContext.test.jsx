import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

function TestComponent() {
  const { user, login, logout } = useAuth();
  return (
    <div>
      <span>{user ? user.role : 'no-user'}</span>
      <button onClick={() => login('token', 'admin')}>login</button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

test('login and logout update auth state and localStorage', () => {
  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

  expect(screen.getByText('no-user')).toBeInTheDocument();
  fireEvent.click(screen.getByText('login'));
  expect(screen.getByText('admin')).toBeInTheDocument();
  expect(localStorage.getItem('token')).toBe('token');
  expect(localStorage.getItem('role')).toBe('admin');

  fireEvent.click(screen.getByText('logout'));
  expect(screen.getByText('no-user')).toBeInTheDocument();
  expect(localStorage.getItem('token')).toBeNull();
  expect(localStorage.getItem('role')).toBeNull();
});
