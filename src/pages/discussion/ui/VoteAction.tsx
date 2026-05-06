import { Button } from 'antd';
import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router';
import type { UseMutationResult } from '@tanstack/react-query';
import type { DiscussionItem } from '@/entities/discussion/api/discussions.api';

interface Props {
  discussion: DiscussionItem;
  isActive: boolean;
  hasVoted: boolean;
  isLoggedIn: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  voteMutation: UseMutationResult<any, any, 'support' | 'oppose'>;
}

export default function VoteAction({ discussion, isActive, hasVoted, isLoggedIn, voteMutation }: Props) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e3e8f0', borderRadius: 16, padding: '24px' }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f1f3d', marginBottom: 16 }}>
        Ovoz bering
      </h3>

      {!isLoggedIn ? (
        <div>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 14 }}>
            Ovoz berish uchun tizimga kirishingiz kerak.
          </p>
          <Link to='/login'>
            <Button
              type='primary'
              block
              style={{ borderRadius: 10, background: '#1565c0', height: 40 }}
            >
              Telegram orqali kirish
            </Button>
          </Link>
        </div>
      ) : !isActive ? (
        <div
          className='rounded-xl p-4 text-center'
          style={{ background: '#f3f4f6', color: '#6b7280', fontSize: 13 }}
        >
          Muhokama muddati tugagan
        </div>
      ) : hasVoted ? (
        <div className='flex flex-col gap-3'>
          <div
            className='flex items-center gap-3 p-4 rounded-xl'
            style={{
              border: discussion.myVote === 'support' ? '2px solid #16a34a' : '2px solid #e3e8f0',
              background: discussion.myVote === 'support' ? '#f0fdf4' : '#fff',
            }}
          >
            <div className='w-9 h-9 rounded-lg flex items-center justify-center' style={{ background: '#dcfce7' }}>
              <LikeFilled
                style={{ color: discussion.myVote === 'support' ? '#16a34a' : '#d1d5db', fontSize: 16 }}
              />
            </div>
            <div style={{ fontWeight: 700, fontSize: 14, color: discussion.myVote === 'support' ? '#166534' : '#9ca3af' }}>
              Qo'llayman
            </div>
          </div>

          <div
            className='flex items-center gap-3 p-4 rounded-xl'
            style={{
              border: discussion.myVote === 'oppose' ? '2px solid #dc2626' : '2px solid #e3e8f0',
              background: discussion.myVote === 'oppose' ? '#fef2f2' : '#fff',
            }}
          >
            <div className='w-9 h-9 rounded-lg flex items-center justify-center' style={{ background: '#fee2e2' }}>
              <DislikeFilled
                style={{ color: discussion.myVote === 'oppose' ? '#dc2626' : '#d1d5db', fontSize: 16 }}
              />
            </div>
            <div style={{ fontWeight: 700, fontSize: 14, color: discussion.myVote === 'oppose' ? '#991b1b' : '#9ca3af' }}>
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
            className='flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all text-left'
            style={{ border: '2px solid #e3e8f0', background: '#fff', color: '#374151' }}
          >
            <div className='w-9 h-9 rounded-lg flex items-center justify-center' style={{ background: '#dcfce7' }}>
              <LikeOutlined style={{ color: '#16a34a', fontSize: 16 }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Qo'llayman</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>Nom uchun ovoz</div>
            </div>
          </button>

          <button
            onClick={() => voteMutation.mutate('oppose')}
            disabled={voteMutation.isPending}
            className='flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all text-left'
            style={{ border: '2px solid #e3e8f0', background: '#fff', color: '#374151' }}
          >
            <div className='w-9 h-9 rounded-lg flex items-center justify-center' style={{ background: '#fee2e2' }}>
              <DislikeOutlined style={{ color: '#dc2626', fontSize: 16 }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Qo'llamayman</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>Nom uchun qarshi ovoz</div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
