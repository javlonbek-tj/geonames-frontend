import { Result, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router';
import { useParams } from 'react-router';
import { useCitizenStore } from '@/entities/citizen/model/citizenStore';
import { useDiscussion } from '@/entities/discussion/model/useDiscussion';
import { useVote } from '@/features/vote/model/useVote';
import DiscussionHeader from './DiscussionHeader';
import DiscussionInfo from './DiscussionInfo';
import GeoMap from './GeoMap';
import VoteAction from './VoteAction';
import VoteResults from './VoteResults';

export default function DiscussionPage() {
  const { id } = useParams<{ id: string }>();
  const discussionId = Number(id);
  const citizen = useCitizenStore((s) => s.citizen);
  const {
    discussion,
    isLoading,
    left,
    isActive,
    hasVoted,
    supportCount,
    opposeCount,
    total,
    supportPct,
    opposePct,
  } = useDiscussion(discussionId);
  const voteMutation = useVote(discussionId);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center py-32'>
        <Spin size='large' />
      </div>
    );
  }

  if (!discussion) {
    return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-16'>
        <Result status='404' title='Muhokama topilmadi' />
      </div>
    );
  }

  return (
    <>
      <div style={{ background: '#fff', borderBottom: '1px solid #e3e8f0' }}>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-gray-500'>
          <Link to='/' className='hover:text-blue-700'>Bosh sahifa</Link>
          <span>/</span>
          <Link to='/discussions' className='hover:text-blue-700'>Muhokamalar</Link>
          <span>/</span>
          <span className='text-gray-900 font-medium truncate max-w-48'>
            {discussion.proposedNameUz}
          </span>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-10'>
        <Link
          to='/discussions'
          className='inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-700 mb-6'
        >
          <ArrowLeftOutlined style={{ fontSize: 12 }} />
          Orqaga
        </Link>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2 flex flex-col gap-6'>
            <DiscussionHeader discussion={discussion} isActive={isActive} />

            {discussion.geometry && (
              <div style={{ background: '#fff', border: '1px solid #e3e8f0', borderRadius: 16, padding: '24px 32px' }}>
                <GeoMap
                  geometry={discussion.geometry}
                  title={`${discussion.proposedNameUz} — Geografik joylashuv`}
                />
              </div>
            )}

            <VoteResults
              supportCount={supportCount}
              opposeCount={opposeCount}
              total={total}
              supportPct={supportPct}
              opposePct={opposePct}
            />
          </div>

          <div className='flex flex-col gap-5'>
            <VoteAction
              discussion={discussion}
              isActive={isActive}
              hasVoted={hasVoted}
              isLoggedIn={!!citizen}
              voteMutation={voteMutation}
            />

            <DiscussionInfo
              endsAt={discussion.endsAt}
              left={left}
              isActive={isActive}
              total={total}
            />
          </div>
        </div>
      </div>
    </>
  );
}
