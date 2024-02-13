import MainLayout from '@layouts/MainLayout';

import Home from '@pages/Home';
import Profile from '@pages/Profile';
import NotFound from '@pages/NotFound';
import Login from '@pages/Login';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/profile',
    name: 'Profile',
    protected: false,
    component: Profile,
    layout: MainLayout,
  },
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: Login,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
