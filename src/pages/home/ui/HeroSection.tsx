import { Link } from 'react-router';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useCitizenStore } from '@/entities/citizen/model/citizenStore';
import heroPng from '@/shared/assets/hero.png';
import heroWebp from '@/shared/assets/hero.webp';

export default function HeroSection() {
  const citizen = useCitizenStore((s) => s.citizen);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-extrabold text-[#0f1f3d] leading-tight mb-4">
            Geografik obyektlar
            <br />
            nomlari <span className="text-[#1565c0]">davlat reyestri</span>
          </h1>
          <p className="text-base text-gray-600 leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
            O&apos;zbekiston Respublikasi geografik obyektlarning rasmiy
            nomlari, ommaviy muhokamalar va fuqarolarning ovozlari — bir
            platformada.
          </p>
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {!citizen && (
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs text-white border border-transparent transition-opacity hover:opacity-90 bg-[#1565c0]"
              >
                Kirish
                <ArrowRightOutlined style={{ fontSize: 12 }} />
              </Link>
            )}
            <Link
              to="/registry"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs text-gray-700 bg-white border border-[#d1d9e8] transition-colors hover:bg-gray-50"
            >
              Reyestrni ko&apos;rish
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex justify-center opacity-60">
          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet={heroWebp}
              type="image/webp"
            />
            <source
              media="(min-width: 1024px)"
              srcSet={heroPng}
              type="image/png"
            />
            <img
              src={heroPng}
              alt="Geografik nomlar reyestri"
              className="w-full max-w-lg object-contain"
              style={{ maxHeight: 340 }}
              fetchPriority="high"
              loading="eager"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
