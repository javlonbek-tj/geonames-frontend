import { Button } from 'antd';
import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router';
import type { DiscussionItem } from '@/entities/discussion/api/discussions.api';
import type { useVote } from '@/features/vote/model/useVote';

interface Props {
  discussion: DiscussionItem;
  isActive: boolean;
  hasVoted: boolean;
  isLoggedIn: boolean;
  voteMutation: ReturnType<typeof useVote>;
}

export default function VoteAction({ discussion, isActive, hasVoted, isLoggedIn, voteMutation }: Props) {
  return (
    <div className='bg-white border border-[#e3e8f0] rounded-2xl p-6'>
      <h3 className='text-[15px] font-bold text-[#0f1f3d] mb-4'>
        Ovoz bering
      </h3>

      {!isLoggedIn ? (
        <div>
          <p className='text-[13px] text-gray-500 mb-3.5'>
            Ovoz berish uchun tizimga kirishingiz kerak.
          </p>
          <Link to='/login'>
            <Button type='primary' block>
              Telegram orqali kirish
            </Button>
          </Link>
        </div>
      ) : !isActive ? (
        <div className='rounded-xl p-4 text-center text-[13px] bg-gray-100 text-gray-500'>
          Muhokama muddati tugagan
        </div>
      ) : hasVoted ? (
        <div className='flex flex-col gap-3'>
          <div className={`flex items-center gap-3 p-4 rounded-xl border-2 ${
            discussion.myVote === 'support' ? 'border-green-600 bg-green-50' : 'border-[#e3e8f0] bg-white'
          }`}>
            <div className='w-9 h-9 rounded-lg flex items-center justify-center bg-green-100'>
              <LikeFilled className={discussion.myVote === 'support' ? 'text-green-600' : 'text-gray-300'} />
            </div>
            <div className={`font-bold text-sm ${discussion.myVote === 'support' ? 'text-green-800' : 'text-gray-400'}`}>
              Qo'llayman
            </div>
          </div>

          <div className={`flex items-center gap-3 p-4 rounded-xl border-2 ${
            discussion.myVote === 'oppose' ? 'border-red-600 bg-red-50' : 'border-[#e3e8f0] bg-white'
          }`}>
            <div className='w-9 h-9 rounded-lg flex items-center justify-center bg-red-100'>
              <DislikeFilled className={discussion.myVote === 'oppose' ? 'text-red-600' : 'text-gray-300'} />
            </div>
            <div className={`font-bold text-sm ${discussion.myVote === 'oppose' ? 'text-red-800' : 'text-gray-400'}`}>
              Qo'llamayman
            </div>
          </div>

          <p className='text-xs text-center text-gray-400 mt-1'>
            Ovoz berib bo'ldingiz. Ovozni o'zgartirish mumkin emas.
          </p>
        </div>
      ) : (
        <div className='flex flex-col gap-3'>
          <button
            onClick={() => voteMutation.mutate('support')}
            disabled={voteMutation.isPending}
            className='flex items-center gap-3 p-4 rounded-xl border-2 border-[#e3e8f0] bg-white text-gray-700 cursor-pointer transition-all text-left hover:border-green-400 hover:bg-green-50'
          >
            <div className='w-9 h-9 rounded-lg flex items-center justify-center bg-green-100'>
              <LikeOutlined className='text-green-600' />
            </div>
            <div>
              <div className='font-bold text-sm'>Qo'llayman</div>
              <div className='text-xs text-gray-400'>Nom uchun ovoz</div>
            </div>
          </button>

          <button
            onClick={() => voteMutation.mutate('oppose')}
            disabled={voteMutation.isPending}
            className='flex items-center gap-3 p-4 rounded-xl border-2 border-[#e3e8f0] bg-white text-gray-700 cursor-pointer transition-all text-left hover:border-red-400 hover:bg-red-50'
          >
            <div className='w-9 h-9 rounded-lg flex items-center justify-center bg-red-100'>
              <DislikeOutlined className='text-red-600' />
            </div>
            <div>
              <div className='font-bold text-sm'>Qo'llamayman</div>
              <div className='text-xs text-gray-400'>Nom uchun qarshi ovoz</div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
