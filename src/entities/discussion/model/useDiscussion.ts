import { useQuery } from '@tanstack/react-query';
import { discussionsApi } from '../api/discussions.api';
import dayjs from 'dayjs';

export function useDiscussion(id: number) {
  const { data: discussion, isLoading } = useQuery({
    queryKey: ['public-discussion', id],
    queryFn: () => discussionsApi.getOne(id).then((r) => r.data.data),
    enabled: id > 0,
  });

  const left = discussion
    ? dayjs(discussion.endsAt).startOf('day').diff(dayjs().startOf('day'), 'day')
    : 0;
  const isActive = left >= 0;
  const hasVoted = !!discussion?.myVote;

  const supportCount = discussion?.supportCount ?? 0;
  const opposeCount = discussion?.opposeCount ?? 0;
  const total = supportCount + opposeCount;
  const supportPct = total > 0 ? Math.round((supportCount / total) * 100) : 0;
  const opposePct = total > 0 ? 100 - supportPct : 0;

  return { discussion, isLoading, left, isActive, hasVoted, supportCount, opposeCount, total, supportPct, opposePct };
}
