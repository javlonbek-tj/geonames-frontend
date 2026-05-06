import { useNavigate } from 'react-router';
import { useCitizenStore } from '@/entities/citizen/model/citizenStore';
import logoSvg from '@/shared/assets/logo.svg';
import { useTelegramLogin } from '../model/useTelegramLogin';
import LoginSteps from './LoginSteps';
import PhoneForm from './PhoneForm';
import OtpForm from './OtpForm';

export default function TelegramLoginPage() {
  const navigate = useNavigate();
  const citizen = useCitizenStore((s) => s.citizen);
  const { step, phone, requestOtp, verifyOtp, goBack } = useTelegramLogin();

  if (citizen) {
    void navigate('/');
    return null;
  }

  return (
    <div
      style={{
        background: '#f9fafc',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '80px 16px 40px',
      }}
    >
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div className='flex flex-col items-center mb-8'>
          <img src={logoSvg} alt='Geonames' style={{ height: 28, marginBottom: 14 }} />
          <p style={{ fontSize: 16, color: '#6b7280', textAlign: 'center', lineHeight: 1.7, margin: 0 }}>
            Avval{' '}
            <a
              href='https://t.me/geonomlar_bot'
              target='_blank'
              rel='noreferrer'
              style={{ color: '#1565c0', fontWeight: 700 }}
            >
              @geonomlar_bot
            </a>{' '}
            telegram botni ishga tushiring va telefon raqamingizni ulashing.
          </p>
        </div>

        <div
          style={{
            background: '#fff',
            borderRadius: 20,
            border: '1px solid #e3e8f0',
            padding: '36px 36px',
            boxShadow: '0 4px 24px rgba(0,0,0,.06)',
          }}
        >
          <LoginSteps step={step} />

          {step === 'phone' ? (
            <PhoneForm
              onSubmit={(p) => requestOtp.mutate({ phone: p })}
              isPending={requestOtp.isPending}
            />
          ) : (
            <OtpForm
              phone={phone}
              onSubmit={(code) => verifyOtp.mutate({ code })}
              onBack={goBack}
              isPending={verifyOtp.isPending}
            />
          )}
        </div>
      </div>
    </div>
  );
}
