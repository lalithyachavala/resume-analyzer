import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from '../components/PrivateRoute';
import Dashboard from '../pages/Dashboard';

beforeEach(() => {
  localStorage.clear();
});

test('redirects unauthenticated users to login', () => {
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route element={<PrivateRoute />}> 
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );

  expect(screen.getByText(/login page/i)).toBeInTheDocument();
});

test('shows dashboard for authenticated users', () => {
  localStorage.setItem('token', 'token');
  localStorage.setItem('role', 'user');

  render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route element={<PrivateRoute />}> 
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );

  expect(screen.getByText(/welcome, user/i)).toBeInTheDocument();
});
