import { Collapse } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FAQS } from '../lib/faqs';

export default function GuideFaqSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      <div className="text-xs font-bold text-[#1565c0] tracking-widest uppercase mb-1.5">
        Yordam
      </div>
      <div className="h-1 w-10 bg-[#1565c0] rounded-full mb-4" />
      <h2 className="text-2xl font-extrabold text-[#0f1f3d] mb-6 flex items-center gap-2">
        <QuestionCircleOutlined style={{ fontSize: 22, color: '#1565c0' }} />
        Ko&apos;pincha beriladigan savollar
      </h2>

      <Collapse
        accordion
        bordered={false}
        expandIconPlacement="end"
        items={FAQS}
        style={{ background: 'transparent' }}
        className="faq-collapse"
      />
    </section>
  );
}
