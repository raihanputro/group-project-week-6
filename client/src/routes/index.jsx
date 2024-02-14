import MainLayout from '@layouts/MainLayout';
import AdminLayout from '@layouts/AdminLayout';

import Home from '@pages/Home';
import DashboardAdmin from '@pages/Admin/Dashboard';
import UserList from '@pages/Admin/UserList';
import TaskList from '@pages/Admin/TaskList';
import NotFound from '@pages/NotFound';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/admin',
    name: 'Dashboard Admin',
    protected: false,
    component: DashboardAdmin,
    layout: AdminLayout
  },
  {
    path: '/admin/user',
    name: 'User List',
    protected: false,
    component: UserList,
    layout: AdminLayout
  },
  {
    path: '/admin/task',
    name: 'Task List',
    protected: false,
    component: TaskList,
    layout: AdminLayout
  },
  { 
    path: '*', 
    name: 'Not Found', 
    component: NotFound, 
    layout: MainLayout, 
    protected: false 
  },
];

export default routes;
