import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from '../components/PrivateRoute';
import AdminPanel from '../pages/AdminPanel';

beforeEach(() => {
  localStorage.clear();
});

test('allows admin users to view admin panel', () => {
  localStorage.setItem('token', 'token');
  localStorage.setItem('role', 'admin');

  render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/dashboard" element={<div>Dashboard Page</div>} />
          <Route element={<PrivateRoute requiredRole="admin" />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );

  expect(screen.getByText(/admin panel/i)).toBeInTheDocument();
});

test('redirects non-admin users to dashboard', () => {
  localStorage.setItem('token', 'token');
  localStorage.setItem('role', 'user');

  render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/dashboard" element={<div>Dashboard Page</div>} />
          <Route element={<PrivateRoute requiredRole="admin" />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );

  expect(screen.getByText(/dashboard page/i)).toBeInTheDocument();
});
