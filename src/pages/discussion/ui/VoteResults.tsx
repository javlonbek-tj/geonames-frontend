import { DislikeFilled, LikeFilled } from '@ant-design/icons';

interface Props {
  supportCount: number;
  opposeCount: number;
  total: number;
  supportPct: number;
  opposePct: number;
}

export default function VoteResults({ supportCount, opposeCount, total, supportPct, opposePct }: Props) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e3e8f0', borderRadius: 16, padding: '24px 32px' }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f1f3d', marginBottom: 20 }}>
        Ovoz natijasi
      </h3>

      <div className='flex items-center gap-4 mb-4'>
        <div style={{ flex: 1 }}>
          <div className='flex justify-between text-sm mb-1'>
            <span style={{ color: '#166534', fontWeight: 600 }}>
              <LikeFilled style={{ marginRight: 4 }} />
              {supportPct}% ({supportCount} ta)
            </span>
            <span style={{ color: '#991b1b', fontWeight: 600 }}>
              {opposePct}% ({opposeCount} ta)
              <DislikeFilled style={{ marginLeft: 4 }} />
            </span>
          </div>
          <div style={{ height: 10, borderRadius: 999, background: '#fecaca', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                borderRadius: 999,
                background: 'linear-gradient(90deg,#16a34a,#22c55e)',
                width: `${supportPct}%`,
                transition: 'width .4s ease',
              }}
            />
          </div>
          <div className='text-center text-sm text-gray-400 mt-2'>Jami: {total} ovoz</div>
        </div>
      </div>
    </div>
  );
}
