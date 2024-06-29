import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Applayout from './layouts/app.layout';
import LandingPage from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Redirect from './pages/Redirect';
import Link from './pages/Link';
import UrlProvider from './Context';
import RequireAuth from './components/require.auth';

const router = createBrowserRouter([
  {
    element: <Applayout />,
    children: [
      {
        path: '/dashboard',
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: '/auth',
        element: <Auth />,
      },
      {
        path: '/:id',
        element: <Redirect />,
      },
      {
        path: '/link/:id',
        element: (
          <RequireAuth>
            <Link />
          </RequireAuth>
        ),
      },
      {
        path: '/',
        element: <LandingPage />,
      },
    ],
  },
]);
function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
}

export default App;
