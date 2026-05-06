import { Link } from 'react-router';
import { ArrowRightOutlined } from '@ant-design/icons';

const STEPS = [
  {
    label: '1-BOSQICH',
    title: 'Ariza va geometriya yuklash',
    description:
      'Davlat kadastrlari palatasi tuman/shahar filiali xodimi geonomlar axborot tizimiga geografik obyektning geometriyasini yuklaydi va ushbu obyektga nom taklif qilish uchun tuman/shahar hokimliklariga yuboradi. Tuman hokimligi obyektga nom taklif etadi va ommaviy muhokamaga chiqaradi.',
  },
  {
    label: '2-BOSQICH',
    title: 'Jamoatchilik muhokamasi',
    description:
      "Taklif etilgan nom 10 kun davomida ushbu portaldа fuqarolar tomonidan muhokama qilinadi va ovoz beriladi. Natijalar tuman komissiyasiga yetkaziladi hamda keyingi bosqichlar uchun asos bo'ladi.",
    to: '/discussions',
    linkLabel: "Muhokamalarni ko'rish",
  },
];

export default function ProcessSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
      <div className="text-xs font-bold text-[#1565c0] tracking-widest uppercase mb-1.5">
        Jarayon
      </div>
      <div className="h-1 w-10 bg-[#1565c0] rounded-full mb-4" />
      <h2 className="text-2xl font-extrabold text-[#0f1f3d] mb-8">
        Nom berish jarayoni
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {STEPS.map((step) => (
          <div
            key={step.label}
            className="bg-[#f8faff] rounded-2xl p-8 border border-[#e3e8f0] flex flex-col"
          >
            <span className="inline-block self-start px-2.5 py-0.5 rounded text-xs font-bold tracking-widest text-[#1565c0] bg-[#e8efff] mb-4">
              {step.label}
            </span>
            <h3 className="text-xl font-bold text-[#0f1f3d] mb-3">
              {step.title}
            </h3>
            <p className="text-sm text-gray-500 leading-[1.75] flex-1">
              {step.description}
            </p>
            {step.to && step.linkLabel && (
              <Link
                to={step.to}
                className="inline-flex items-center gap-1.5 mt-5 text-[#1565c0] text-sm font-semibold self-start hover:text-blue-800 transition-colors"
              >
                {step.linkLabel} <ArrowRightOutlined style={{ fontSize: 11 }} />
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
