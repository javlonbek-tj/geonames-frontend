import { createBrowserRouter, RouterProvider } from 'react-router';
import PublicLayout from '@/widgets/layout/ui/PublicLayout';

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        lazy: () =>
          import('@/pages/home/ui/HomePage').then((m) => ({
            Component: m.default,
          })),
        handle: { title: 'Bosh sahifa' },
      },
      {
        path: '/discussions',
        lazy: () =>
          import('@/pages/discussions/ui/DiscussionsPage').then((m) => ({
            Component: m.default,
          })),
        handle: { title: 'Muhokamalar' },
      },
      {
        path: '/discussions/:id',
        lazy: () =>
          import('@/pages/discussion/ui/DiscussionPage').then((m) => ({
            Component: m.default,
          })),
        handle: { title: 'Muhokama' },
      },
      {
        path: '/registry',
        lazy: () =>
          import('@/pages/registry/ui/RegistryPage').then((m) => ({
            Component: m.default,
          })),
        handle: { title: 'Reyestr' },
      },
      {
        path: '/registry/:id',
        lazy: () =>
          import('@/pages/geo-object/ui/GeoObjectDetailPage').then((m) => ({
            Component: m.default,
          })),
        handle: { title: 'Geografik obyekt' },
      },
      {
        path: '/guide',
        lazy: () =>
          import('@/pages/guide/ui/GuidePage').then((m) => ({
            Component: m.default,
          })),
        handle: { title: "Qo'llanmalar" },
      },
      {
        path: '/login',
        lazy: () =>
          import('@/pages/telegram-login/ui/TelegramLoginPage').then((m) => ({
            Component: m.default,
          })),
        handle: { title: 'Kirish' },
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
