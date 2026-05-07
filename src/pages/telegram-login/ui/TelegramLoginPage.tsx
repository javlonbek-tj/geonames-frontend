import { Typography } from 'antd';
import { Navigate } from 'react-router';
import { useCitizenStore } from '@/entities/citizen/model/citizenStore';
import logoSvg from '@/shared/assets/logo.svg';
import { useTelegramLogin } from '@/features/telegram-login/model/useTelegramLogin';
import LoginSteps from './LoginSteps';
import PhoneForm from './PhoneForm';
import OtpForm from './OtpForm';

export default function TelegramLoginPage() {
  const citizen = useCitizenStore((s) => s.citizen);
  const { step, phone, requestOtp, verifyOtp, goBack } = useTelegramLogin();

  if (citizen) return <Navigate to="/" replace />;

  return (
    <div className="bg-[#f9fafc] min-h-screen flex items-start justify-center px-4 pt-20 pb-10">
      <div className="w-full max-w-110">
        <div className="flex flex-col items-center mb-8">
          <img src={logoSvg} alt="Geonames" className="h-7 mb-3.5" />
          <p className="text-base text-gray-500 text-center leading-relaxed m-0">
            Avval{' '}
            <Typography.Link
              href="https://t.me/geonomlar_bot"
              target="_blank"
              className="font-bold!"
            >
              @geonomlar_bot
            </Typography.Link>{' '}
            telegram botni ishga tushiring va telefon raqamingizni ulashing.
          </p>
        </div>

        <div className="bg-white rounded-[20px] border border-[#e3e8f0] p-9 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
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
