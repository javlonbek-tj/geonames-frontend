import { Link } from 'react-router';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useCitizenStore } from '@/entities/citizen/model/citizenStore';

export default function CtaBanner() {
  const citizen = useCitizenStore((s) => s.citizen);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      <div
        className="rounded-2xl px-8 sm:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-6"
        style={{
          background: 'linear-gradient(135deg,#0d47a1,#1565c0,#1976d2)',
        }}
      >
        <div>
          <h3 className="text-xl font-extrabold text-white mb-1.5">
            Muhokamada ishtirok eting
          </h3>
          <p className="text-sm text-white/70 max-w-100">
            {citizen
              ? "O'z hududingizdagi nom berish jarayoniga ovozingizni qo'shing."
              : "Telegram orqali kiring va o'z hududingizdagi nom berish jarayoniga ovozingizni qo'shing."}
          </p>
        </div>
        <Link
          to={citizen ? '/discussions' : '/login'}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-[#1565c0] bg-white shrink-0 transition-opacity hover:opacity-90"
        >
          {citizen ? "Muhokamani ko'rish" : 'Kirish'}
          <ArrowRightOutlined style={{ fontSize: 12 }} />
        </Link>
      </div>
    </section>
  );
}
