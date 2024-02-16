import MainLayout from '@layouts/MainLayout';
import AdminLayout from '@layouts/AdminLayout';

import Home from '@pages/Home';
import Profile from '@pages/Profile';
import NotFound from '@pages/NotFound';
import Login from '@pages/Login';
import Register from '@pages/Register';
import DashboardAdmin from '@pages/Admin/Dashboard';
import UserList from '@pages/Admin/UserList';
import TaskList from '@pages/Admin/TaskList';
import HomeMember from '@pages/Member/Home';
import Detail from '@pages/Member/Detail';

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
    protected: true,
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
  {
    path: '/register',
    name: 'Register',
    protected: false,
    component: Register,
    layout: MainLayout,
  },
  {
    path: '/admin',
    name: 'Dashboard Admin',
    protected: true,
    component: DashboardAdmin,
    layout: AdminLayout,
    isAdmin: true
  },
  {
    path: '/admin/user',
    name: 'User List',
    protected: true,
    component: UserList,
    layout: AdminLayout,
    isAdmin: true
  },
  {
    path: '/admin/task',
    name: 'Task List',
    protected: true,
    component: TaskList,
    layout: AdminLayout,
    isAdmin: true
  },
  {
    path: '/member/',
    name: 'Home Member',
    protected: true,
    component: HomeMember,
    layout: MainLayout,
    isMember: true
  },
  {
    path: '/member/task/:id',
    name: 'Detail Member',
    protected: false,
    component: Detail,
    layout: MainLayout,
    isMember: true
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