import { createBrowserRouter, RouterProvider } from 'react-router';
import { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import PublicLayout from '@/components/layout/PublicLayout';

const HomePage = lazy(() => import('@/pages/HomePage'));
const DiscussionsPage = lazy(() => import('@/pages/DiscussionsPage'));
const DiscussionPage = lazy(() => import('@/pages/DiscussionPage'));
const RegistryPage = lazy(() => import('@/pages/RegistryPage'));
const TelegramLoginPage = lazy(() => import('@/pages/TelegramLoginPage'));
const GuidePage = lazy(() => import('@/pages/GuidePage'));
const GeoObjectDetailPage = lazy(() => import('@/pages/GeoObjectDetailPage'));

const fallback = (
  <div className='flex h-screen items-center justify-center'>
    <Spin size='large' />
  </div>
);

const wrap = (Component: React.ComponentType) => (
  <Suspense fallback={fallback}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: wrap(HomePage), handle: { title: 'Bosh sahifa' } },
      { path: '/discussions', element: wrap(DiscussionsPage), handle: { title: 'Muhokamalar' } },
      { path: '/discussions/:id', element: wrap(DiscussionPage), handle: { title: 'Muhokama' } },
      { path: '/registry', element: wrap(RegistryPage), handle: { title: 'Reyestr' } },
      { path: '/registry/:id', element: wrap(GeoObjectDetailPage), handle: { title: 'Geografik obyekt' } },
      { path: '/guide', element: wrap(GuidePage), handle: { title: "Qo'llanmalar" } },
      { path: '/login', element: wrap(TelegramLoginPage), handle: { title: 'Kirish' } },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
