import { Link } from 'react-router';
import { NAV_ITEMS } from '../lib/navItems';
import logoSvg from '@/shared/assets/logo.svg';

export default function Footer() {

  return (
    <footer className="bg-[#0f1f3d] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10 text-center sm:text-left">
          <div>
            <div className="mb-4 flex justify-center sm:justify-start">
              <img
                src={logoSvg}
                alt="Geonames"
                className="h-4.5"
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.9 }}
              />
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-55 mx-auto sm:mx-0">
              O&apos;zbekiston Respublikasi geografik obyektlar nomlari davlat
              reyestri.
            </p>
          </div>

          <div>
            <div className="text-white font-bold text-sm mb-4 pb-2.5 border-b-2 border-blue-600 inline-block">
              Havolalar
            </div>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                to={item.key}
                className="block text-white/60 text-sm mb-2.5 hover:text-blue-300 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div>
            <div className="text-white font-bold text-sm mb-4 pb-2.5 border-b-2 border-blue-600 inline-block">
              Hujjatlar
            </div>
            {[
              'Foydalanish qoidalari',
              'Maxfiylik siyosati',
              'Qonuniy asos',
              "Yo'riqnoma",
            ].map((l) => (
              <span
                key={l}
                className="block text-white/60 text-sm mb-2.5 cursor-pointer hover:text-blue-300 transition-colors"
              >
                {l}
              </span>
            ))}
          </div>

          <div>
            <div className="text-white font-bold text-sm mb-4 pb-2.5 border-b-2 border-blue-600 inline-block">
              Bog&apos;lanish
            </div>
            <p className="text-sm text-white/55 leading-[1.8]">
              Toshkent shahar, Chilonzor tumani, Bunyodkor shoh ko&apos;chasi,
              28
              <br />
              <a
                href="tel:+998900048114"
                className="text-white/55 hover:text-blue-300"
              >
                +998 90 004 81 14
              </a>
              <br />
              <a
                href="mailto:tjmr1996@gmail.com"
                className="text-white/55 hover:text-blue-300"
              >
                tjmr1996@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-white/40">
          <span>
            © {new Date().getFullYear()} Geonomlar. Barcha huquqlar
            himoyalangan.
          </span>
          <span>Davlat kadastrlari palatasi</span>
        </div>
      </div>
    </footer>
  );
}
