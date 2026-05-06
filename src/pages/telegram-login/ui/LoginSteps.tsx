import type { Step } from '../model/useTelegramLogin';

const STEPS: { key: Step; label: string }[] = [
  { key: 'phone', label: 'Telefon raqam' },
  { key: 'otp', label: 'Tasdiqlash kodi' },
];

export default function LoginSteps({ step }: { step: Step }) {
  return (
    <div className='flex items-center gap-2 mb-8'>
      {STEPS.map((s, i) => (
        <div key={s.key} className='flex items-center gap-2 flex-1'>
          <div
            className='flex items-center justify-center rounded-full text-xs font-bold shrink-0'
            style={{
              width: 28,
              height: 28,
              background:
                step === s.key ? '#1565c0' : i === 0 && step === 'otp' ? '#dcfce7' : '#f3f4f6',
              color:
                step === s.key ? '#fff' : i === 0 && step === 'otp' ? '#16a34a' : '#9ca3af',
            }}
          >
            {i === 0 && step === 'otp' ? '✓' : i + 1}
          </div>
          <span
            style={{
              fontSize: 12,
              color: step === s.key ? '#1565c0' : '#9ca3af',
              fontWeight: step === s.key ? 600 : 400,
              flex: 1,
            }}
          >
            {s.label}
          </span>
          {i === 0 && (
            <div
              style={{
                width: 24,
                height: 2,
                background: step === 'otp' ? '#1565c0' : '#e3e8f0',
                borderRadius: 2,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
