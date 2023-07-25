import React from 'react';

// Admin Imports
import MainDashboard from 'views/admin/default';
import WhatsappConnection from 'views/admin/whatsapp-connection';
import Services from 'views/admin/services';
import Plans from 'views/admin/plans';
import Messages from 'views/admin/messages';
import Customers from 'views/admin/customers';
import ConfigMessages from 'views/admin/config_messages';

// Auth Imports
import SignIn from 'views/auth/SignIn';

// Icon Imports
import {
  MdAppSettingsAlt,
  MdEditCalendar,
  MdHome,
  MdLiveTv,
  MdLock,
  MdOutlineMessage,
  MdPersonAdd,
  MdQrCode2,
} from 'react-icons/md';

const routes = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: 'default',
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: 'Clientes',
    layout: '/admin',
    path: 'customers',
    icon: <MdPersonAdd className="h-6 w-6" />,
    component: <Customers />,
  },
  {
    name: 'Serviços',
    layout: '/admin',
    path: 'services',
    icon: <MdLiveTv className="h-6 w-6" />,
    component: <Services />,
  },
  {
    name: 'Planos',
    layout: '/admin',
    path: 'plans',
    icon: <MdEditCalendar className="h-6 w-6" />,
    component: <Plans />,
  },
  {
    name: 'Conectar WhatsApp',
    layout: '/admin',
    path: 'whatsapp',
    icon: <MdQrCode2 className="h-6 w-6" />,
    component: <WhatsappConnection />,
  },
  {
    name: 'Config. das mensagens',
    layout: '/admin',
    path: 'config-message-texts',
    icon: <MdAppSettingsAlt className="h-6 w-6" />,
    component: <ConfigMessages />,
  },
  {
    name: 'Mensagens enviadas',
    layout: '/admin',
    path: 'messages',
    icon: <MdOutlineMessage className="h-6 w-6" />,
    component: <Messages />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: 'sign-in',
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
];
export default routes;