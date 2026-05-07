import { Steps } from 'antd';
import type { Step } from '@/features/telegram-login/model/useTelegramLogin';

const STEP_INDEX: Record<Step, number> = { phone: 0, otp: 1 };

export default function LoginSteps({ step }: { step: Step }) {
  return (
    <Steps
      current={STEP_INDEX[step]}
      size="small"
      className="mb-8"
      items={[{ title: 'Telefon raqam' }, { title: 'Tasdiqlash kodi' }]}
    />
  );
}
