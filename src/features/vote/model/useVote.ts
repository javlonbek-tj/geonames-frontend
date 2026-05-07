import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import type { AxiosError } from 'axios';
import { discussionsApi } from '@/entities/discussion/api/discussions.api';

export function useVote(discussionId: number) {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vote: 'support' | 'oppose') =>
      discussionsApi.submitVote({ discussionId, vote }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['public-discussion', discussionId] });
      void queryClient.invalidateQueries({ queryKey: ['public-discussions'] });
      void message.success('Ovozingiz qabul qilindi');
    },
    onError: (err: AxiosError<{ message?: string }>) => {
      void message.error(err.response?.data?.message ?? 'Xatolik yuz berdi');
    },
  });
}
