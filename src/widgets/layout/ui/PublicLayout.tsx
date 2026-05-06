import { useEffect } from 'react';
import { Outlet, useLocation, useMatches, useNavigation } from 'react-router';
import Header from './Header';
import Footer from './Footer';

export default function PublicLayout() {
  const location = useLocation();
  const { state: navState } = useNavigation();
  const matches = useMatches();

  useEffect(() => {
    const pageTitle = [...matches]
      .reverse()
      .map((m) => (m.handle as { title?: string })?.title)
      .find(Boolean);
    document.title = pageTitle ? `${pageTitle} | Geonomlar` : 'Geonomlar';
  }, [matches]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafc]">
      <div className="w-full bg-amber-50 border-b border-amber-200 py-1.5 px-4 text-center text-xs text-amber-800">
        Bu platforma rasmiy maqomga ega emas — sinov (beta) rejimida ishlaydi.
        Ma&apos;lumotlar hali to&apos;liq tasdiqlanmagan.
      </div>

      {navState === 'loading' && (
        <div className="fixed top-0 left-0 right-0 z-9999 h-0.5 overflow-hidden bg-blue-100">
          <div
            className="h-full bg-blue-600"
            style={{ animation: 'loading-bar 1s ease-in-out infinite' }}
          />
        </div>
      )}

      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
