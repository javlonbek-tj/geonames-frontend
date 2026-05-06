import RegistriesSection from '@/widgets/registries-section/ui/RegistriesSection';
import HeroSection from './HeroSection';
import ProcessSection from './ProcessSection';
import CtaBanner from './CtaBanner';

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-xs font-bold text-[#1565c0] tracking-widest uppercase mb-1.5">
          Rasmiy ma&apos;lumotlar bazasi
        </div>
        <div className="h-1 w-10 bg-[#1565c0] rounded-full mb-4" />
        <h2 className="text-2xl font-extrabold text-[#0f1f3d] mb-6">
          Geografik obyektlar reyestri
        </h2>
        <RegistriesSection />
      </section>

      <ProcessSection />
      <CtaBanner />
    </>
  );
}
