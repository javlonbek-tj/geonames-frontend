import { useQuery } from '@tanstack/react-query';
import { discussionsApi } from '../api/discussions.api';

type DiscussionsParams = Parameters<typeof discussionsApi.list>[0];

export function useDiscussionsQuery(params: DiscussionsParams) {
  return useQuery({
    queryKey: ['public-discussions', params],
    queryFn: () => discussionsApi.list(params).then((r) => r.data),
    placeholderData: (prev) => prev,
  });
}
