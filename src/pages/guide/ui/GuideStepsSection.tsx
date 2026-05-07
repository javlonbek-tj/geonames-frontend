import guideVideo from '@/shared/assets/guide.mp4';
import { STEPS } from '../lib/steps';

export default function GuideStepsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-xs font-bold text-[#1565c0] tracking-widest uppercase mb-1.5">
        Boshlash uchun
      </div>
      <div className="h-1 w-10 bg-[#1565c0] rounded-full mb-4" />
      <h1 className="text-2xl font-extrabold text-[#0f1f3d] mb-10">
        Foydalanish bo&apos;yicha qo&apos;llanma
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="flex flex-col gap-5">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="flex gap-4 p-5 rounded-2xl border border-[#e3e8f0] bg-white"
            >
              <div className="w-10 h-10 rounded-xl bg-[#f0f4ff] flex items-center justify-center shrink-0">
                {step.icon}
              </div>
              <div>
                <div className="font-bold text-[#0f1f3d] text-sm mb-1">
                  <span className="text-[#1565c0] mr-1.5">{i + 1}.</span>
                  {step.title}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed m-0">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="sticky top-24 bg-white border border-[#e3e8f0] rounded-2xl p-4">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Video qo&apos;llanma
          </div>
          <video
            src={guideVideo}
            controls
            className="w-full rounded-xl block"
          />
          <p className="text-xs text-gray-400 text-center mt-3 mb-0">
            Ovoz berish jarayoni haqida qisqacha video
          </p>
        </div>
      </div>
    </section>
  );
}
