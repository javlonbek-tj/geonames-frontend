import api from '@/shared/api/axios';
import type { Citizen } from '@/entities/citizen/model/citizenStore';

export const authApi = {
  requestOtp: (phone: string) =>
    api.post<{ data: { sessionId: string } }>('/public/auth/otp/request', { phone }),

  verifyOtp: (sessionId: string, code: string) =>
    api.post<{ data: { accessToken: string; citizen: Citizen } }>(
      '/public/auth/otp/verify',
      { sessionId, code },
    ),
};
