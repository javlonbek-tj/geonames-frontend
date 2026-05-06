import { useState } from 'react';
import { useNavigate } from 'react-router';
import { App } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/entities/citizen/api/auth.api';
import { useCitizenStore } from '@/entities/citizen/model/citizenStore';

export type Step = 'phone' | 'otp';

export function useTelegramLogin() {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const setAuth = useCitizenStore((s) => s.setAuth);

  const [step, setStep] = useState<Step>('phone');
  const [sessionId, setSessionId] = useState('');
  const [phone, setPhone] = useState('');

  const requestOtp = useMutation({
    mutationFn: (values: { phone: string }) => authApi.requestOtp(values.phone),
    onSuccess: (res, variables) => {
      setSessionId(res.data.data.sessionId);
      setPhone(variables.phone);
      setStep('otp');
      void message.success('Telegram orqali tasdiqlash kodi yuborildi');
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      void message.error(err.response?.data?.message ?? 'Xatolik yuz berdi');
    },
  });

  const verifyOtp = useMutation({
    mutationFn: (values: { code: string }) => authApi.verifyOtp(sessionId, values.code),
    onSuccess: (res) => {
      const { accessToken, citizen: c } = res.data.data;
      setAuth(accessToken, c);
      void message.success('Muvaffaqiyatli kirdingiz');
      void navigate('/');
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      void message.error(err.response?.data?.message ?? "Noto'g'ri kod");
    },
  });

  const goBack = () => setStep('phone');

  return { step, phone, requestOtp, verifyOtp, goBack };
}
